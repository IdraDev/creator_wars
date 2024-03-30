// @ts-nocheck
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { animate, motion, useAnimate } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [element1, setElement1] = useState();
  const [element2, setElement2] = useState();
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);

  const data = [
    {
      name: "Tha Supreme",
      followers: 1200000,
      image: {
        src: "https://www.rollingstone.it/wp-content/uploads/2019/11/tha-supreme-chi-e%CC%80.jpg",
        name: "Test",
      },
    },
    {
      name: "Fedez",
      followers: 1200,
      image: {
        src: "https://www.corriere.it/methode_image/2023/11/21/Spettacoli/Foto%20Spettacoli%20-%20Trattate/344.0.900047188-kbBG-U3450673206846rkD-656x492@Corriere-Web-Sezioni.jpg",
        name: "Test",
      },
    },
    {
      name: "Dario Moccia",
      followers: 15200,
      image: {
        src: "https://cdn.skuola.net/w1200h687/news_foto/2022/02/dario-moccia.jpg",
        name: "Test",
      },
    },
    {
      name: "Maurizio Merluzzo",
      followers: 12,
      image: {
        src: "https://directus.luccacomicsandgames.com/lucca-comics-2023/assets/3dw9hfpci7mskkk0?key=directus-large-contain",
        name: "Test",
      },
    },
  ];

  const randomIndex1 = Math.floor(Math.random() * data.length);
  let randomIndex2 = Math.floor(Math.random() * data.length);
  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * data.length);
  }

  useEffect(() => {
    setElement1(data[randomIndex1]);
    setElement2(data[randomIndex2]);
  }, []);

  function setHigher() {
    if (element2?.followers > element1?.followers) {
      setCorrect(true);
    } else setWrong(true);
  }

  function setLower() {
    if (element2?.followers < element1?.followers) {
      setCorrect(true);
    } else setWrong(true);
  }

  return (
    <main>
      <div className="pointer-events-none absolute z-50 w-screen flex justify-center pt-5 sm:pt-10 lg:pt-20">
        <div className="text-center flex flex-col -space-y-1 md:space-y-0">
          <motion.div
            initial={{
              y: 0,
              opacity: 0,
            }}
            animate={{ y: 10, opacity: 100 }}
          >
            <h1 className="flex flex-row space-x-2 drop-shadow-md font-black text-3xl lg:text-5xl tracking-tight">
              <FontAwesomeIcon
                width={"2rem"}
                color="white"
                icon={faInstagram as IconProp}
              />
              <b>Chi ha più follower?</b>
            </h1>
          </motion.div>
          <motion.div
            initial={{
              y: 10,
              opacity: 0,
            }}
            animate={{ opacity: 100 }}
            transition={{ y: 0, delay: 0.1, ease: "easeInOut" }}
          >
            <p className="drop-shadow-md text-lg opacity-80">Su instagram</p>
          </motion.div>
        </div>
      </div>
      <div className="pointer-events-none absolute z-50 w-screen flex items-center justify-center h-screen">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 100,
            scale: 1,
          }}
          transition={{
            ease: "easeInOut",
            bounce: 5,
          }}
        >
          <div className=" shadow-xl shadow-white/20 bg-white text-black rounded-full px-4 lg:px-6 py-[0.8rem] lg:py-[1.30rem]">
            <h1 className="text-2xl lg:text-4xl">vs</h1>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col lg:flex-row h-screen">
        {element1 && (
          <>
            <div className="group w-full lg:w-[50%] h-[50%] lg:h-screen relative">
              <div className="z-10 absolute inset-0 flex flex-col justify-center items-center">
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 100,
                    scale: 1,
                  }}
                  transition={{
                    ease: "easeInOut",
                    bounce: 5,
                  }}
                >
                  <h1 className="drop-shadow-md font-bold text-5xl lg:text-6xl">
                    <b>{element1?.name}</b>
                  </h1>
                </motion.div>
                <motion.div
                  initial={{
                    y: -5,
                    opacity: 0,
                  }}
                  animate={{ y: -4, opacity: 100 }}
                  transition={{
                    delay: 0.2,
                  }}
                >
                  <p className="drop-shadow-md text-2xl lg:text-3xl opacity-80">
                    ne ha
                  </p>
                </motion.div>
                <motion.div
                  initial={{
                    y: -0,
                    opacity: 0,
                  }}
                  animate={{ y: -5, opacity: 100 }}
                  transition={{
                    delay: 0.25,
                  }}
                >
                  <h1 className="drop-shadow-md text-[#FFEA2D] font-bold text-4xl lg:text-6xl">
                    <b>{element1?.followers}</b>
                  </h1>
                </motion.div>
              </div>
              <img
                src={element1?.image.src}
                className="w-full h-full object-cover transition duration-200 opacity-25 group-hover:lg:opacity-50"
                draggable="false"
                alt=""
              />
            </div>
          </>
        )}
        {element2 && (
          <>
            <div className="group w-full lg:w-[50%] h-[50%] lg:h-screen relative">
              <div className="z-10 absolute inset-0 flex flex-col justify-center items-center">
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 100,
                    scale: 1,
                  }}
                  transition={{
                    ease: "easeInOut",
                    bounce: 5,
                  }}
                >
                  <h1 className="drop-shadow-md font-bold text-5xl lg:text-6xl">
                    <b>{element2?.name}</b>
                  </h1>
                </motion.div>
                <motion.div
                  initial={{
                    y: -5,
                    opacity: 0,
                  }}
                  animate={{ y: -0, opacity: 100 }}
                  transition={{
                    delay: 0.2,
                  }}
                >
                  <p className="drop-shadow-md text-2xl lg:text-3xl opacity-80">
                    ne ha
                  </p>
                </motion.div>
                <div className="flex items-center pt-4 flex-col space-y-4">
                  <motion.div
                    initial={{
                      y: -5,
                      opacity: 0,
                    }}
                    animate={{ y: -0, opacity: 100 }}
                    transition={{
                      delay: 0.4,
                    }}
                  >
                    <button
                      onClick={() => setHigher()}
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
                    initial={{
                      y: 0,
                      opacity: 0,
                    }}
                    animate={{ y: -5, opacity: 100 }}
                    transition={{
                      delay: 0.4,
                    }}
                  >
                    <button
                      onClick={() => setLower()}
                      className="shadow-md focus:outline-none  w-fit text-center items-center transition duration-200 lg:hover:scale-105 lg:hover:bg-black/50 active:scale-95 focus:ring-2 focus:ring-white/10 flex flex-row space-x-2 rounded-full px-10 py-2.5 border-2 border-white bg-black/20 backdrop-blur-sm"
                    >
                      <span>Di meno</span>
                      <FontAwesomeIcon
                        width={"0.8rem"}
                        color="#FF4545"
                        icon={faArrowDown as IconProp}
                      />
                    </button>
                    {correct && <p>minchia giusto</p>}
                    {wrong && <p>minchia sbagliato</p>}
                  </motion.div>
                </div>
              </div>
              <img
                src={element2?.image.src}
                className="w-full h-full object-cover transition duration-200 opacity-25 group-hover:lg:opacity-50"
                draggable="false"
                alt=""
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
