const { ethers } = require("hardhat");

async function addCandidate(name, party) {
  const election = await ethers.getContract("Election");

  const tx = await election.addCandidate(name, party);
  const txReceipt = await tx.wait();

  console.log(txReceipt.events[0].args);
}

addCandidate("Okudili Anyajike", "National Rescue Mission")
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
