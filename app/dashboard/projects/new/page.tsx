"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { DatePicker } from "@/components/DatePicker";

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
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [deadline, setDeadline] = useState<Date | undefined>(new Date());
  const [priorityLevel, setPriorityLevel] = useState("");
  const [budget, setBudget] = useState("");
  const [billing, setBilling] = useState("");
  const [requirements, setRequirements] = useState("");
  const [milestones, setMilestones] = useState("");
  const [progressTracker, setProgressTracker] = useState("");
  const [notes, setNotes] = useState("");
  const [relatedDocuments, setRelatedDocuments] = useState<File | null>(null);
  const [communicationHistory, setCommunicationHistory] = useState<File | null>(
    null
  );
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

  // handle file change
  const handleRelatedDocuments = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setRelatedDocuments(selectedFile);
  };

  const handleCommunicationHistory = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setCommunicationHistory(selectedFile);
  };

  // handle submit form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Append other fields
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("client", client);
    formData.append("developer", developer);
    formData.append("manager", manager);
    formData.append(
      "startDate",
      startDate ? new Date(startDate).toISOString().split("T")[0] : ""
    );
    formData.append(
      "deadline",
      deadline ? new Date(deadline).toISOString().split("T")[0] : ""
    );
    formData.append("priorityLevel", priorityLevel);
    formData.append("budget", budget);
    formData.append("billing", billing);
    formData.append("requirements", requirements);
    formData.append("milestones", milestones);
    formData.append("progressTracker", progressTracker);
    formData.append("notes", notes);

    // Check if files are selected
    if (relatedDocuments && communicationHistory) {
      formData.append("relatedDocuments", relatedDocuments);
      formData.append("communicationHistory", communicationHistory);
    } else {
      console.log("No files selected");
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        router.push("/dashboard/projects");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //
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
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Planned">Planned</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
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
            <option value="">Select an option</option>
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
            <option value="">Select an option</option>
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
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
          >
            <option value="">Select an option</option>
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
            Start Date
          </label>
          {/* date picker */}
          <DatePicker date={startDate} setDate={setStartDate} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <DatePicker date={deadline} setDate={setDeadline} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Priority Level
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={priorityLevel}
            onChange={(e) => setPriorityLevel(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
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
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={billing}
            onChange={(e) => setBilling(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Hourly">Hourly</option>
            <option value="Fixed">Fixed</option>
            <option value="Milestone-Based">Milestone-Based</option>
          </select>
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
            type="file"
            name="relatedDocuments"
            onChange={handleRelatedDocuments}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            CommunicationHistory
          </label>
          <input
            type="file"
            name="communicationHistory"
            onChange={handleCommunicationHistory}
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
