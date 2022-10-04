const { ethers } = require("hardhat");


module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying Election Contract...");

  await deploy("Election", {
    from: deployer,
    log: true,
    args: [],
  });
  log("Election Contract successfully!");
};

module.exports.tags = ["election"];
