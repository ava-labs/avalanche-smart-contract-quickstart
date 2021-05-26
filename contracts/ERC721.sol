// contracts/ERC721.so
// spdx-license-identifier: BSD-3-Clause

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ExampleERC721 is ERC721, ERC721URIStorage, Pausable, Ownable, ERC721Burnable, ERC721Enumerable {
  string private TOKEN_NAME = "GameItem";
  string private TOKEN_SYMBOL = "ITEM";
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;

  constructor() ERC721(TOKEN_NAME, TOKEN_SYMBOL) {}

  function safeMint(address to) public onlyOwner {
    _safeMint(to, _tokenIdCounter.current());
    _tokenIdCounter.increment();
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  function _baseURI() internal pure override returns (string memory) {
    return "https://example.com";
  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    whenNotPaused
    override(ERC721, ERC721Enumerable) {
      super._beforeTokenTransfer(from, to, tokenId);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory) {
      return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool) {
      return super.supportsInterface(interfaceId);
  }
}