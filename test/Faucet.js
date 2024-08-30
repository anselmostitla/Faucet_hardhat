const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Faucet contract", function(){
   let Faucet, faucet, deployer, user1, user2, deployerBalanceBefore, user1BalanceBefore

   beforeEach(async function(){
      [deployer, user1, user2] = await ethers.getSigners()

      Faucet = await ethers.getContractFactory("Faucet")
      faucet = await Faucet.deploy(user1.address, user2.address, {value: ethers.utils.parseEther("0.1")})
      await faucet.deployed()
   })

   it("Should deploy with initial balance", async function(){
      const faucetBalance = await ethers.provider.getBalance(faucet.address);
      expect(faucetBalance).equal(ethers.utils.parseEther("0.1"))
   })

   it("Should withdraw funds correctly", async function(){
      const withdrawalAmount = ethers.utils.parseEther("0.01")
      deployerBalanceBefore = await ethers.provider.getBalance(deployer.address)
      user1BalanceBefore = await ethers.provider.getBalance(user1.address)

      await faucet.connect(user1).withdraw(withdrawalAmount)

      const deployerBalanceAfter = await ethers.provider.getBalance(deployer.address)
      const user1BalanceAfter = await ethers.provider.getBalance(user1.address)
      const faucetBalance = await ethers.provider.getBalance(faucet.address)

      expect(faucetBalance).equal(ethers.utils.parseEther("0.1").sub(withdrawalAmount))
      expect(user1BalanceAfter).greaterThan(user1BalanceBefore)
      expect(user1BalanceAfter.sub(user1BalanceBefore)).lessThan(ethers.utils.parseEther("0.01"))
   })

   it("Should not allow withdrawal more than 0.1 eth", async function(){
      const withdrawalAmount = ethers.utils.parseEther("0.2")
      await expect(faucet.connect(user1).withdraw(withdrawalAmount)).to.be.revertedWith("Trying to withdraw max allow")
   })
})