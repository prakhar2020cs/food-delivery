"use client";
import { useEdgeStore } from "../lib/edgestore";
import { useState } from "react";
import profilepicurl from "../lib/profilepicurl";

export default function Upload({handleSetProfile, setUpload}) {
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");


//   const handleUpload = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
  
//     const res = await fetch("/api/edgestore", {
//       method: "POST",
//       body: formData,
//     });
  
//     const data = await res.json();
//     console.log("Uploaded file URL:", data.url); // ✅ Use this URL
//   };
  

  const handleUpload = async () => {
    if (!file) return;

    const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: fileUrl,
        },
        // ...
      });
          setFileUrl(res.url);
          console.log("uploadEdge-setfileUrl",res.url)
          handleSetProfile(res.url)
          profilepicurl.url = res.url;
    
  };

  return (
    <div>
      <h2>upload using edgestore</h2>
      <input className="upload-img-button" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button className="upload-img-button" onClick={()=>{
         handleUpload()
         setUpload(false)
      }
       
        }>Upload</button>
      {fileUrl && <img className="profile-pic"  src={fileUrl===""?null:fileUrl} alt="Uploaded"  />}
    </div>
  );
}
