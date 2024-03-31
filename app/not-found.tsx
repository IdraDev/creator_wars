import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";

function notFound() {
  return (
    <div className="min-h-screen grid grid-cols-1 place-items-center">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold">
          <b>Errore 404</b>
        </h1>
        <p>
          La pagina che stai tentando di raggiungere non esiste o non è
          disponibile.
        </p>
        <Link href={"/"}>
          <button className="flex flex-row lg:hover:scale-105 active:scale-95 space-x-2 items-center transition duration-200 mt-4 rounded-xl font-bold px-6 bg-white text-black py-2.5">
            <span>
              <FontAwesomeIcon
                width={"1rem"}
                color="black"
                icon={faArrowLeft as IconProp}
              />
            </span>
            <b>Torna alla Home</b>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default notFound;
