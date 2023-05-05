const { defaultAccounts } = require('ethereum-waffle');
const { hexStripZeros, getAddress } = require('ethers/lib/utils');
const { ethers } = require('hardhat');
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {





  const Encoder= await ethers.getContractFactory('Encoder');
  console.log('Deploying Encoder. . .');
  const encoder=await Encoder.deploy();
  await encoder.deployed();
  console.log('Encoder deployed to: ', encoder.address);


var id=await encoder.getTheMethodId();
console.log(id);


}





//npx hardhat run --network localhost scripts/Deploy.js
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  