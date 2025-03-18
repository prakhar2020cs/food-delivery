"use client";

import { useState } from "react";
import { toast ,ToastContainer} from "react-toastify";

export default function UploadPage() {
    const [uploadedFile, setUploadedFile] = useState(null);

  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();


    if(data.success){
      setUploadedFile(data.url);
      toast.success("image uploaded successfully");
    }
    
  };

  return (

    <div>
      <ToastContainer/>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
      {uploadedFile && <img src={uploadedFile} alt="Uploaded" width="200" />}

    </div>
  );
}
