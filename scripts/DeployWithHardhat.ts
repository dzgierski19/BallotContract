import { ethers } from "hardhat";
const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
  const proposals = process.argv.slice(2);
  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  const provider = ethers.getDefaultProvider("sepolia");
  const lastBlock = await provider.getBlock("latest");
  console.log(`Last block number: ${lastBlock?.number}`);
  const lastBlockTimestamp = lastBlock?.timestamp ?? 0;
  const lastBlockDate = new Date(lastBlockTimestamp * 1000);
  console.log(
    `Last block timestamp: ${lastBlockTimestamp} (${lastBlockDate.toLocaleDateString()} ${lastBlockDate.toLocaleTimeString()})`
  );
}

//provider abstracts connection to the blockchain

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
