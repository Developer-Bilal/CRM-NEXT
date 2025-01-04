"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
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
const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [client, setClient] = useState("");
  const [developer, setDeveloper] = useState("");
  const [manager, setManager] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [budget, setBudget] = useState("");
  const [billing, setBilling] = useState("");
  const [requirements, setRequirements] = useState("");
  const [milestones, setMilestones] = useState("");
  const [progressTracker, setProgressTracker] = useState("");
  const [notes, setNotes] = useState("");
  const [relatedDocuments, setRelatedDocuments] = useState("");
  const [communicationHistory, setCommunicationHistory] = useState("");
  const router = useRouter();
  //
  const [clients, setClients] = useState([]);
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
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
      manager,
      startDate,
      deadline,
      priorityLevel,
      budget,
      billing,
      requirements,
      milestones,
      progressTracker,
      notes,
      relatedDocuments,
      communicationHistory,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects`, data)
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
        <h2 className="text-lg font-semibold mb-4">Create Project</h2>
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Manager
          </label>
          <input
            value={status}
            onChange={(e) => setManager(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Priority Level
          </label>
          <input
            value={priorityLevel}
            onChange={(e) => setPriorityLevel(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Budget
          </label>
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Billing
          </label>
          <input
            value={billing}
            onChange={(e) => setBilling(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Requirements
          </label>
          <input
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Milestones
          </label>
          <input
            value={milestones}
            onChange={(e) => setMilestones(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Progress Tracker
          </label>
          <input
            value={progressTracker}
            onChange={(e) => setProgressTracker(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Related Documents
          </label>
          <input
            value={relatedDocuments}
            onChange={(e) => setRelatedDocuments(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            CommunicationHistory
          </label>
          <input
            value={communicationHistory}
            onChange={(e) => setCommunicationHistory(e.target.value)}
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

export default CreateProject;
