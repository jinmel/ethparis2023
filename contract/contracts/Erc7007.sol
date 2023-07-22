// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IErc7007.sol";
import "./IVerifier.sol";

contract ERC7007 is IErc7007, ERC721 {
    IVerifier public verifierContract;
    mapping(uint256 tokenId => bytes16 metadata) public tokenIdMetadata;
    uint256 currentTokenId = 1;

    constructor(IVerifier _verifierContract) ERC721("MyToken", "MTK") {
        verifierContract = _verifierContract;
    }

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }

    function mint(
        bytes calldata prompt,
        bytes calldata aigcData,
        string calldata uri,
        bytes calldata proof
    ) external returns (uint256) {
        // verify correctlyness of prompt
        require(verify(prompt, aigcData, proof), "incorrrect proof");
        uint256 tokenIdNow = currentTokenId;
        currentTokenId++;
        safeMint(msg.sender, tokenIdNow);
        tokenIdMetadata[tokenIdNow] = bytes16(aigcData);

        emit Mint(tokenIdNow, prompt, aigcData, uri, proof);
        return tokenIdNow;
    }

    function verify(
        bytes calldata prompt,
        bytes calldata aigcData,
        bytes calldata proof
    ) public view returns (bool success) {
        bytes[] memory _inputs;
        _inputs[0] = prompt;
        _inputs[1] = aigcData;
        return verifierContract.verify(_inputs, proof);
    }

    function getMetadata(uint256 tokenId) public view returns (bytes16) {
        return tokenIdMetadata[tokenId];
    }
}
