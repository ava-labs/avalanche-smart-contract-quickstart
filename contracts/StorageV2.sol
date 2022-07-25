// SPDX-License-Identifier: MIT
// contracts/StorageV2.sol

pragma solidity ^0.8.2;

contract StorageV2 {
  uint256 private number;

  // Emitted when the stored number changes
  event NumberChanged(uint256 newNumber);

  // Stores a new number in the contract
  function store(uint256 newNumber) public {
    number = newNumber;
    emit NumberChanged(newNumber);
  }

  // Reads the last stored number
  function retrieve() public view returns (uint256) {
    return number;
  }

  // Increments the stored number by 1
  function increment() public {
    number = number + 1;
    emit NumberChanged(number);
  }
}
