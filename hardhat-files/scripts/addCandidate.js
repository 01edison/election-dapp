const { ethers } = require("hardhat");

async function addCandidate(name, party, state) {
  const election = await ethers.getContract("Election");

  const tx = await election.addCandidate(name, party, state);
  const txReceipt = await tx.wait();

  console.log(txReceipt.events[0].args);
}

addCandidate("Funke", "APGA", "Ogun")
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
