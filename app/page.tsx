"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ ease: "easeInOut" }}
      >
        <img
          src="/img/pattern.png"
          className="absolute pointer-events-none h-screen w-screen object-cover opacity-5"
          draggable="false"
          alt=""
        />
      </motion.div>
      <Header logo={false} />
      <div className="p-4 sm:p-10 lg:p-12 min-h-screen grid grid-cols-1 place-items-center">
        <div className="">
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 100, scale: 1 }}
              transition={{ ease: "easeInOut" }}
            >
              <img
                className="mx-auto w-[16rem] transition duration-200 lg:hover:scale-105 active:scale-95"
                src="./logo.svg"
                alt=""
                draggable="false"
              />
              <motion.div
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 100 }}
                transition={{ ease: "easeInOut", delay: 0.2 }}
              >
                <p className="mt-2 text-neutral-300 max-w-xl">
                  <span className="text-white">
                    Numerosi creator e influencer messi a confronto. Chi ha più
                    followers/iscritti tra i due? Quanto li conosci?
                  </span>
                  <br />
                  <span className="text-sm">
                    BETA{" "}
                    <span className="font-bold">
                      <b>v1.0</b>
                    </span>{" "}
                    - Dati aggiornati il 04 2024
                  </span>
                </p>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ y: -4, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            transition={{ ease: "easeInOut", delay: 0.3 }}
          >
            <div className="mt-12">
              <h1 className="text-3xl font-bold">
                <b>Tutte le edizioni</b>
              </h1>
            </div>
          </motion.div>
          <div className="items-center mt-6 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[100rem]">
            <motion.div
              initial={{ x: -4, opacity: 0 }}
              animate={{ x: 0, opacity: 100 }}
              transition={{ ease: "easeInOut", delay: 0.5 }}
              layout
            >
              <Link href={"/twitch"}>
                <div className="relative group transition duration-200 active:scale-95">
                  <div className="transition duration-200 lg:group-hover:opacity-80 absolute z-10 left-4 text-lg lg:text-2xl bottom-4 bg-black/60 backdrop-blur-md w-fit p-2 rounded-lg">
                    <h1>
                      <span className="font-bold">
                        <b>Twitch</b>
                      </span>{" "}
                      Edition
                    </h1>
                  </div>
                  <div className="overflow-hidden rounded-2xl border-2 border-purple-600 border-rounded">
                    <img
                      src="/img/twitch.png"
                      draggable="false"
                      className="transition duration-200 lg:group-hover:scale-105 group-active:scale-100"
                      alt=""
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
            {/* <motion.div
              initial={{ x: -4, opacity: 0 }}
              animate={{ x: 0, opacity: 100 }}
              transition={{ ease: "easeInOut", delay: 0.6 }}
              layout
            >
              <Link href={"/youtube"}>
                <div className="relative group transition duration-200 active:scale-95">
                  <div className="transition duration-200 lg:group-hover:opacity-80 absolute z-10 left-4 text-lg lg:text-2xl bottom-4 bg-black/60 backdrop-blur-md w-fit p-2 rounded-lg">
                    <h1>
                      <span className="font-bold">
                        <b>YouTube</b>
                      </span>{" "}
                      Edition
                    </h1>
                  </div>
                  <div className="overflow-hidden rounded-2xl border-2 border-red-600 border-rounded">
                    <img
                      src="/img/youtube.png"
                      draggable="false"
                      className="transition duration-200 lg:group-hover:scale-105 group-active:scale-100"
                      alt=""
                    />
                  </div>
                </div>
              </Link>
            </motion.div> */}
          </div>
        </div>
      </div>
    </>
  );
}
