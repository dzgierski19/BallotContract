import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const PROPOSALS = ["Prop1", "Prop2", "Prop3"];

async function deployContract() {
  const signers = await ethers.getSigners();
  const ballotFactory = await ethers.getContractFactory("Ballot");
  const proposals = PROPOSALS.map(ethers.encodeBytes32String);
  const ballotContract = await ballotFactory.deploy(proposals); // it means that transaction is sent that's why we have to wait for deployment
  await ballotContract.waitForDeployment();
  return { signers, ballotContract };
}

describe("Ballot", async () => {
  describe("when the contract is deployed", async () => {
    it("has the provided proposals", async () => {
      const { ballotContract } = await loadFixture(deployContract);
      for (let i = 0; i < PROPOSALS.length; i++) {
        const proposal = await ballotContract.proposals(i);
        expect(PROPOSALS[i]).to.equal(
          ethers.decodeBytes32String(proposal.name)
        );
      }
    });

    it("has zero votes for all proposals", async () => {
      const { ballotContract } = await loadFixture(deployContract);
      for (let i = 0; i < PROPOSALS.length; i++) {
        const proposal = await ballotContract.proposals(i);
        expect(0).to.equal(proposal.voteCount);
      }
    });
    it("sets the deployer address as chairperson", async () => {
      const { signers, ballotContract } = await loadFixture(deployContract);
      const deployerAddress = signers[0].address;
      const chairpersonAddress = await ballotContract.chairperson();
      expect(deployerAddress).to.equal(chairpersonAddress);
    });
    it("sets the voting weight for the chairperson as 1", async () => {
      const { ballotContract } = await loadFixture(deployContract);
      const chairpersonAddress = await ballotContract.chairperson();
      const chairpersonVoter = await ballotContract.voters(chairpersonAddress);
      expect(chairpersonVoter.weight).to.eq(1);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", async () => {
    it("gives right to vote for another address", async () => {
      const { ballotContract, signers } = await loadFixture(deployContract);
      const voterBefore = await ballotContract.voters(signers[1].address);
      expect(voterBefore.weight).to.equal(0);
      const tx = await ballotContract.giveRightToVote(signers[1].address);
      await tx.wait();
      const voterAfter = await ballotContract.voters(signers[1].address);
      expect(voterAfter.weight).to.equal(1);
    });
    it("can not give right to vote for someone that has voted", async () => {
      const { ballotContract, signers } = await loadFixture(deployContract);
      const voterBefore = await ballotContract.voters(signers[1].address);
      expect(voterBefore.weight).to.equal(0);
      const tx = await ballotContract.giveRightToVote(signers[1].address);
      await tx.wait();
      const voterAfter = await ballotContract.voters(signers[1].address);
      expect(voterAfter.weight).to.equal(1);
      //
    });
    it("can not give right to vote for someone that has already voting rights", async () => {
      const { ballotContract, signers } = await loadFixture(deployContract);
      const voterBefore = await ballotContract.voters(signers[1].address);
      expect(voterBefore.weight).to.equal(0);
      const tx = await ballotContract.giveRightToVote(signers[1].address);
      await tx.wait();
      const voterAfter = await ballotContract.voters(signers[1].address);
      expect(voterAfter.weight).to.equal(1);
      expect(
        await ballotContract.giveRightToVote(signers[1].address)
      ).to.be.revertedWithoutReason();
    });
  });

  describe("when the voter interacts with the vote function in the contract", async () => {
    // TODO
    it("should register the vote", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when the voter interacts with the delegate function in the contract", async () => {
    // TODO
    it("should transfer voting power", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account other than the chairperson interacts with the giveRightToVote function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account without right to vote interacts with the vote function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when an account without right to vote interacts with the delegate function in the contract", async () => {
    // TODO
    it("should revert", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function before any votes are cast", async () => {
    // TODO
    it("should return 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function after one vote is cast for the first proposal", async () => {
    // TODO
    it("should return 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winnerName function before any votes are cast", async () => {
    // TODO
    it("should return name of proposal 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winnerName function after one vote is cast for the first proposal", async () => {
    // TODO
    it("should return name of proposal 0", async () => {
      throw Error("Not implemented");
    });
  });

  describe("when someone interacts with the winningProposal function and winnerName after 5 random votes are cast for the proposals", async () => {
    // TODO
    it("should return the name of the winner proposal", async () => {
      throw Error("Not implemented");
    });
  });
});
