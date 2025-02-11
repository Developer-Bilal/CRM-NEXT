"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: string;
  phone: string;
  country: string;
  profilePhoto: string;
  linkedin: string;
  additionalInfo: string;
}

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    isAdmin: "",
    phone: "",
    country: "",
    profilePhoto: "",
    linkedin: "",
    additionalInfo: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="m-4">
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">User Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {user.name}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {user.email}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            isAdmin
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {user.isAdmin.toString()}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {user.phone}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {user.country}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Photo
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {user.profilePhoto}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {user.linkedin}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Additional Info
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {user.additionalInfo}
          </div>
        </div>
        <Link
          href={"/dashboard/users/"}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default ViewUser;
