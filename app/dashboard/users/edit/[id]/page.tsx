"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";

const EditUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("false");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  // password change
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // url error
  const [urlError, setUrlError] = useState("");
  const [passError, setPassError] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${id}`)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setIsAdmin(res.data.isAdmin.toString());
        setPhone(res.data.phone);
        setCountry(res.data.country);
        setProfilePhoto(res.data.profilePhoto);
        setLinkedin(res.data.linkedin);
        setAdditionalInfo(res.data.additionalInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const pattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-]+\/?$/;

    if (!pattern.test(linkedin)) {
      setUrlError(
        "Please enter a valid LinkedIn profile URL, e.g., https://www.linkedin.com/in/username"
      );
    } else {
      const data = {
        name,
        email,
        isAdmin,
        phone,
        country,
        profilePhoto,
        linkedin,
        additionalInfo,
        oldPassword,
        newPassword,
      };

      axios
        .patch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${id}`, data)
        .then((res) => {
          console.log(res.data);
          router.push("/dashboard/users");
          setPassError("");
        })
        .catch((err) => {
          console.log(err);
          setPassError("Incorrect Password!");
        });
    }
  };

  return (
    <div className="m-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded shadow"
      >
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
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
            isAdmin
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={isAdmin}
            onChange={(e) => setIsAdmin(e.target.value)}
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
            value={phone}
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
            value={profilePhoto}
            // onChange={(e) => setProfilePhoto(e.target.value)}
            readOnly
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={linkedin}
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
            Old Password
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={oldPassword}
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
            // required
          />
          {passError && <div className="text-red-600">{passError}</div>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={newPassword}
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            // required
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

export default EditUser;
