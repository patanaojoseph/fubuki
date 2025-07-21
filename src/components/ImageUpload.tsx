import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import React, { useState } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  endpoint: keyof OurFileRouter;
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  endpoint,
  value,
  onChange,
  onRemove,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const removeFile = () => {
    if (onRemove) {
      onRemove();
    } else {
      onChange("");
    }
  };

  // If there's already an uploaded image, show the preview
  if (value) {
    return (
      <div className='space-y-2'>
        <label className='text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2'>
          <Upload className='h-4 w-4 text-orange-500' />
          Profile Image
          <span className='text-slate-400 text-xs'>(Optional)</span>
        </label>

        <div className='space-y-2'>
          {/* Current Image Preview */}
          <div className='flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700'>
            {/* Image Preview */}
            <div className='flex-shrink-0'>
              <img
                src={value}
                alt='Uploaded image'
                className='w-12 h-12 object-cover rounded-md border border-slate-200 dark:border-slate-600'
              />
            </div>

            {/* File Details */}
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-slate-700 dark:text-slate-300 truncate'>
                Uploaded image
              </p>
              <p className='text-xs text-slate-500 dark:text-slate-400'>
                Image successfully uploaded
              </p>
            </div>

            {/* Remove Button */}
            <button
              type='button'
              onClick={removeFile}
              className='flex-shrink-0 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors'
            >
              <X className='h-4 w-4' />
            </button>
          </div>

          {/* Upload Guidelines */}
          <div className='text-[9px] text-slate-500 dark:text-slate-400 space-y-1'>
            <p>• Supported formats: JPG, PNG, GIF, WebP</p>
            <p>• Maximum file size: 5MB</p>
            <p>• Recommended: Square images (1:1 ratio)</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2'>
        <Upload className='h-4 w-4 text-orange-500' />
        Profile Image
        <span className='text-slate-400 text-xs'>(Optional)</span>
      </label>

      <div className='space-y-2'>
        {/* Custom styled UploadDropzone */}
        <div className='relative'>
          <UploadDropzone<OurFileRouter>
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              if (res && res[0]) {
                onChange(res[0].url);
                console.log("Files: ", res);
                // Remove the alert for better UX
                // alert("Upload Completed");
              }
              setIsUploading(false);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
              setIsUploading(false);
            }}
            onUploadBegin={() => {
              setIsUploading(true);
            }}
            config={{
              mode: "auto",
            }}
            appearance={{
              container:
                "w-full h-11 border-2 border-dashed border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-all duration-200 rounded-md cursor-pointer group ut-uploading:cursor-not-allowed",
              uploadIcon:
                "h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400",
              label:
                "text-sm text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400",
              allowedContent: "hidden",
              button: "hidden",
            }}
            content={{
              uploadIcon: () => <Upload className='h-4 w-4' />,
              label: () => (
                <span className='ml-2 mb-4'>
                  {isUploading ? "Uploading..." : "Choose image or drag here"}
                </span>
              ),
              allowedContent: () => null,
            }}
          />
        </div>

        {/* Upload Guidelines */}
        <div className='text-[9px] text-slate-500 dark:text-slate-400 space-y-1'>
          <p>• Supported formats: JPG, PNG, GIF, WebP</p>
          <p>• Maximum file size: 5MB</p>
          <p>• Recommended: Square images (1:1 ratio)</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
