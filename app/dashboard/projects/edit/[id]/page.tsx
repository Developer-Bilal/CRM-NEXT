"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
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

type Milestone = {
  [key: string]: boolean;
};
const EditProject = () => {
  const { id } = useParams();
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
  const [milestones, setMilestones] = useState<Milestone>({});
  const [progressTracker, setProgressTracker] = useState(0);
  const [notes, setNotes] = useState("");
  const [relatedDocuments, setRelatedDocuments] = useState("");
  const [communicationHistory, setCommunicationHistory] = useState("");

  const [clients, setClients] = useState([]);
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
        setManager(res.data.manager);
        setStartDate(res.data.startDate);
        setDeadline(res.data.deadline);
        setPriorityLevel(res.data.priorityLevel);
        setBudget(res.data.budget);
        setBilling(res.data.billing);
        setRequirements(res.data.requirements);
        setMilestones(JSON.parse(res.data.milestones));
        setProgressTracker(res.data.progressTracker);
        setNotes(res.data.notes);
        setRelatedDocuments(res.data.relatedDocuments);
        setCommunicationHistory(res.data.communicationHistory);
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
      manager,
      startDate,
      deadline,
      priorityLevel,
      budget,
      billing,
      requirements,
      milestones: JSON.stringify(milestones),
      progressTracker,
      notes,
      relatedDocuments,
      communicationHistory,
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

  //
  const handleChange = (milestone: string) => {
    setMilestones((prev) => ({
      ...prev,
      [milestone]: !milestones[milestone],
    }));
  };

  //
  const handleDeleteMilestone = (milestone: string) => {
    setMilestones((prev) => {
      const newObj = { ...prev };
      delete newObj[milestone];
      return newObj;
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
          {/* <input
            value={milestones}
            onChange={(e) => setMilestones(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          /> */}
          <ul>
            {Object.keys(milestones).map((m) => (
              <li className="flex items-center gap-4 py-2" key={m}>
                <div>
                  <input
                    type="checkbox"
                    checked={milestones[m]}
                    onChange={() => handleChange(m)}
                  />
                  <label>{m}</label>
                </div>
                <button
                  onClick={() => handleDeleteMilestone(m)}
                  className="bg-red-400 p-2 rounded text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Progress Tracker
          </label>
          <input
            value={progressTracker}
            // onChange={(e) => setProgressTracker(e.target.value)}
            // required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            readOnly
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
            // onChange={(e) => setRelatedDocuments(e.target.value)}
            // required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            CommunicationHistory
          </label>
          <input
            value={communicationHistory}
            // onChange={(e) => setCommunicationHistory(e.target.value)}
            // required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            readOnly
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

export default EditProject;
