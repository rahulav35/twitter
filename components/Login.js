import React from "react";
import { ImTwitter } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col h-screen bg-[#1d9bf0] items-center justify-center  ">
        <ImTwitter className="text-white text-[200px]  " />
        <h1 className="text-white font-mono font-semibold text-3xl mt-10  ">
          Welcome To Twitter
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <div
          onClick={() => signIn("google")}
          className="flex p-2 px-8+ box-border cursor-pointer items-center justify-center gap-4 bg-white rounded-[15px] "
        >
          <FcGoogle className="text-[30px]" />
          <h1 className="text-lg font-serif ">SignIn With Google</h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
