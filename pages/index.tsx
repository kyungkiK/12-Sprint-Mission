// pages/index.tsx
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      <div>
        <h1>Welcome to 판다마켓!</h1>
        <p>일상의 모든 물건을 거래해보세요</p>
      </div>
    </>
  );
};

export default Home;
