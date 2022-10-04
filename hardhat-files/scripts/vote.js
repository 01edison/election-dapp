const { ethers } = require("hardhat");

async function vote() {
  const accounts = await ethers.getSigners();
  const election = await ethers.getContract("Election");

  const connectedElection = election.connect(accounts[7]);
  const tx = await connectedElection.vote(1);
  const txReceipt = await tx.wait();

  console.log(txReceipt.events[0].args);
  console.log(`Tinubu: ${(await election.candidates(0)).votes.toString()}`);
  console.log(`Obi: ${(await election.candidates(1)).votes.toString()}`);
  console.log(`Atiku: ${(await election.candidates(2)).votes.toString()}`);
  console.log(`Funke: ${(await election.candidates(3)).votes.toString()}`);
}

vote()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
