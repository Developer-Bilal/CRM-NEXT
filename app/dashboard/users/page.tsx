import DeleteBtn from "@/app/components/dashboard/DeleteBtn";
import Link from "next/link";

interface User {
  id: string;
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`, {
    cache: "no-store",
  });

  const users = await res.json();

  return (
    <div className="m-4">
      <div className="my-2 flex items-center justify-end">
        <Link href="/dashboard/users/new">
          <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">
            Add User
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left w-1/3">Name</th>
            <th className="py-3 px-6 text-left w-1/3">Email</th>
            {/* <th className="py-3 px-6 text-left w-1/3">isAdmin</th>
            <th className="py-3 px-6 text-left w-1/3">phone</th>
            <th className="py-3 px-6 text-left w-1/3">country</th>
            <th className="py-3 px-6 text-left w-1/3">profilePhoto</th>
            <th className="py-3 px-6 text-left w-1/3">linkedin</th>
            <th className="py-3 px-6 text-left w-1/3">additionalInfo</th> */}
            <th className="py-3 px-6 text-left w-1/3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user: User) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.email}</td>
              {/* <td className="py-3 px-6">{user.isAdmin}</td>
              <td className="py-3 px-6">{user.phone}</td>
              <td className="py-3 px-6">{user.country}</td>
              <td className="py-3 px-6">{user.profilePhoto}</td>
              <td className="py-3 px-6">{user.linkedin}</td>
              <td className="py-3 px-6">{user.additionalInfo}</td> */}
              <td className="py-3 px-6 flex gap-2">
                <Link href={`/dashboard/users/edit/${user.id}`}>
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
                    Edit
                  </button>
                </Link>
                <DeleteBtn id={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
