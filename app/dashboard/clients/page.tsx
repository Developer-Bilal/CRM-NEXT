import { options } from "@/app/api/auth/[...nextauth]/options";
import DeleteBtn from "@/app/components/dashboard/DeleteBtn";
import { getServerSession } from "next-auth";
import Link from "next/link";

interface Client {
  _id: string;
  name: string;
  email: string;
  profilePhoto: string;
  phone: string;
  country: string;
  source: string;
  websiteURL: string;
  linkedin: string;
  date: string;
  additionalInfo: string;
}

const Clients = async () => {
  const session = await getServerSession(options);
  const authUser = session?.user?.email;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/clients/auth/${authUser}`,
    {
      cache: "no-store",
    }
  );
  const clients = await res.json();

  return (
    <div className="m-4">
      <div className="my-2 flex items-center justify-end">
        <Link href="/dashboard/clients/new">
          <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">
            Add Client
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
          {clients.map((client: Client) => (
            <tr
              key={client._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">{client.name}</td>
              <td className="py-3 px-6">{client.email}</td>
              <td className="py-3 px-6 flex gap-2">
                <Link href={`/dashboard/clients/edit/${client._id}`}>
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
                    Edit
                  </button>
                </Link>
                <Link href={`/dashboard/clients/${client._id}`}>
                  <button className="bg-pink-500 text-white py-1 px-3 rounded hover:bg-pink-700">
                    Details
                  </button>
                </Link>
                <DeleteBtn id={client._id} path={"clients"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
