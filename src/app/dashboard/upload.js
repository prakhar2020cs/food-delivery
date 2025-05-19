"use client";
import { useEdgeStore } from "../lib/edgestore";
import { useState } from "react";

export default function Upload({ handleSetProfile, setUpload, email }) {
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    try {
      // Step 1: Upload to EdgeStore
      const res = await edgestore.publicFiles.upload({ file });
      const uploadedUrl = res.url;
      console.log("Uploaded to Edgestore:", uploadedUrl);

      setFileUrl(uploadedUrl); // Show image

      // Step 2: Save to MongoDB via API
      const saveRes = await fetch("/api/save-profile-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          profileUrl: uploadedUrl,
        }),
      });

      const data = await saveRes.json();

      if (!saveRes.ok) {
        throw new Error(data.message || "Failed to save profile URL");
      }

      console.log("Saved to DB:", data);
      if (handleSetProfile) handleSetProfile(uploadedUrl);
      setUpload(false);
    } catch (err) {
      console.error("Upload failed:", err.message);
      alert("Upload or save failed: " + err.message);
    }
  };

  return (
    <div>
      <h2>Upload using Edgestore</h2>
      <input
        className="upload-img-button"
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button className="upload-img-button" onClick={handleUpload}>
        Upload
      </button>

      {fileUrl && (
        <img
          className="profile-pic"
          src={fileUrl}
          alt="Uploaded"
          style={{ width: "200px", marginTop: "10px" }}
        />
      )}
    </div>
  );
}
