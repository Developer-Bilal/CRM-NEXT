"use client";

import { DatePicker } from "@/components/DatePicker";
import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";

const CreateDeveloper = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [source, setSource] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [additionalInfo, setAdditionalInfo] = useState("");

  // preview image
  const [preview, setPreview] = useState("");
  // url error
  const [urlError, setUrlError] = useState("");
  const router = useRouter();

  // auth user
  const [authUser, setAuthUser] = useState<string>("");

  useEffect(() => {
    async function getCurrentSession() {
      const session = await getSession();
      setAuthUser(session?.user?.email as string);
    }

    getCurrentSession();
  }, []);

  const handleResumeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setResumeFile(selectedFile);
  };

  const handleProfilePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setProfilePhoto(selectedFile);
    setPreview(URL.createObjectURL(selectedFile!));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const pattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-]+\/?$/;

    if (!pattern.test(linkedin)) {
      setUrlError(
        "Please enter a valid LinkedIn profile URL, e.g., https://www.linkedin.com/in/username"
      );
    } else {
      const formData = new FormData();

      // form fields
      formData.append("name", name);
      formData.append("email", email);
      formData.append("role", role);
      formData.append("phone", phone);
      formData.append("country", country);
      formData.append("source", source);
      formData.append("portfolioURL", portfolioURL);
      formData.append("linkedin", linkedin);
      formData.append("additionalInfo", additionalInfo);

      // date
      formData.append(
        "date",
        date ? new Date(date).toISOString().split("T")[0] : ""
      );

      // auth user
      formData.append("addedBy", authUser);

      // profile photo file and resume file
      if (profilePhoto && resumeFile) {
        formData.append("profilePhoto", profilePhoto);
        formData.append("resumeFile", resumeFile);
      } else {
        console.log("No files selected");
        return;
      }

      axios
        .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/developers`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          router.push("/dashboard/developers");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="m-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded shadow"
      >
        <h2 className="text-lg font-semibold mb-4">Create Developer</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Photo
          </label>
          <input
            type="file"
            onChange={handleProfilePhoto}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {preview && (
            <Image
              className="flex items-center justify-center p-6 w-full"
              src={preview}
              alt="profile image"
              width={200}
              height={200}
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <CountryDropdown
            className="p-2 w-full rounded"
            value={country}
            onChange={(val) => setCountry(val)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Source
          </label>
          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Portfolio URL
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            type="url"
            value={portfolioURL}
            onChange={(e) => setPortfolioURL(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {urlError && <div className="text-red-600">{urlError}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Resume File
          </label>
          <input
            type="file"
            name="resumeFile"
            onChange={handleResumeFile}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <DatePicker date={date} setDate={setDate} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Additional Info
          </label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            required
            className="mt-1 block w-full h-40 p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateDeveloper;
