import Head from "next/head";
import CandidateBox from "../components/CandidateBox";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useMoralis, useMoralisQuery } from "react-moralis";

export default function Home() {
  const [candidates, setCandidates] = useState([]);
  const { data, error, isLoading } = useMoralisQuery("CandidateAdded");
  const { account, chainId: chainIdinHex } = useMoralis();

  useEffect(() => {
    setCandidates(data);
  });

  return (
    <div>
      <Head>
        <title>Election App</title>
      </Head>
      <Navbar />
      <h1 className="heading mt-3">
        Hello, Patriot. Vote for your favourite candidate
      </h1>
      {isLoading ? (
        <span>Fetching candidates...</span>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", paddingLeft:"3.5rem" }}>
          {candidates.map((candidate, i) => {
            return (
              <CandidateBox
                key={i}
                index={i}
                name={candidate.attributes.name}
                party={candidate.attributes.party}
                votes={candidate.attributes.votes}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
