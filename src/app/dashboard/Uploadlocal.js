"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UploadPage({ email, handleSetProfile }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const getImageUrl = async () => {
      if (!email) return;
      const res = await fetch("/api/upload", {
        method: "GET",
        headers: { "email": email }
      });
      const urldata = await res.json();
      if (urldata.success) {
        setUploadedFile(urldata.url);
        handleSetProfile(urldata.url);
      }
    };
    getImageUrl();
  }, [email]);

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setUploadedFile(data.url);
      handleSetProfile(data.url);
      toast.success("Image uploaded successfully");
    } else {
      toast.error("Upload failed");
    }
  };

  return (
    <div style={{ marginTop: '16px', padding: '16px', border: '1px dashed #d1d5db', borderRadius: '8px' }}>
      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}>Upload a new profile picture</p>
      <input
        type="file"
        style={{ fontSize: '0.875rem', marginBottom: '12px', display: 'block', width: '100%' }}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem' }}
        onClick={handleUpload}
      >
        Upload Now
      </button>
      {uploadedFile && (
        <div style={{ marginTop: '12px' }}>
          <p style={{ fontSize: '0.75rem', color: '#10b981' }}>Preview:</p>
          <img src={uploadedFile} alt="Uploaded" width="64" height="64" style={{ borderRadius: '50%', objectFit: 'cover', marginTop: '4px' }} />
        </div>
      )}
    </div>
  );
}
