"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";

const Testing = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/file`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type for file upload
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div>
      <div>Testing</div>
      <form className="flex items-center flex-col" onSubmit={handleSubmit}>
        <input name="file" type="file" onChange={handleFileChange} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Testing;
