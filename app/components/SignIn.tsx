"use client";

import { signIn } from "next-auth/react";

const SignIn = () => {
  return <button onClick={() => signIn()}>Sign in</button>;
};

export default SignIn;
