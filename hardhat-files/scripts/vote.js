const { ethers } = require("hardhat");

async function vote(index) {
  const accounts = await ethers.getSigners();
  const election = await ethers.getContract("Election");

  const connectedElection = election.connect(accounts[0]);
  const tx = await connectedElection.vote(index);
  const txReceipt = await tx.wait();

  console.log(txReceipt.events[0].args);
  console.log(`Obi: ${(await election.candidates(0)).votes.toString()}`);
  console.log(`Tinubu: ${(await election.candidates(1)).votes.toString()}`);
  console.log(`Atiku: ${(await election.candidates(2)).votes.toString()}`);
}

vote()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
