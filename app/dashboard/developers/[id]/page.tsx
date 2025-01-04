"use client";

import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Developer {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  country: string;
  source: string;
  portfolioURL: string;
  linkedin: string;
  resumeFile: string;
  profilePhoto: string;
  date: string;
  additionalInfo: string;
}

const ViewDeveloper = () => {
  const { id } = useParams();
  const [Developer, setDeveloper] = useState<Developer>({
    _id: "",
    name: "",
    email: "",
    role: "",
    phone: "",
    country: "",
    source: "",
    portfolioURL: "",
    linkedin: "",
    resumeFile: "",
    profilePhoto: "",
    date: "",
    additionalInfo: "",
  });
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/Developers/${id}`)
      .then((res) => {
        console.log(res.data);
        setDeveloper(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="m-4">
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Developer Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {Developer.name}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {Developer.email}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {Developer.role}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {Developer.phone}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {Developer.country}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Source
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {Developer.source}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Portfolio URL
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {Developer.portfolioURL}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {Developer.linkedin}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Resume File
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {Developer.resumeFile}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Photo
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {Developer.profilePhoto}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {Developer.date}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Additional Info
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {Developer.additionalInfo}
          </div>
        </div>
        <Link
          href={"/dashboard/developers/"}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default ViewDeveloper;
