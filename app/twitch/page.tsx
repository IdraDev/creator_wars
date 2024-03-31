// @ts-nocheck
"use client";
import React, { Fragment, useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import Header from "@/components/header";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUp,
  faArrowDown,
  faXmark,
  faCheck,
  faArrowLeft,
  faArrowRotateBack,
} from "@fortawesome/free-solid-svg-icons";
import data from "@/public/data/twitch/data.json";
import gifs from "@/public/data/twitch/gifs.json";

import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { Dialog, Transition } from "@headlessui/react";

export default function Twitch() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [element1, setElement1] = useState();
  const [element2, setElement2] = useState();
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [buttons, setButtons] = useState(true);
  const [open, setOpen] = useState(false);
  const [animationKey1, setAnimationKey1] = useState(0);
  const [animationKey2, setAnimationKey2] = useState(1);

  // Random Indexes
  const generateRandomIndexes = (prevIndexes) => {
    let index1 = Math.floor(Math.random() * data.length);
    let index2 = Math.floor(Math.random() * data.length);

    while (
      index1 === prevIndexes[0] ||
      index1 === prevIndexes[1] ||
      index2 === prevIndexes[0] ||
      index2 === prevIndexes[1] ||
      index1 === index2
    ) {
      index1 = Math.floor(Math.random() * data.length);
      index2 = Math.floor(Math.random() * data.length);
    }

    return [index1, index2];
  };

  useEffect(() => {
    const [index1, index2] = generateRandomIndexes([
      element1?.index,
      element2?.index,
    ]);
    setElement1({ ...data[index1], index: index1 });
    setElement2({ ...data[index2], index: index2 });
  }, []);

  // LocalStorage Best Score
  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScore");
    const parsedBestScore = parseInt(storedBestScore);

    if (!isNaN(parsedBestScore) && parsedBestScore > bestScore) {
      setBestScore(parsedBestScore);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bestScore", bestScore.toString());
  }, [bestScore]);

  // Followers data Fetch
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: followersData1, error: followersError1 } = useSWR(
    element1
      ? `https://twitchtracker.com/api/channels/summary/${element1.name.toLowerCase()}`
      : null,
    fetcher
  );

  const { data: followersData2, error: followersError2 } = useSWR(
    element2
      ? `https://twitchtracker.com/api/channels/summary/${element2.name.toLowerCase()}`
      : null,
    fetcher
  );

  // Answer engine
  const checkAnswer = (selected) => {
    const isCorrect = selected
      ? followersData2?.followers_total > followersData1?.followers_total
      : followersData2?.followers_total < followersData1?.followers_total;
    if (isCorrect) {
      setCorrect(true);
      setButtons(false);
      setTimeout(() => {
        setAnimationKey1(animationKey1 + 1);
        setAnimationKey2(animationKey2 + 1);
        setCorrect(false);
        setButtons(true);
        setWrong(false);
        const [index1, index2] = generateRandomIndexes([
          element1?.index,
          element2?.index,
        ]);
        setElement1({ ...data[index1], index: index1 });
        setElement2({ ...data[index2], index: index2 });
        setScore(score + 1);
        if (score + 1 > bestScore) setBestScore(score + 1);
      }, 1600);
    } else {
      setButtons(false);
      setWrong(true);
      setTimeout(() => {
        setOpen(true);
      }, 3200);
    }
  };

  // Number formatter
  const formatNumber = (number) => {
    if (number < 1000) {
      return number;
    } else if (number < 1000000) {
      return (number / 1000).toFixed(1) + "k";
    } else if (number < 1000000000) {
      return (number / 1000000).toFixed(1) + "Mln";
    } else {
      return (number / 1000000000).toFixed(1) + "Mld";
    }
  };

  // Random gif
  const randomgif = Math.floor(Math.random() * gifs.length);

  return (
    <main>
      <Transition.Root show={open} as={Fragment} onClose={setOpen}>
        <Dialog as="div" className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 grayscale bg-black/30 backdrop-blur-sm bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black/50 border-2 border-white/10 backdrop-blur-md text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <img
                      src={gifs[randomgif].image.src}
                      alt=""
                      className="w-full h-[12rem] md:h-[18rem] rounded-lg mb-2 object-cover"
                    />
                    <p className="opacity-80 text-sm mb-2">
                      Fonte immagine:{" "}
                      <Link href={gifs[randomgif].image.src} target="_blank">
                        <span className="font-bold">
                          <b>{gifs[randomgif].image.source}</b>
                        </span>
                      </Link>
                    </p>
                    <div className="text-center flex justify-center items-center px-8">
                      <div>
                        <h1 className="text-4xl sm:text-5xl text-center text-red-400 font-bold">
                          <b>Game Over!</b>
                        </h1>
                        <p>
                          <span className="opacity-80 tex-2xl">
                            Hai fatto un punteggio di{" "}
                          </span>
                          <span className="text-[#FFEA2D]">{score} </span>
                          <span className="opacity-80">
                            {" "}
                            (Migliore: {bestScore})
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-2 border-white/5 bg-white/5 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="transition duration-200 active:scale-95 inline-flex w-full justify-center rounded-lg lg:hover:opacity-50 bg-red-400 text-red-900 px-8 py-2 font-semibold items-center sm:ml-3 sm:w-auto"
                      onClick={() => window.location.reload()}
                    >
                      <span>
                        <FontAwesomeIcon
                          width={"2rem"}
                          color="#7f1d1d"
                          icon={faArrowRotateBack as IconProp}
                        />
                      </span>
                      <span>Riprova</span>
                    </button>
                    <Link href={"/"}>
                      <button
                        type="button"
                        className="transition duration-200 active:scale-95 lg:hover:opacity-50 mt-3 inline-flex w-full justify-center rounded-lg text-white border-2 border-white px-3 py-2 font-semibold ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                      >
                        <span>
                          <FontAwesomeIcon
                            width={"2rem"}
                            color="white"
                            icon={faArrowLeft as IconProp}
                          />
                        </span>
                        <span>Indietro</span>
                      </button>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="pointer-events-none absolute z-50 w-screen flex justify-center pt-[1rem] md:pt-[0.8rem] lg:pt-4">
        <div className="text-center flex flex-col -space-y-1 md:space-y-0">
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 10, opacity: 100 }}
          >
            <p>
              <span className="opacity-80">Punteggio: </span>
              {score} <span className="opacity-80">Migliore: </span>{" "}
              <span className="text-[#FFEA2D]">{bestScore}</span>
            </p>
          </motion.div>
        </div>
      </div>
      <div className="pointer-events-none absolute z-50 w-screen flex justify-center pt-[2.8rem] md:pt-[2.5rem] lg:pt-12">
        <div className="text-center flex flex-col -space-y-1 md:space-y-0">
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 10, opacity: 100 }}
          >
            <h1 className="flex flex-row space-x-2 drop-shadow-md font-black text-2xl lg:text-5xl tracking-tight">
              <span className="hidden sm:inline-flex">
                <FontAwesomeIcon
                  width={"2rem"}
                  color="white"
                  icon={faTwitch as IconProp}
                />
              </span>
              <b>Chi ha più follower?</b>
            </h1>
          </motion.div>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{ y: 0, delay: 0.1, ease: "easeInOut" }}
          >
            <p className="items-center drop-shadow-md text-lg opacity-80">
              <span className="inline-flex sm:hidden">
                <FontAwesomeIcon
                  width={"1rem"}
                  color="white"
                  icon={faTwitch as IconProp}
                />
              </span>
              <span className="relative -top-0.5 sm:top-0">
                Su <b>Twitch</b>
              </span>
            </p>

            {wrong && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 100 }}
              >
                <div className="flex flex-row space-x-2 items-center mt-1 lg:mt-3 rounded-full bg-red-400 text-red-900 w-fit mx-auto px-12 py-1 shadow">
                  <FontAwesomeIcon color="#7f1d1d" icon={faXmark as IconProp} />
                  <span>Sbagliato!</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <div className="pointer-events-none absolute z-50 w-screen flex items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 100, scale: 1 }}
          transition={{ ease: "easeInOut", bounce: 5 }}
        >
          <div
            className={`justify-center p-4 lg:p-6 rounded-full shadow-xl  ${!wrong && !correct && "bg-white shadow-white/20"} text-black ${wrong && "bg-red-400 text-red-400 shadow-red-400/20"} ${correct && "bg-green-400 text-green-400 shadow-green-400/20"}`}
          >
            <h1 className={`text-2xl lg:text-4xl`}>
              {!wrong && !correct && <span className="mx-0.5">vs</span>}{" "}
              {wrong && (
                <div className="-mb-1 mx-1">
                  <FontAwesomeIcon color="#7f1d1d" icon={faXmark as IconProp} />
                </div>
              )}{" "}
              {correct && (
                <div className="-mb-1 mx-0.5">
                  <FontAwesomeIcon color="#14532d" icon={faCheck as IconProp} />
                </div>
              )}
            </h1>
          </div>
        </motion.div>
      </div>
      <Header />

      <div className="flex flex-col lg:flex-row h-screen">
        {element1 && (
          <div className="group w-full lg:w-[50%] h-[50%] lg:h-screen relative">
            <div className="z-10 absolute inset-0 flex flex-col justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 100, scale: 1 }}
                transition={{ ease: "easeInOut", bounce: 5 }}
              >
                <h1 className="text-center drop-shadow-md font-bold text-4xl lg:text-6xl">
                  <b>{element1?.name}</b>
                </h1>
              </motion.div>
              <motion.div
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: -4, opacity: 100 }}
                transition={{ delay: 0.2 }}
              >
                <p className="drop-shadow-md text-lg lg:text-3xl opacity-80">
                  ne ha
                </p>
              </motion.div>
              <motion.div
                key={animationKey1}
                initial={{ y: -0, opacity: 0 }}
                animate={{
                  y: followersData1 ? -5 : 0,
                  opacity: followersData1 ? 100 : 0,
                }}
                transition={{ delay: 0.5 }}
              >
                <h1 className="drop-shadow-md text-[#FFEA2D] font-bold text-4xl sm:text-5xl lg:text-6xl">
                  <b>{formatNumber(followersData1?.followers_total)}</b>
                </h1>
              </motion.div>
            </div>
            <div className="text-sm opacity-80 fixed z-50 bottom-8 left-10">
              {element1?.image.source != "" && (
                <p>
                  Fonte immagine:{" "}
                  <Link href={element1?.image.src} target="_blank">
                    <strong>{element1?.image.source}</strong>
                  </Link>
                </p>
              )}
            </div>
            <img
              src={element1?.image.src}
              className={`${wrong && "grayscale"} w-full h-full object-cover transition duration-200 opacity-20 group-hover:lg:opacity-30`}
              draggable="false"
              alt=""
            />
          </div>
        )}
        {element2 && (
          <div className="group w-full lg:w-[50%] h-[50%] lg:h-screen relative">
            <div className="z-10 absolute inset-0 flex flex-col justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 100, scale: 1 }}
                transition={{ ease: "easeInOut", bounce: 5 }}
              >
                <h1 className="text-center drop-shadow-md font-bold text-4xl sm:text-5xl lg:text-6xl">
                  <b>{element2?.name}</b>
                </h1>
              </motion.div>
              <motion.div
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: -0, opacity: 100 }}
                transition={{ delay: 0.2 }}
              >
                <p className="drop-shadow-md text-2xl lg:text-3xl opacity-80">
                  ne ha
                </p>
              </motion.div>
              {(wrong || correct) && (
                <motion.div
                  key={animationKey2}
                  initial={{ y: -0, opacity: 0 }}
                  animate={{
                    y: followersData2 ? -5 : 0,
                    opacity: followersData2 ? 100 : 0,
                  }}
                  transition={{ delay: 0.5 }}
                >
                  <h1
                    className={`drop-shadow-md text-[#FFEA2D] ${wrong && "text-red-400"} ${correct && "text-green-400"} drop-shadow-md font-bold text-5xl lg:text-6xl`}
                  >
                    <b>{formatNumber(followersData2?.followers_total)}</b>
                  </h1>
                </motion.div>
              )}

              {buttons && (
                <div className="flex items-center pt-4 flex-col space-y-4">
                  <motion.div
                    key={animationKey2}
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: -0, opacity: 100 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button
                      onClick={() => checkAnswer(true)}
                      className="shadow-md focus:outline-none w-fit text-center items-center transition duration-200 lg:hover:scale-105 lg:hover:bg-black/50 active:scale-95 focus:ring-2 focus:ring-white/10 flex flex-row space-x-2 rounded-full px-12 py-2.5 border-2 border-white/30 lg:hover:border-white/80 bg-black/20 backdrop-blur-sm"
                    >
                      <span>Di più</span>{" "}
                      <FontAwesomeIcon
                        width={"0.8rem"}
                        color="#54FF45"
                        icon={faArrowUp as IconProp}
                      />
                    </button>
                  </motion.div>
                  <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -5, opacity: 100 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button
                      onClick={() => checkAnswer(false)}
                      className="shadow-md focus:outline-none  w-fit text-center items-center transition duration-200 lg:hover:scale-105 lg:hover:bg-black/50 active:scale-95 focus:ring-2 focus:ring-white/10 flex flex-row space-x-2 rounded-full px-10 py-2.5 border-2 border-white/30 lg:hover:border-white/80 bg-black/20 backdrop-blur-sm"
                    >
                      <span>Di meno</span>
                      <FontAwesomeIcon
                        width={"0.8rem"}
                        color="#FF4545"
                        icon={faArrowDown as IconProp}
                      />
                    </button>
                  </motion.div>
                </div>
              )}
            </div>
            <div className="text-sm opacity-80 fixed z-50 bottom-8 right-10">
              {element2?.image.source != "" && (
                <p>
                  Fonte immagine:{" "}
                  <Link href={element2?.image.src} target="_blank">
                    <strong>{element2?.image.source}</strong>
                  </Link>
                </p>
              )}
            </div>

            <img
              src={element2?.image.src}
              className={`${wrong && "grayscale"} w-full h-full object-cover transition duration-200 opacity-20 group-hover:lg:opacity-30`}
              draggable="false"
              alt=""
            />
          </div>
        )}
      </div>
    </main>
  );
}
