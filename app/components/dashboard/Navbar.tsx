import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import SignIn from "../SignIn";
import SignOut from "../SignOut";

const Navbar = async () => {
  const session = await getServerSession();
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-100 ">
      <div className="logo w-1/5 ">
        <div className="font-bold text-xl">Admin.</div>
      </div>
      <div className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700">
        {session ? <SignOut /> : <SignIn />}
      </div>
    </div>
  );
};

export default Navbar;
