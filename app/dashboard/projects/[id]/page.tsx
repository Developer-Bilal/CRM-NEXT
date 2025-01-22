"use client";

import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
  client: string;
  developer: string;
  manager: string;
  startDate: string;
  deadline: string;
  priorityLevel: string;
  budget: string;
  billing: string;
  requirements: string;
  milestones: string;
  progressTracker: string;
  notes: string;
  relatedDocuments: string;
  communicationHistory: string;
}

type Milestone = {
  [key: string]: boolean;
};
const ViewProject = () => {
  const { id } = useParams();
  const [milestones, setMilestones] = useState<Milestone>({});
  const [project, setPoject] = useState<Project>({
    _id: "",
    title: "",
    description: "",
    status: "",
    client: "",
    developer: "",
    manager: "",
    startDate: "",
    deadline: "",
    priorityLevel: "",
    budget: "",
    billing: "",
    requirements: "",
    milestones: "",
    progressTracker: "",
    notes: "",
    relatedDocuments: "",
    communicationHistory: "",
  });
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects/${id}`)
      .then((res) => {
        console.log(res.data);
        setPoject(res.data);
        setMilestones(JSON.parse(res.data.milestones));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="m-4">
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Project Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.title}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.description}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.status}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Client
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.client}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Developer
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.developer}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Manager
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.manager}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.startDate}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.deadline}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Priority Level
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.priorityLevel}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Budget
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.budget}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Billing
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.billing}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Requirements
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.requirements}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Milestones
          </label>
          <ul>
            {Object.keys(milestones).map((m) => (
              <li className="flex items-center gap-4 py-2" key={m}>
                <input
                  type="checkbox"
                  checked={milestones[m]}
                  onChange={() => {}}
                />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Progress Tracker
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.progressTracker}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.notes}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Related Documents
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.relatedDocuments}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Communication History
          </label>
          <div className="mt-1 block w-full p-2 border border-gray-300 rounded">
            {project.communicationHistory}
          </div>
        </div>
        <Link
          href={"/dashboard/projects/"}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default ViewProject;
