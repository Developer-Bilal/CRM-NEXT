import { options } from "@/app/api/auth/[...nextauth]/options";
import DeleteBtn from "@/app/components/dashboard/DeleteBtn";
import { getServerSession } from "next-auth";
import Link from "next/link";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: string;
  phone: string;
  country: string;
  profilePhoto: string;
  linkedin: string;
  additionalInfo: string;
}

const Users = async () => {
  const session = await getServerSession(options);
  const authUser = session?.user?.email;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/auth/${authUser}`,
    {
      cache: "no-store",
    }
  );

  const users = await res.json();

  console.log(users);

  return (
    <div className="m-4">
      <div className="my-2 flex items-center justify-end">
        <Link href="/dashboard/users/new">
          <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">
            Add User
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left w-1/3">Name</th>
              <th className="py-3 px-6 text-left w-1/3">Email</th>
              <th className="py-3 px-6 text-left w-1/3">isAdmin</th>
              <th className="py-3 px-6 text-left w-1/3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((u: User) => (
              <tr
                key={u._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{u.name}</td>
                <td className="py-3 px-6">{u.email}</td>
                <td className="py-3 px-6">{u.isAdmin.toString()}</td>
                <td className="py-3 px-6 flex gap-2">
                  <Link href={`/dashboard/users/edit/${u._id}`}>
                    <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
                      Edit
                    </button>
                  </Link>
                  <Link href={`/dashboard/users/${u._id}`}>
                    <button className="bg-pink-500 text-white py-1 px-3 rounded hover:bg-pink-700">
                      Details
                    </button>
                  </Link>
                  <DeleteBtn id={u._id} path={"users"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
