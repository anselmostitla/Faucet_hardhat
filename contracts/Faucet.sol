// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Faucet {
   address user1;
   address user2;

   constructor(address _user1, address _user2) payable {
      user1 = _user1;
      user2 = _user2;
   }

    // Give out ether to anyone who ask
    function withdraw(uint256 _withdrawalAmount) public{
        // Limit withdrawal amount
        require(_withdrawalAmount<100_000_000_000_000_000, "Trying to withdraw max allow");

        // Send the amount to the address that request it
        payable(msg.sender).transfer(_withdrawalAmount);
    }

    // Accept any incoming amount
    receive() external payable {

    }
}