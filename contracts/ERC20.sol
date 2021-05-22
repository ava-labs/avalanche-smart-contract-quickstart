//SPDX-License-Identifier: mit
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ExampleERC20 is ERC20, AccessControl {
  string private TOKEN_NAME = "Example ERC20 Token";
  string private TOKEN_SYMBOL = "XMPL";

  uint private constant TOTAL_SUPPLY = 123456789;

  constructor() ERC20(TOKEN_NAME, TOKEN_SYMBOL) {
    _mint(msg.sender, TOTAL_SUPPLY);
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function decimals() public view virtual override returns (uint8) {
   return 6;
  }

  function mint(address to, uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) {
    _mint(to, amount);
  }

  function burn(address from, uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) {
    _burn(from, amount);
  }
}