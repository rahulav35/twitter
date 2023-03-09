import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineGif } from "react-icons/ai";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { RiBarChart2Line } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCalendarNumberOutline } from "react-icons/io5";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../Firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Input = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const sendPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  return (
    <div className={`mt-4 px-4 ${loading && "opacity-60"}`}>
      <div className="grid grid-cols-[48px,1fr] gap-1">
        <div>
          <Image
            className="rounded-full object-contain"
            width={34}
            height={34}
            src={"/telegram 2.svg"}
            alt=""
          />
        </div>
        <div className="w-[90%] rounded-xl border-[1px] border-sky-500 p-2 box-border">
          <textarea
            className="w-[100%] bg-transparent outline-none text-[14px]"
            name="write"
            id=""
            cols="1"
            rows="4"
            placeholder="Whats Happening?"
          ></textarea>

          {selectedFile && (
            <div className="relative mb-4">
              <div
                onClick={() => setSelectedFile(null)}
                className="absolute w-8 h-8 bg-[#15181c] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
              >
                <AiOutlineClose className="text-white h-5" />
              </div>

              <Image
                width={700}
                height={100}
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}

          {!loading && (
            <div className="flex justify-between items-center">
              <div className="flex gap-4 text-[20px] text-[#1d9bf0]">
                <label htmlFor="file">
                  <BsImage className="cursor-pointer" />
                </label>
                <input type="file" id="file" hidden onChange={addImageToPost} />

                <div className="border-[1px] border-[#1d9bf0] rounded-[3px] h-[18px] text-[16px] grid place-content-center">
                  <AiOutlineGif />
                </div>
                <RiBarChart2Line className="rotate-90" />
                <BsEmojiSmile
                  onClick={() => setShowEmojis(!showEmojis)}
                  className="cursor-pointer"
                />
                <IoCalendarNumberOutline />
                <HiOutlineLocationMarker />
              </div>

              <button
                className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 box-border shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                disabled={!input.trim() && !selectedFile}
                onClick={sendPost}
              >
                Tweet
              </button>
            </div>
          )}

          {showEmojis && (
            <div className="absolute mt-[15px] -ml-[10px] max-w-[320px]  rounded-[20px]">
              <Picker
                //  onEmojiSelect={addEmoji}
                data={data}
                theme="dark"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
