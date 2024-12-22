"use client";

import { signOut } from "next-auth/react";

const SignOut = () => {
  return <button onClick={() => signOut()}>Sign out</button>;
};

export default SignOut;
