import Head from "next/head";
import CandidateBox from "../components/CandidateBox";
import Navbar from "../components/Navbar";
import { useMoralis, useMoralisQuery } from "react-moralis";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Election App</title>
      </Head>
      <Navbar />
      <h1 className="heading">Hello, Patriot. Vote for your favourite candidate</h1>
    </div>
  );
}
