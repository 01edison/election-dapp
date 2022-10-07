const Moralis = require("moralis-v1/node");
require("dotenv").config();

const chainId = 31337;
const moralisChainId = chainId == 31337 ? "1337" : chainId;
const contractAddress = require("./contractAddress.json");

const electionAddress = contractAddress[chainId];
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const appId = process.env.NEXT_PUBLIC_APP_ID;
const masterKey = process.env.NEXT_PUBLIC_MASTER_KEY;

async function main() {
  await Moralis.start({ serverUrl, appId, masterKey });
  console.log(`Working with contract address ${electionAddress}`);

  let candiateAddedOptions = {
    chainId: moralisChainId,
    address: electionAddress,
    topic: "CandidateAdded(string, string, uint256, address)",
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "party",
          type: "string",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "votes",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "contractAddress",
          type: "address",
        },
      ],
      name: "CandidateAdded",
      type: "event",
    },
    tableName: "CandidateAdded",
  };

  let votedOptions = {
    chainId: moralisChainId,
    address: electionAddress,
    topic: "Voted(string, string, uint256)",
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "candidateName",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "candidateParty",
          type: "string",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "candidateVoteCount",
          type: "uint256",
        },
      ],
      name: "Voted",
      type: "event",
    },
    tableName: "Voted",
  };

  const addedResponse = await Moralis.Cloud.run(
    "watchContractEvent",
    candiateAddedOptions,
    { useMasterKey: true }
  );
  const votedResponse = await Moralis.Cloud.run(
    "watchContractEvent",
    votedOptions,
    { useMasterKey: true }
  );

  console.log(addedResponse, votedResponse);
  if (addedResponse.success && votedResponse.success) {
    console.log("Database updated successfully");
  } else {
    console.log("Something went wrong");
  }
}
main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
