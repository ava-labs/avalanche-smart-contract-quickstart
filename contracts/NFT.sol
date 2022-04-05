// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFT is ERC721, ERC721Enumerable, AccessControl {
  using Counters for Counters.Counter;

  bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');
  Counters.Counter private _tokenIdCounter;
  string private baseURI;
  uint256 private maxTokens;

  constructor(
    string memory name,
    string memory symbol,
    string memory metadataUri,
    uint256 _maxTokens
  ) ERC721(name, symbol) {
    require(_maxTokens > 0, 'Max Tokens cannot be 0');
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(MINTER_ROLE, msg.sender);
    baseURI = metadataUri;
    maxTokens = _maxTokens;
    _tokenIdCounter.increment();
  }

  function awardGameItem(address to) public onlyRole(MINTER_ROLE) {
    require(_tokenIdCounter.current() < maxTokens + 1, 'Maximum amount of tokens minted');
    _safeMint(to, _tokenIdCounter.current());
    _tokenIdCounter.increment();
  }
  
    function uintToStr(uint256 _i) internal pure returns (string memory _uintAsString) {
    if (_i == 0) {
      return '0';
    }
    uint256 j = _i;
    uint256 len;
    while (j != 0) {
      len++;
      j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint256 k = len;
    while (_i != 0) {
      k = k - 1;
      uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
      bytes1 b1 = bytes1(temp);
      bstr[k] = b1;
      _i /= 10;
    }
    return string(bstr);
  }


  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');
    return string(abi.encodePacked(baseURI, uintToStr(tokenId)));
  }


  function transferRole(bytes32 _role, address _to) public onlyRole(_role) {
    grantRole(_role, _to);
    renounceRole(_role, msg.sender);
  }

  // The following functions are overrides required by Solidity.

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}

