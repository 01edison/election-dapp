import { ethers, Contract } from "ethers";
import { useNotification } from "@web3uikit/core";
import contractAddresses from "../contractAddress.json";
import candidate from "../candidate.json";
import { electionAbi } from "../electionAbi";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useMoralis } from "react-moralis";

export default function CandidateBox({ name, party, votes, index }) {
  const { chainId: chainIdInHex, account } = useMoralis();
  const dispatch = useNotification();
  const chainId = parseInt(chainIdInHex);

  const candidateImage = candidate[name]?.image;
  const candidateLogo = candidate[name]?.logo;

  const handleNotification = (type, message) => {
    dispatch({
      type,
      message,
      title: "Vote Tx",
      position: "topR",
    });
  };

  const vote = async (index) => {
    try {
      const provider = new ethers.providers.Web3Provider(web3.currentProvider);
      const signer = provider.getSigner();
      const election = new Contract(
        contractAddresses[chainId],
        electionAbi,
        signer
      );
      const voteTx = await election.vote(index);
      await voteTx.wait();
      handleNotification("info", "Thanks for Voting!");
    } catch (e) {
      console.log(e);
      handleNotification("error", `${e.code}`);
    }
  };
  return (
    <Card
      style={{
        width: "20rem",
        textAlign: "center",
        margin: "2rem",
      }}
      className="card"
    >
      <Card.Img variant="top" src={candidateImage} style={{ height: "45%" }} />
      <Card.Img
        variant="top"
        className="mt-1"
        src={candidateLogo}
        style={{
          width: "20%",
          position: "absolute",
          right: "1rem",
          borderRadius: "50%",
        }}
      />
      <Card.Body>
        <Card.Title style={{ fontSize: "2rem" }}>{name}</Card.Title>
        <Card.Text style={{ fontSize: "1.2rem" }}>
          Presidential aspirant for the {party}
        </Card.Text>
        <Button
          variant="success"
          style={{ marginTop: "3rem" }}
          onClick={() => {
            vote(index);
          }}
        >
          Vote!
        </Button>
      </Card.Body>
    </Card>
  );
}
