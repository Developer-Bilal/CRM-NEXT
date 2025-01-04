"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const EditClient = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [source, setSource] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [date, setDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/clients/${id}`)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name || "");
        setEmail(res.data.email || "");
        setProfilePhoto(res.data.profilePhoto || "");
        setPhone(res.data.phone || "");
        setCountry(res.data.country || "");
        setSource(res.data.source || "");
        setWebsiteURL(res.data.websiteURL || "");
        setLinkedin(res.data.linkedin || "");
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
      profilePhoto,
      phone,
      country,
      source,
      websiteURL,
      linkedin,
      date,
      additionalInfo,
    };

    axios
      .patch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/clients/${id}`, data)
      .then((res) => {
        console.log(res.data);
        router.push("/dashboard/clients");
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
        <h2 className="text-lg font-semibold mb-4">Edit Client</h2>
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
            profilePhoto
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            phone
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            country
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            source
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            websiteURL
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            linkedin
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            date
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            additionalInfo
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
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

export default EditClient;
