import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { ArrowUp, Plus, TrendingUp } from "lucide-react";

import MyBarChart from "../../components/MyBarChart";
import MyBarAdminChart from "../../components/MyBarAdminChart";
import BarProjectStatus from "../../components/BarProjectStatus";
import BarPriority from "../../components/BarPriority";
import LineProjectsAdded from "../../components/LineProjectsAdded";
import LineProjectsCompleted from "../../components/LineProjectsCompleted";
import Link from "next/link";
import {
  getClients,
  getDevelopers,
  getProjects,
  getUsers,
} from "@/actions/getData";

const Dashboard = async () => {
  const session = await getServerSession(options);
  const authUser = session?.user?.email;

  const users = await getUsers(authUser);
  const projects = await getProjects(authUser);
  const developers = await getDevelopers(authUser);
  const clients = await getClients(authUser);

  return (
    <div className="flex flex-col gap-2 m-4">
      <div className="my-4 p-4 flex gap-8 items-center justify-around ">
        <Link
          href={`/dashboard/clients`}
          className="flex items-center justify-around px-4 py-10  w-full  shadow-lg border-t-2 border-gray-500 rounded"
        >
          <div>Clients</div>
          <div className="flex">
            <div className="flex items-center">
              <Plus className="size-3" />
              {clients.length}
            </div>
            <TrendingUp className="text-green-500" />
          </div>
        </Link>
        <Link
          href={`/dashboard/projects`}
          className="flex items-center justify-around px-4 py-10  w-full  shadow-lg border-t-2 border-gray-500 rounded"
        >
          <div>Projects</div>
          <div className="flex">
            <div className="flex items-center">
              <Plus className="size-3" />
              {projects.length}
            </div>
            <TrendingUp className="text-green-500" />
          </div>
        </Link>
        <Link
          href={`/dashboard/users`}
          className="flex items-center justify-around px-4 py-10  w-full  shadow-lg border-t-2 border-gray-500 rounded"
        >
          <div>Users</div>
          <div className="flex">
            <div className="flex items-center">
              <Plus className="size-3" />
              {users.length}
            </div>
            <TrendingUp className="text-green-500" />
          </div>
        </Link>
        <Link
          href={`/dashboard/developers`}
          className="flex items-center justify-around px-4 py-10  w-full  shadow-lg border-t-2 border-gray-500 rounded"
        >
          <div>Developers</div>
          <div className="flex">
            <div className="flex items-center">
              <Plus className="size-3" />
              {developers.length}
            </div>
            <TrendingUp className="text-green-500" />
          </div>
        </Link>
      </div>
      {/* className="w-[600px] h-[600px] mx-auto border-2 border-black" */}
      <div className="grid grid-cols-3 gap-2">
        <LineProjectsCompleted />
        <MyBarChart />
        <MyBarAdminChart />
        <LineProjectsAdded />
        <BarPriority />
        <BarProjectStatus />
      </div>

      {/* <div className="bg-orange-200 my-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left w-1/3">Project</th>
              <th className="py-3 px-6 text-left w-1/3">Client</th>
              <th className="py-3 px-6 text-left w-1/3">Developer</th>
              <th className="py-3 px-6 text-left w-1/3">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">Project</td>
              <td className="py-3 px-6">Client</td>
              <td className="py-3 px-6">Developer</td>
              <td className="py-3 px-6">Active</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Dashboard;
