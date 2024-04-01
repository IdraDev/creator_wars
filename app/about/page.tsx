"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBug, faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitch,
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function About() {
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
      <Header logo={true} />
      <div>
        <div className="absolute w-screen h-screen p-4 sm:p-10 lg:p-12 min-h-screen grid grid-cols-1 place-items-center">
          <div>
            <h1 className="text-2xl font-bold">
              <b>CreatorWars, by IdraDev</b>
            </h1>
            <p className="mb-4">
              Versione BETA 1.0 <br />
              Let's work together!
            </p>
            <div className="flex flex-row space-x-2">
              <Link href={"https://dsc.gg/idragraphics"} target="_blank">
                <button className="px-8 py-2 transition duration-200 active:scale-95 hover:scale-105 rounded-lg bg-blue-600 text-white font-bold">
                  <span>
                    <FontAwesomeIcon
                      width={"2rem"}
                      color="white"
                      icon={faDiscord as IconProp}
                    />
                  </span>
                  <b>
                    <span>Discord</span>
                  </b>
                </button>
              </Link>
              <Link
                href={"https://www.twitch.tv/idraofficial_"}
                target="_blank"
              >
                <button className="px-8 py-2 transition duration-200 active:scale-95 hover:scale-105 rounded-lg bg-purple-600 text-white font-bold">
                  <span>
                    <FontAwesomeIcon
                      width={"2rem"}
                      color="white"
                      icon={faTwitch as IconProp}
                    />
                  </span>
                  <b>
                    <span>Twitch</span>
                  </b>
                </button>
              </Link>
              <Link href={"https://github.com/IdraDev"} target="_blank">
                <button className="px-8 py-2 transition duration-200 active:scale-95 hover:scale-105 rounded-lg bg-black text-white font-bold">
                  <span>
                    <FontAwesomeIcon
                      width={"2rem"}
                      color="white"
                      icon={faGithub as IconProp}
                    />
                  </span>
                  <b>
                    <span>GitHub</span>
                  </b>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
