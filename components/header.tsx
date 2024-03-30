function Header() {
  return (
    <div className="flex flex-row space-x-3 absolute p-4 md:p-6 z-50">
      <div className="p-4 lg:p-3 rounded-full bg-black/20 z-50 backdrop-blur-md border-2 border-white/5 items-center">
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
      <img
        src="./logo.svg"
        className="hidden lg:inline-block"
        alt=""
        draggable="false"
      />
    </div>
  );
}

export default Header;
