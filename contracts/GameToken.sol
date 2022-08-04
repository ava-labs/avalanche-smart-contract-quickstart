// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameToken is ERC721, Ownable {
  constructor(string memory _name, string memory _symbol)
    ERC721(_name, _symbol)
  {}

  uint256 COUNTER;

  uint256 fee = 0.01 ether;

  struct GameToken {
    string name;
    uint256 id;
    uint256 dna;
    uint8 level;
    uint8 rarity;
  }

  GameToken[] public gameTokens;

  event NewGameToken(address indexed owner, uint256 id, uint256 dna);

  function _createRandomNum(uint256 _mod) internal view returns (uint256) {
    uint256 randomNum = uint256(
      keccak256(abi.encodePacked(block.timestamp, msg.sender))
    );
    return randomNum % _mod;
  }

  function updateFee(uint256 _fee) external onlyOwner {
    fee = _fee;
  }

  function withdraw() external payable onlyOwner {
    address payable _owner = payable(owner());
    _owner.transfer(address(this).balance);
  }

  // Creation
  function _createGameToken(string memory _name) internal {
    uint8 randRarity = uint8(_createRandomNum(100));
    uint256 randDna = _createRandomNum(10**16);
    GameToken memory newGameToken = GameToken(_name, COUNTER, randDna, 1, randRarity);
    gameTokens.push(newGameToken);
    _safeMint(msg.sender, COUNTER);
    emit NewGameToken(msg.sender, COUNTER, randDna);
    COUNTER++;
  }

  function createRandomGameToken(string memory _name) public payable {
    require(msg.value >= fee);
    _createGameToken(_name);
  }

  function getGameTokens() public view returns (GameToken[] memory) {
    return gameTokens;
  }

  function getOwnerGameTokens(address _owner) public view returns (GameToken[] memory) {
    GameToken[] memory result = new GameToken[](balanceOf(_owner));
    uint256 counter = 0;
    for (uint256 i = 0; i < gameTokens.length; i++) {
      if (ownerOf(i) == _owner) {
        result[counter] = gameTokens[i];
        counter++;
      }
    }
    return result;
  }

  function levelUp(uint256 _gameTokenId) public {
    require(ownerOf(_gameTokenId) == msg.sender);
    GameToken storage gameToken = gameTokens[_gameTokenId];
    gameToken.level++;
  }
}