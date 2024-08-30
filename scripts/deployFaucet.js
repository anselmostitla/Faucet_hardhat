const hre = require("hardhat")

async function main() {
   const [deployer, user1] = await hre.ethers.getSigners()

   const amountInEther = "0.1"
   const amountInWei = hre.ethers.utils.parseEther(amountInEther) // convert to wei
   
   const Faucet = await hre.ethers.getContractFactory("Faucet")
   const faucet = await Faucet.deploy(deployer.address, user1.address, {value: amountInWei})

   await faucet.deployed()

   console.log("Contract deployed at: ", faucet.address);
}

main().catch(error => {
   console.error(error);
   process.exitCode = 1
})