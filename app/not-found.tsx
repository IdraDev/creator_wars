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
        <button className="mt-4 rounded-xl font-bold px-6 bg-white text-black py-2.5">
          <b>Torna alla Home</b>
        </button>
      </div>
    </div>
  );
}

export default notFound;
