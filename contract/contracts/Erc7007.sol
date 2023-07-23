// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./IErc7007.sol";
import "./IVerifier.sol";
import "./IUserRegistry.sol";

contract ERC7007 is IErc7007, ERC721 {
    IVerifier public verifierContract;
    IUserRegistry public userRegistry;
    mapping(uint256 tokenId => bytes16 metadata) public tokenIdMetadata;
    uint256 currentTokenId = 1;

    modifier requireRegistry() {
        require(userRegistry.isUserExist(msg.sender), "User Not Registered");
        _;
    }

    constructor(
        IVerifier _verifierContract,
        IUserRegistry _userRegistry
    ) ERC721("MyToken", "MTK") {
        verifierContract = _verifierContract;
        userRegistry = _userRegistry;
    }

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }

    function mint(
        bytes calldata prompt,
        bytes calldata aigcData,
        string calldata uri,
        bytes calldata proof
    )
        external
        returns (
            // requireRegistry
            uint256
        )
    {
        // verify correctlyness of prompt
        // require(verify(prompt, aigcData, proof), "incorrrect proof");
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

    function masterMint(bytes calldata aigcData) public returns (uint256) {
        uint256 tokenIdNow = currentTokenId;
        currentTokenId++;
        safeMint(msg.sender, tokenIdNow);
        tokenIdMetadata[tokenIdNow] = bytes16(aigcData);

        bytes memory fakePrompt = "fake";
        emit Mint(tokenIdNow, fakePrompt, aigcData, "", fakePrompt);
        return tokenIdNow;
    }
}
