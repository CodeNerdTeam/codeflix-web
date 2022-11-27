import Head from "next/head";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-60">
      <Head>
        <title>404 - Page not found</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="font-bold text-blue-600 text-9xl">404</h1>
      <h6 className="text-5xl font-bold text-white">
        <span className="text-red-500">Oops!</span> Page not found
      </h6>
      <p className="mt-3 text-gray-100">
        {"The page you're looking for doesn't exist."}
      </p>
      <a
        href="/home"
        className="bg-blue-100 text-blue-800 mt-5 font-semibold px-6 py-2 text-sm rounded"
      >
        Go Home
      </a>
    </div>
  );
}

export default NotFound;
