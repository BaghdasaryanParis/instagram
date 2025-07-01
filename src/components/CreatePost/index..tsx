"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!description && !image) {
      return;
    }

    const formData = new FormData();
    formData.append("post", description);
    if (image) formData.append("file", image);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/post", {
        method: "POST",
        body: formData,
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });

      const data = await res.json();
      console.log("Saved Post:", data);
      router.push("/user");
      setImage(null);
      setPreviewUrl(null);
      setDescription("");
    } catch (err) {
      console.error("Error uploading:", err);

    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block font-medium">Upload Image (optional):</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {previewUrl && (
        <div>
          <img src={previewUrl} alt="Preview" className="w-40 h-auto rounded" />
        </div>
      )}

      <div>
        <label className="block font-medium">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a description..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Image
        </button>
      </div>

      {/*<img   src="http://localhost:5000/uploads/1747922991037-goldens3.avif" alt="Post Image" />*/}
    </div>
  );
}
