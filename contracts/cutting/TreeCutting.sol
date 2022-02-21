// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../registration/ActorsRegistration.sol";

contract TreeCutting is ActorsRegistration {

    struct CuttingContract {
        string cif;
        uint16 agreedNrTrees;
        string location;
        uint16 parcel;
        uint startTime; // in seconds from epoch
    }

    mapping(bytes32 => bool) public contracts;
    mapping(bytes32 => CuttingContract) public contractInfo;
    mapping(bytes32 => uint16) public treesLeftForContract;
    mapping(bytes32 => mapping(bytes32 => bool)) public treesCutForContract;

    function createContract(string memory cif, uint16 agreedNrTrees, string memory location, uint16 parcel) onlyForester external returns (bytes32) {
        CuttingContract memory cuttingContract = CuttingContract(cif, agreedNrTrees, location, parcel, block.timestamp);
        bytes32 contractId = keccak256(abi.encode(cuttingContract));
        contractInfo[contractId] = cuttingContract;
        treesLeftForContract[contractId] = agreedNrTrees;
        return contractId;
    }

    function cut(bytes32 contractId, bytes32 treeId) onlyCutter external {
        require(treesLeftForContract[contractId] > 0, "No trees left for this contract");
        treesLeftForContract[contractId]--;
        treesCutForContract[contractId][treeId] = true;
    }
}