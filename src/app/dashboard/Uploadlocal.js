"use client";

import { useEffect, useState } from "react";
import { toast ,ToastContainer} from "react-toastify";



export default function UploadPage({email, handleSetProfile}) {
    const [uploadedFile, setUploadedFile] = useState(null);

    // for
  const [file, setFile] = useState(null);
  // const [profile, setProfile] = useState(null);
  useEffect(()=>{
    const getImageUrl = async()=>{
      console.log("email before fetch-upload local", email)
      const res = await fetch("/api/upload",{
        method:"GET",
        headers:{
          "email":email
        }
       })
    
   console.log( "response",res);
   const urldata = await res.json();


       if( urldata.success){
        console.log("upload-local,use-effect, urldata", urldata.url)
        setUploadedFile(urldata.url);
    handleSetProfile(urldata.url)

    showMessage("Image Fetched Successfully");
       }else{
        showMessage("no image fetched")
       }

     
    }

    getImageUrl();


  }, [email])

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file!");

    const formData = new FormData();
    console.log("email",email)
    formData.append("file", file);
    formData.append("email",email )

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();


    if(data.success){
      console.log("uploaded-file", data.url)
      setUploadedFile(data.url);
      handleSetProfile(data.url);

      toast.success("image uploaded successfully");
  
    }
    
  };

  return (

    <div>
      <div id="message-box" style={{ display: "none", padding: "10px", background: "lightgreen", color: "black" }}></div>

      <h2>Upload using local</h2>
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
