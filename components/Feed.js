import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../Firebase";
import { HiOutlineSparkles } from "react-icons/hi";
import Input from "./Input";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (onSnapshot) => {
          setPosts(onSnapshot.docs);
        }
      ),

    []
  );
  console.log(posts);

  return (
    <div className=" sm:ml[81px] xl:-ml-12 w-[600px] min-h-screen border-r border-gray-400 text-white py-2 box-border">
      <div className="sticky top-0 bg-black flex justify-between font-medium text-[20px] px-4 py-2 box-border">
        <h1 className="">Home</h1>
        <HiOutlineSparkles />
      </div>
      <Input />
    </div>
  );
};

export default Feed;
