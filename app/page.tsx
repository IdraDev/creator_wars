// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/header";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUp,
  faArrowDown,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [element1, setElement1] = useState();
  const [element2, setElement2] = useState();
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [buttons, setButtons] = useState(true);

  const data = [
    {
      name: "Tha Supreme",
      followers: 1,
      image: {
        src: "https://www.rollingstone.it/wp-content/uploads/2019/11/tha-supreme-chi-e%CC%80.jpg",
        source: "Test",
      },
    },
    {
      name: "Fedez",
      followers: 2,
      image: {
        src: "https://www.corriere.it/methode_image/2023/11/21/Spettacoli/Foto%20Spettacoli%20-%20Trattate/344.0.900047188-kbBG-U3450673206846rkD-656x492@Corriere-Web-Sezioni.jpg",
        source: "Corriere.it",
      },
    },
    {
      name: "Dario Moccia",
      followers: 3,
      image: {
        src: "https://cdn.skuola.net/w1200h687/news_foto/2022/02/dario-moccia.jpg",
        source: "Test",
      },
    },
    {
      name: "Maurizio Merluzzo",
      followers: 4,
      image: {
        src: "https://directus.luccacomicsandgames.com/lucca-comics-2023/assets/3dw9hfpci7mskkk0?key=directus-large-contain",
        source: "Test",
      },
    },
  ];

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
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore));
    }

    const [index1, index2] = generateRandomIndexes([
      element1?.index,
      element2?.index,
    ]);
    setElement1({ ...data[index1], index: index1 });
    setElement2({ ...data[index2], index: index2 });
  }, []);

  useEffect(() => {
    localStorage.setItem("bestScore", bestScore.toString());
  }, [bestScore]);

  const checkAnswer = (selected) => {
    const isCorrect = selected
      ? element2.followers > element1?.followers
      : element2.followers < element1?.followers;
    if (isCorrect) {
      setCorrect(true);
      setButtons(false);
      setTimeout(() => {
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
    }
  };

  return (
    <main>
      <Header />
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
                  icon={faInstagram as IconProp}
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
                  icon={faInstagram as IconProp}
                />
              </span>
              <span className="relative -top-0.5 sm:top-0">Su instagram</span>
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
                initial={{ y: -0, opacity: 0 }}
                animate={{ y: -5, opacity: 100 }}
                transition={{ delay: 0.25 }}
              >
                <h1 className="drop-shadow-md text-[#FFEA2D] font-bold text-4xl sm:text-5xl lg:text-6xl">
                  <b>{element1?.followers}</b>
                </h1>
              </motion.div>
            </div>
            <div className="text-sm opacity-80 fixed z-50 bottom-8 left-10">
              <p>
                Fonte immagine:{" "}
                <Link href={element1?.image.src} target="_blank">
                  <strong>{element1?.image.source}</strong>
                </Link>
              </p>
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
                  initial={{ y: -0, opacity: 0 }}
                  animate={{ y: -5, opacity: 100 }}
                  transition={{ delay: 0.25 }}
                >
                  <h1
                    className={`drop-shadow-md text-[#FFEA2D] ${wrong && "text-red-400"} ${correct && "text-green-400"} drop-shadow-md font-bold text-5xl lg:text-6xl`}
                  >
                    <b>{element2?.followers}</b>
                  </h1>
                </motion.div>
              )}

              {buttons && (
                <div className="flex items-center pt-4 flex-col space-y-4">
                  <motion.div
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: -0, opacity: 100 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button
                      onClick={() => checkAnswer(true)}
                      className="shadow-md focus:outline-none w-fit text-center items-center transition duration-200 lg:hover:scale-105 lg:hover:bg-black/50 active:scale-95 focus:ring-2 focus:ring-white/10 flex flex-row space-x-2 rounded-full px-12 py-2.5 border-2 border-white bg-black/20 backdrop-blur-sm"
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
                      className="shadow-md focus:outline-none  w-fit text-center items-center transition duration-200 lg:hover:scale-105 lg:hover:bg-black/50 active:scale-95 focus:ring-2 focus:ring-white/10 flex flex-row space-x-2 rounded-full px-10 py-2.5 border-2 border-white bg-black/20 backdrop-blur-sm"
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
              <p>
                Fonte immagine:{" "}
                <Link href={element2?.image.src} target="_blank">
                  <strong>{element2?.image.source}</strong>
                </Link>
              </p>
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
