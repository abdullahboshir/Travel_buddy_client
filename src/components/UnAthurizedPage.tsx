import Head from 'next/head';

const UnAthorizedPage = () => {
  return (

    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="relative w-200 mt-10 animate-shake">
          <div className="absolute w-20 h-20 bg-black rounded-full shadow eye-animation"></div>
        </div>
        <div className="meta-style"></div>
        <div className="meta-style rotate-right"></div>
        <div className="meta-style hidden"></div>
        <div className="text-white text-center">
          <div className="text-6xl font-bold mb-10">404</div>
          <div className="text-lg">
            Got lost? How.....? why.....? Ahhhh....
          </div>
        </div>
      </div>
    </>
  );
};

export default UnAthorizedPage;
