import { getBlogByIdOrSlug } from "@/lib/api";
import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { IBlog } from "../admin/blogs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCheckIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { BlogList } from ".";
import Image from "@/components/image";
import { toast } from "sonner";
import AnimateInView from "@/components/animate-in-view";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/blogs/$blogSlug")({
  component: RouteComponent,
  loader: ({ params }) => getBlogByIdOrSlug(params.blogSlug),
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error!</div>,
});

function RouteComponent() {
  const blog: IBlog = useLoaderData({
    from: "/blogs/$blogSlug",
  });

  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(`${API_URL}/blogs?limit=3`);
      if (!res.ok) throw new Error("Can't fetch blogs");
      const data = await res.json();
      const blogsData = data.data.filter(
        (item: IBlog) => item._id !== blog._id
      );
      setBlogs(blogsData);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="mx-auto pb-6 px-6 rounded-lg">
      <div className="mb-16">
        <Image
          src={blog.image}
          alt={blog.title}
          className="w-full aspect-3/1 object-cover  mb-4"
          dimension={800}
        />
      </div>

      <div className="grid mx-auto w-full max-w-7xl grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-5xl font-medium border-b border-border py-4 mb-4">
            {blog.title}
          </h1>
        </div>
        <div className="hidden md:block"></div>
        <div className="lg:col-span-2 mb-8">
          <div className="text-sm text-gray-600 mb-6">
            By <u>{blog.user?.fullName}</u> | Published on{" "}
            {formatDate(blog.createdAt)} min read
          </div>

          <div
            className="tiptap max-w-none space-y-4 mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="mt-12 space-y-4">
            <h2 className="text-lg font-medium">Tags</h2>
            <div className="flex flex-wrap items-center gap-2">
              {blog.collections.map((collection, index) => (
                <Link
                  key={index}
                  to={`/blogs/collection/${collection.value}`}
                  className="inline-block"
                >
                  <Badge variant="secondary" className="px-4 py-1">
                    {collection.title}
                  </Badge>
                </Link>
              ))}
              ``
            </div>
          </div>
        </div>
        <div>
          <div className="space-y-8">
            <SubscribeForm />
          </div>
        </div>
        <div className="lg:col-span-3">
          <p className="text-center p-4 text-3xl font-semibold">
            More to explore
          </p>
          <BlogList blogs={blogs} />
        </div>
      </div>
    </div>
  );
}

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (submit) {
      setError(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value) ? "" : "Invalid email"
      );
    }
  };

  const handleSubmit = async () => {
    setSubmit(true);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/client/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setSubscribed(true);
      setShowAlert(true);

      // Ẩn alert sau 30 giây
      setTimeout(() => {
        setShowAlert(false);
      }, 30000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to subscribe");
    }
  };

  if (subscribed && !showAlert) return null;

  return (
    <div>
      {showAlert ? (
        <AnimateInView variant="fadeInDown">
          <Alert className="text-green-500" variant="default">
            <CheckCheckIcon size={16} />
            <AlertTitle>Subscription Successful</AlertTitle>
            <AlertDescription>
              Thanks for subscribing! We’ll keep you updated with the latest
              news.
            </AlertDescription>
          </Alert>
        </AnimateInView>
      ) : (
        <AnimateInView variant="fadeInUp">
          <Card className="p-6 border">
            <h3 className="font-medium text-base mb-6">
              Sign up for Quit Mood Emails
            </h3>
            <p className="text-sm mb-4">
              Exclusive promotions, personalized product recommendations,
              wellness content from our experts and more, all delivered to your
              inbox.
            </p>
            <div className="flex w-full items-center space-x-2">
              <Input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Email Address"
                aria-invalid={!!error}
                className="text-sm"
              />
              <Button
                onClick={handleSubmit}
                className="bg-foreground text-accent hover:bg-foreground"
                size="sm"
              >
                <ArrowRight />
              </Button>
            </div>
          </Card>
        </AnimateInView>
      )}
    </div>
  );
}
