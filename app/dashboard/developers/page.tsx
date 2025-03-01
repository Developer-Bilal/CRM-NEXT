import { options } from "@/app/api/auth/[...nextauth]/options";
import DeleteBtn from "@/app/components/dashboard/DeleteBtn";
import { getServerSession } from "next-auth";
import Link from "next/link";

interface Developer {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  country: string;
  source: string;
  portfolioURL: string;
  linkedin: string;
  resumeFile: string;
  profilePhoto: string;
  date: string;
  additionalInfo: string;
}

const Developers = async () => {
  const session = await getServerSession(options);
  const authUser = session?.user?.email;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/developers/auth/${authUser}`,
    {
      cache: "no-store",
    }
  );

  const developers = await res.json();

  return (
    <div className="m-4">
      <div className="my-2 flex items-center justify-end">
        <Link href="/dashboard/developers/new">
          <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">
            Add Developer
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left w-1/3">Name</th>
            <th className="py-3 px-6 text-left w-1/3">Email</th>
            <th className="py-3 px-6 text-left w-1/3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {developers.map((developer: Developer) => (
            <tr
              key={developer._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">{developer.name}</td>
              <td className="py-3 px-6">{developer.email}</td>
              <td className="py-3 px-6 flex gap-2">
                <Link href={`/dashboard/developers/edit/${developer._id}`}>
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
                    Edit
                  </button>
                </Link>
                <Link href={`/dashboard/developers/${developer._id}`}>
                  <button className="bg-pink-500 text-white py-1 px-3 rounded hover:bg-pink-700">
                    Details
                  </button>
                </Link>
                <DeleteBtn id={developer._id} path={"developers"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Developers;
