import Link from "next/link";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);

  return (
    <div className="flex items-center justify-center flex-col h-screen gap-8">
      <div>Home page</div>
      {session && session.user ? (
        <div>Hello {session.user.name}</div>
      ) : (
        <div>Not signed in</div>
      )}
      <div>
        <Link href="/dashboard">
          <button className="bg-red-400 px-4 py-2 rounded">Dashboard</button>
        </Link>
      </div>
      <div className="flex gap-4">{session ? <SignOut /> : <SignIn />}</div>
    </div>
  );
}
