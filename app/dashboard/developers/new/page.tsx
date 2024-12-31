"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const CreateDeveloper = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      email,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`, data)
      .then((res) => {
        console.log(res.data);
        router.push("/dashboard/developers");
      })
      .catch((err) => console.log(err));
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
