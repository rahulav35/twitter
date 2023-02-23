import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";

function index() {
  const { data: session } = useSession();
  if (!session) {
    return <Login />;
  }
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <Head>
        <title>Twitter</title>
      </Head>
      <main className="relative max-w-[1400px] mx-auto">
        <Sidebar />
      </main>
    </div>
  );
}

export default index;
