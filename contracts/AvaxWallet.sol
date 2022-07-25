// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

contract AvaxWallet is Initializable {
  bool public initialized;
  address payable public owner;

  receive() external payable {}

  modifier onlyOwner() {
    require(msg.sender == owner, 'Not owner');
    _;
  }

  function withdraw(uint256 _amount) external onlyOwner {
    payable(msg.sender).transfer(_amount);
  }

  function deposit(uint256 _amount) external payable {
    payable(address(this)).transfer(_amount);
  }

  function changeOwner(address payable newOwner) external onlyOwner {
    owner = newOwner;
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  function initialize(address payable newOwner) public payable initializer{
    require(!initialized, 'Contract instance has already been initialized');
    owner = newOwner;
    initialized = true;
  }

  function getBalance() external view returns (uint256) {
    return address(this).balance;
  }
}
