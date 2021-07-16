import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>F1shyBot</title>
        <meta name="description" content="Coming SoonTM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-bubble h-screen w-screen flex items-center justify-center flex-col text-white overflow-hidden">
        <div className="py-8 px-48 sm:p-8 md:p-12 rounded-2xl text-center blur-box">
          <h1 className="text-6xl sm:text-8xl font-bold mb-4">F1shyBot</h1>
          <h3 className="text-xl sm:text-3xl font-light">
            Coming Soon<sup className="text-sm font-bold">TM</sup>
          </h3>
        </div>
      </div>
    </div>
  );
}
