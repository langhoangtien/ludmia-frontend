import UploadIllustration from "@/assets/illustrations/upload-illustration";
import Image from "@/components/image";
import { Button } from "@/components/ui/button";
import { uploadImgs } from "@/lib/common";
import { convertIDToStaticURL } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCopyIcon, LinkIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/files")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({
    images: [] as string[],
  });
  const [isUploading, setIsUploading] = useState(false);
  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true); // Thêm trạng thái loading

    const imagesUpload = await uploadImgs(e);
    if (!imagesUpload) {
      setIsUploading(false);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imagesUpload],
    }));
    setIsUploading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mt-2 flex justify-center rounded-lg border  border-border px-6 py-4 w-full">
        <div className="flex text-sm/6 ">
          <label
            htmlFor="files-upload"
            className="relative cursor-pointer rounded-md font-semibold space-y-2  flex flex-col items-center justify-center"
          >
            <UploadIllustration hideBackground className="w-32" />

            <p className="text-xs/5 ">
              Định dạng PNG, JPG, JPEG, WEBP tối đa 2MB mỗi ảnh
            </p>
            <input
              disabled={isUploading}
              onChange={handleUploadImages}
              id="files-upload"
              name="images"
              multiple
              type="file"
              className="sr-only"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 py-2 my-4 ">
        {formData.images?.map((image, index) => (
          <div
            className="size-20 relative border border-border rounded-md"
            key={index}
          >
            {" "}
            <Image
              src={image}
              alt="cover"
              className="w-20 h-20 object-cover rounded-md"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(convertIDToStaticURL(image, 800));
                toast.success("Đã sao chép đường dẫn ảnh vào clipboard", {
                  duration: 2000,
                });
              }}
              className="absolute inset-0 flex justify-center items-center cursor-pointer bg-black/40 text-white opacity-40 hover:opacity-100 transition-opacity"
              title="Copy image URL"
            >
              <LinkIcon size={18} strokeWidth={1.2} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap flex-col gap-4 py-2 my-4 ">
        {formData.images?.map((image, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              readOnly
              value={convertIDToStaticURL(image)}
              className="w-full px-2 py-1 text-sm border rounded bg-muted/40 font-mono truncate cursor-text"
              onClick={(e) => e.currentTarget.select()}
            />
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(convertIDToStaticURL(image, 800));
                toast.success("Đã sao chép đường dẫn ảnh!", { duration: 2000 });
              }}
              title="Copy image URL"
            >
              <ClipboardCopyIcon strokeWidth={1.2} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
