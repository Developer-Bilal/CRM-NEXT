"use client";

import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Client {
  _id: string;
  name: string;
  email: string;
  profilePhoto: string;
  phone: string;
  country: string;
  source: string;
  websiteURL: string;
  linkedin: string;
  date: string;
  additionalInfo: string;
}

const ViewClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState<Client>({
    _id: "",
    name: "",
    email: "",
    profilePhoto: "",
    phone: "",
    country: "",
    source: "",
    websiteURL: "",
    linkedin: "",
    date: "",
    additionalInfo: "",
  });
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/clients/${id}`)
      .then((res) => {
        console.log(res.data);
        setClient(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="m-4">
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Client Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {client.name}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {client.email}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Photo
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {client.profilePhoto}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {client.phone}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {client.country}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Source
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {client.source}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Website URL
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {client.websiteURL}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {client.linkedin}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {client.date}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Additional Info
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {client.additionalInfo}
          </div>
        </div>
        <Link
          href={"/dashboard/clients/"}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default ViewClient;
