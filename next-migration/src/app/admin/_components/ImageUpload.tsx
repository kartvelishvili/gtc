"use client";

import { FC, useState } from "react";
import { uploadFileAction } from "@/lib/actions/admin";

interface Props {
  label: string;
  name: string;
  currentUrl?: string;
  currentId?: number;
}

const ImageUpload: FC<Props> = ({ label, name, currentUrl, currentId }) => {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [fileId, setFileId] = useState<number | null>(currentId || null);
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const fd = new FormData();
    fd.set("file", file);
    const result = await uploadFileAction(fd);

    if (result) {
      setFileId(result.id);
      setPreview(result.url);
    }
    setUploading(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input type="hidden" name={name} value={fileId || ""} />
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {uploading && <p className="text-xs text-blue-500 mt-1">Uploading...</p>}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 h-24 w-auto rounded border"
        />
      )}
    </div>
  );
};

export default ImageUpload;
