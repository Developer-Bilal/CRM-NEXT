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

const ViewProject = () => {
  const { id } = useParams();
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
