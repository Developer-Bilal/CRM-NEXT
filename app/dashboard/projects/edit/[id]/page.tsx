"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface arrayClient {
  _id: string;
  name: string;
  email: string;
}

interface arrayDeveloper {
  _id: string;
  name: string;
  email: string;
}
const EditProject = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [client, setClient] = useState("");
  const [clients, setClients] = useState([]);
  const [developer, setDeveloper] = useState("");
  const [developers, setDevelopers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects/${id}`)
      .then((res) => {
        // console.log(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setStatus(res.data.status);
        setClient(res.data.client);
        setDeveloper(res.data.developer);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/clients`)
      .then((res) => {
        console.log(res.data);
        setClients(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/developers`)
      .then((res) => {
        console.log(res.data);
        setDevelopers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      title,
      description,
      status,
      client,
      developer,
    };

    axios
      .patch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects/${id}`, data)
      .then((res) => {
        console.log(res.data);
        router.push("/dashboard/projects");
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
        <h2 className="text-lg font-semibold mb-4">Edit Project</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Client
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          >
            <option value=""></option>
            {clients &&
              clients.map((arrayclient: arrayClient) => (
                <option key={arrayclient._id} value={arrayclient.name}>
                  {arrayclient.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Developer
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
          >
            <option value=""></option>
            {developers &&
              developers.map((arrayDeveloper: arrayDeveloper) => (
                <option key={arrayDeveloper._id} value={arrayDeveloper.name}>
                  {arrayDeveloper.name}
                </option>
              ))}
          </select>
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

export default EditProject;
