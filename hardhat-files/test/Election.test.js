const { ethers, deployments, network } = require("hardhat");
const { assert, expect } = require("chai");

describe("Election", () => {
  let election;
  beforeEach(async () => {
    await deployments.fixture("election");

    election = await ethers.getContract("Election");
  });

  describe("addCandidate", () => {
    it("Should add a new unique candidate easily", async () => {
      const addTx = await election.addCandidate("Peter Obi", "Labour Party");
      const addReceipt = await addTx.wait();
      const candidateName = addReceipt.events[0].args.name;
      assert.equal(candidateName, "Peter Obi");
    });

    it("Should revert if you add the same candidate twice", async () => {
      const addTx = await election.addCandidate("Peter Obi", "Labour Party");
      await addTx.wait();

      await expect(election.addCandidate("Peter Obi", "Labour Party")).to.be
        .reverted;
    });
  });

  describe("vote", () => {
    it("increases candidate vote count on vote", async () => {
      const accounts = await ethers.getSigners();
      const addTx = await election.addCandidate("Peter Obi", "Labour Party");
      await addTx.wait();

      // const connectedElection = election.connect(accounts[i]);
      const voteTx = await election.vote(0);
      const voteTxReceipt = await voteTx.wait();

      const voteCount = (await election.candidates(0)).votes.toString();
      assert.equal(voteCount, "1");
    });

    it("Doesn't allow user vote more than once", async () => {
      const addTx = await election.addCandidate("Peter Obi", "Labour Party");
      await addTx.wait();
      const addTx2 = await election.addCandidate("Tinubu", "APC");
      await addTx2.wait();

      // const connectedElection = election.connect(accounts[i]);
      const voteTx = await election.vote(0);
      const voteTxReceipt = await voteTx.wait();

      await expect(election.vote(1)).to.be.reverted;
    });

    it("reverts if candidate doesn't exist", async () => {
      const addTx = await election.addCandidate("Peter Obi", "Labour Party");
      await addTx.wait();
      const addTx2 = await election.addCandidate("Tinubu", "APC");
      await addTx2.wait();

      await expect(election.vote(2)).to.be.reverted;
    });
  });
});
