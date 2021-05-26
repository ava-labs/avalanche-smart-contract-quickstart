//SPDX-License-Identifier: BSD-3-Clause
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract ExampleERC20 is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, Pausable, ERC20Permit {
  string private TOKEN_NAME = "Example ERC20 Token";
  string private TOKEN_SYMBOL = "XMPL";

  uint private constant TOTAL_SUPPLY = 123456789;

  constructor() ERC20(TOKEN_NAME, TOKEN_SYMBOL) ERC20Permit(TOKEN_NAME) {
    _mint(msg.sender, TOTAL_SUPPLY);
  }

  function snapshot() public onlyOwner {
    _snapshot();
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
  }

  function _beforeTokenTransfer(address from, address to, uint256 amount)
    internal
    whenNotPaused
    override(ERC20, ERC20Snapshot) {
      super._beforeTokenTransfer(from, to, amount);
  }
}