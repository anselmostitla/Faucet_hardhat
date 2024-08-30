require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url:process.env.POLYGON_MUMBAI_URL,
      accounts:[`0x${process.env.POLYGON_MUMBAI_SECRET_KEY}`]
    },
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [`0x${process.env.SEPOLIA_SECRET_KEY}`, `0x${process.env.SEPOLIA_SECRET_KEY2}`]
    },
  },
  defaultNetwork: `${process.env.DEFAULT_NETWORK_NAME}`
};
