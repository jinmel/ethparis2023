// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

/**
 * @dev Required interface of an ERC7007 compliant contract.
 * Note: the ERC-165 identifier for this interface is 0x7e52e423.
 */
interface IErc7007 is IERC165, IERC721 {
    /**
     * @dev Emitted when `tokenId` token is minted.
     */
    event Mint(
        uint256 indexed tokenId,
        bytes indexed prompt,
        bytes indexed aigcData,
        string uri,
        bytes proof
    );

    /**
     * @dev Mint token at `tokenId` given `prompt`, `aigcData`, `uri` and `proof`.
     *
     * Requirements:
     * - `tokenId` must not exist.'
     * - verify(`prompt`, `aigcData`, `proof`) must return true.
     *
     * Optional:
     * - `proof` should not include `aigcData` to save gas.
     */
    function mint(
        bytes calldata prompt,
        bytes calldata aigcData,
        string calldata uri,
        bytes calldata proof
    ) external returns (uint256 tokenId);

    /**
     * @dev Verify the `prompt`, `aigcData` and `proof`.
     */
    function verify(
        bytes calldata prompt,
        bytes calldata aigcData,
        bytes calldata proof
    ) external view returns (bool success);
}
