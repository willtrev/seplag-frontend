export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-8xl font-bold">404</h1>
      <h2 className="text-2xl mt-4">
        Oops! Parece que esta página não existe.
      </h2>
      <p className="text-lg mt-2 text-gray-600">
        Talvez o link esteja incorreto ou a página tenha sido removida.
      </p>
      <a
        href="/home"
        className="text-blue-500 mt-4 underline hover:text-blue-700"
      >
        Voltar para a página inicial
      </a>
    </div>
  );
}
