import DeleteProjectBtn from "@/app/components/dashboard/projects/DeleteProjectBtn";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
}

const Projects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects`, {
    cache: "no-store",
  });

  const projects = await res.json();

  console.log(projects);
  return (
    <div className="m-4">
      <div className="my-2 flex items-center justify-end">
        <Link href="/dashboard/projects/new">
          <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">
            Add Project
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left w-1/3">Title</th>
            <th className="py-3 px-6 text-left w-1/3">Description</th>
            <th className="py-3 px-6 text-left w-1/3">Status</th>
            <th className="py-3 px-6 text-left w-1/3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {projects.map((project: Project) => (
            <tr
              key={project.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">{project.title}</td>
              <td className="py-3 px-6">{project.description}</td>
              <td className="py-3 px-6">{project.status}</td>
              <td className="py-3 px-6 flex gap-2">
                <Link href={`/dashboard/projects/edit/${project.id}`}>
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
                    Edit
                  </button>
                </Link>
                <DeleteProjectBtn id={project.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
