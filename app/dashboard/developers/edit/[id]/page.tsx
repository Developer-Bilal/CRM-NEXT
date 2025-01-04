"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const EditDeveloper = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [source, setSource] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [resumeFile, setResumeFile] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [date, setDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/developers/${id}`)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name || "");
        setEmail(res.data.email || "");
        setRole(res.data.role || "");
        setPhone(res.data.phone || "");
        setCountry(res.data.country || "");
        setSource(res.data.source || "");
        setPortfolioURL(res.data.portfolioURL || "");
        setLinkedin(res.data.linkedin || "");
        setResumeFile(res.data.resumeFile || "");
        setProfilePhoto(res.data.profilePhoto || "");
        setDate(res.data.date || "");
        setAdditionalInfo(res.data.additionalInfo || "");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      email,
      role,
      phone,
      country,
      source,
      portfolioURL,
      linkedin,
      resumeFile,
      profilePhoto,
      date,
      additionalInfo,
    };

    axios
      .patch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/developers/${id}`, data)
      .then((res) => {
        console.log(res.data);
        router.push("/dashboard/developers");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="m-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded shadow"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Developer</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
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
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
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
            value={portfolioURL}
            onChange={(e) => setPortfolioURL(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
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
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Resume File
          </label>
          <input
            value={resumeFile}
            onChange={(e) => setResumeFile(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Photo
          </label>
          <input
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Additional Info
          </label>
          <input
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
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

export default EditDeveloper;
