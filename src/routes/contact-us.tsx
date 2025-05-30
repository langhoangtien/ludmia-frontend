import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import MainLayout from "@/layout/main-layout";
import { Input, Select } from "@/components/ui/custom-ui";
import { CheckCheck } from "lucide-react";
import { API_URL, CONTACT_ADDRESS, CONTACT_EMAIL } from "@/config";
import { toast } from "sonner";

import { z } from "zod";
export const Route = createFileRoute("/contact-us")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <ContactForm />
    </MainLayout>
  );
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  issueType: string;
  attachments: File[];
}

const issueOptions = [
  "I have not received my order",
  "I want to claim my order",
  "I want to cancel my order",
  "I want to update my order",
  "I have a question about a product/collection",
  "I have not received my confirmation email",
  "Other reasons",
];

// eslint-disable-next-line react-refresh/only-export-components
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200).optional(),
  email: z.string().email().max(100),
  message: z.string().max(1000).optional(),
  phone: z.string().max(20).optional(),
  issueType: z.string().min(1).max(200).optional(),
});
function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    issueType: "",
    attachments: [],
  });
  // const [errors, setErrors] = useState<
  //   Partial<FormData & { attachmentsError?: string }>
  // >({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const validateForm = () => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const errorMap: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        errorMap[err.path.join(".")] = err.message;
      });
      setErrors(errorMap);
      console.log(errorMap);

      return false;
    }
    setErrors({});
    return true;
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);

      // Clear error when attachments are valid
      const newErrors = { ...errors };
      if (
        fileArray.length <= 10 &&
        fileArray.every((file) => file.size <= 3 * 1024 * 1024)
      ) {
        delete newErrors.attachments;
      }

      setFormData({ ...formData, attachments: fileArray });
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const form = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        issueType: formData.issueType,
      };
      const res = await fetch(`${API_URL}/client/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        toast.error("Failed to send message");
        return;
      }
      toast.success("Message sent successfully");
      setSubmitted(true);
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 flex flex-col gap-8">
      <h2 className="text-2xl font-semibold ">Contact Us</h2>
      {submitted ? (
        <p className="text-green-500 flex items-center space-x-0.5">
          <CheckCheck className="size-5" />{" "}
          <span>Your message has been sent</span>
          successfully!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-2  ">
          <div className="col-span-2 md:col-span-1">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              aria-invalid={!!errors.name}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name}</p>
            )}
          </div>
          <div className="col-span-2 md:col-span-1">
            <Input
              type="email"
              name="email"
              aria-invalid={!!errors.email}
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email}</p>
            )}
          </div>
          <div className="col-span-2 md:col-span-1">
            <Input
              type="text"
              name="phone"
              aria-invalid={!!errors.phone}
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="col-span-2 md:col-span-1">
            <Select
              name="issueType"
              label="Reason for Contact"
              id="issueType"
              aria-invalid={!!errors.issueType}
              value={formData.issueType}
              onChange={handleChange}
            >
              {issueOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-span-2">
            <Textarea
              className="col-span-2 md:text-base"
              name="message"
              placeholder="Your Message"
              aria-invalid={!!errors.message}
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="text-destructive text-sm">{errors.message}</p>
            )}
          </div>
          <div className="col-span-2 md:col-span-1">
            <Input
              className="col-span-2"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            {errors.attachmentsError && (
              <p className="text-destructive text-sm">
                {errors.attachmentsError}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      )}

      <div>
        <p className="p2">
          If you have any questions about our products or would like to discuss
          a custom design, please do not hesitate to contact us. Our customer
          service team is available to assist you and provide you with the
          information you need.{" "}
        </p>
        <p>
          <strong>Headquarters</strong>: {CONTACT_ADDRESS}
          <br />
          <strong>Email</strong>:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            title=""
            role="url"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
          <br />
          <strong>Phone</strong>: +1 302 590 6135
        </p>
      </div>
    </div>
  );
}
