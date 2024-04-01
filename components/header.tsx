import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBug, faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  logo: boolean;
};

export default function Header(props: Props) {
  return (
    <div className="flex flex-row space-x-3 absolute p-4 md:p-6">
      <Menu as="div" className="-mb- relative inline-block text-left z-50">
        <div>
          <Menu.Button>
            <div className="transition duration-200 active:scale-95 lg:hover:scale-105 p-4 lg:p-3 rounded-full bg-black/30 z-50 backdrop-blur-md border-2 border-white/5 items-center">
              <svg
                className="w-5 lg:w-4"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 2.04092C0 1.27108 0.606473 0.649109 1.35714 0.649109H17.6429C18.3935 0.649109 19 1.27108 19 2.04092C19 2.81077 18.3935 3.43273 17.6429 3.43273H1.35714C0.606473 3.43273 0 2.81077 0 2.04092ZM0 8.99999C0 8.23014 0.606473 7.60817 1.35714 7.60817H17.6429C18.3935 7.60817 19 8.23014 19 8.99999C19 9.76983 18.3935 10.3918 17.6429 10.3918H1.35714C0.606473 10.3918 0 9.76983 0 8.99999ZM19 15.959C19 16.7289 18.3935 17.3509 17.6429 17.3509H1.35714C0.606473 17.3509 0 16.7289 0 15.959C0 15.1892 0.606473 14.5672 1.35714 14.5672H17.6429C18.3935 14.5672 19 15.1892 19 15.959Z"
                  fill="white"
                />
              </svg>
            </div>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="bg-black/30 backdrop-blur-sm absolute left-0 border-2 border-white/10 w-56 origin-top-left rounded-xl font-bold bg-secondary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Link href="/">
                <Menu.Item>
                  <button className="block px-4 py-2 text-sm w-full hover:bg-black/20 transition duration-100">
                    <div className="flex flex-row space-x-1.5 fill-white">
                      <span>
                        <FontAwesomeIcon
                          color="white"
                          icon={faHome as IconProp}
                        />
                      </span>
                      <p className="text-white">Home</p>
                    </div>
                  </button>
                </Menu.Item>
              </Link>
              <Link href="https://tally.so/r/nP6gp1" target="_blank">
                <Menu.Item>
                  <button className="block px-4 py-2 text-sm w-full hover:bg-black/20 transition duration-100">
                    <div className="flex flex-row space-x-1.5 fill-white opacity-80">
                      <span>
                        <FontAwesomeIcon
                          color="white"
                          icon={faBug as IconProp}
                        />
                      </span>
                      <p>Segnala un problema</p>
                    </div>
                  </button>
                </Menu.Item>
              </Link>
              <Link href="/about">
                <Menu.Item>
                  <button className="block px-4 py-2 text-sm w-full hover:bg-black/20 transition duration-100">
                    <div className="flex flex-row space-x-1.5 fill-white opacity-80">
                      <span>
                        <FontAwesomeIcon
                          color="white"
                          icon={faInfoCircle as IconProp}
                        />
                      </span>
                      <p>About</p>
                    </div>
                  </button>
                </Menu.Item>
              </Link>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {props.logo && (
        <div className="z-50 h-fit mt-1">
          <Link href={"/"}>
            <img
              className="hidden lg:inline-block transition duration-200 lg:hover:scale-105 active:scale-95"
              src="./logo.svg"
              alt=""
              draggable="false"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
