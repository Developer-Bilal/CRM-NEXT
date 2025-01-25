"use client";

import axios from "axios";
import { Divide } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [linkedin, setLinkedin] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [password, setPassword] = useState("");

  // url error
  const [urlError, setUrlError] = useState("");
  const router = useRouter();

  const handleProfilePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const seletedFile = e.target.files ? e.target.files[0] : null;
    setProfilePhoto(seletedFile);
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
      formData.append("isAdmin", isAdmin);
      formData.append("phone", phone);
      formData.append("country", country);
      formData.append("linkedin", linkedin);
      formData.append("additionalInfo", additionalInfo);
      formData.append("password", password);
      // profile photo file
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      } else {
        console.log("No files selected");
        return;
      }

      axios
        .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          router.push("/dashboard/users");
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
        <h2 className="text-lg font-semibold mb-4">Create User</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
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
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            isAdmin
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setIsAdmin(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setPhone(e.target.value)}
            required
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
            Profile Photo
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            type="file"
            name="profilePhoto"
            onChange={handleProfilePhoto}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setLinkedin(e.target.value)}
            required
          />
          {urlError && <div className="text-red-600">{urlError}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Additional Info
          </label>
          <textarea
            className="mt-1 block w-full p-2 h-40 border border-gray-300 rounded"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            type="password"
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            required
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

export default CreateUser;
