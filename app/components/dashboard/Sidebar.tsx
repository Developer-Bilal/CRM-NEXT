import Link from "next/link";
import SignOut from "../SignOut";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-60 max-h-full bg-gray-800 text-white">
      <div className="p-4 text-lg font-semibold">
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <nav className="flex-1">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/dashboard/users">
              <div>Users</div>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/dashboard/projects">
              <div>Projects</div>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/dashboard/clients">
              <div>Clients</div>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/dashboard/developers">
              <div>Developers</div>
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <SignOut />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

// // app/components/Sidebar.js
// "use client"; // Add this if you're using client-side code

// const Sidebar = () => {
//   return (
//   );
// };

// export default Sidebar;
