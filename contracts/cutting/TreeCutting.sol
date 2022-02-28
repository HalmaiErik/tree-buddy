// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../registration/ActorsRegistration.sol";

contract TreeCutting {

    struct CuttingContract {
        bool set;
        string cif;
        uint16 agreedNrTrees;
        string location;
        uint16 parcel;
        uint startTime; // in seconds from epoch
    }

    bytes32[] public contracts;
    mapping(bytes32 => CuttingContract) public contractInfo;
    mapping(bytes32 => uint16) public treesLeftForContract;

    ActorsRegistration private actors;

    constructor(address actorsContractAddress) {
        actors = ActorsRegistration(actorsContractAddress);
    }

    function createContract(string memory cif, uint16 agreedNrTrees, string memory location, uint16 parcel) external returns (bytes32) {
        require(actors.foresters(msg.sender), "Not using a registered forester address");
        require(actors.cutterCompanies(cif) != address(0), "Not using a registered cutter");
        CuttingContract memory cuttingContract = CuttingContract(true, cif, agreedNrTrees, location, parcel, block.timestamp);
        bytes32 contractId = keccak256(abi.encode(cuttingContract));
        contractInfo[contractId] = cuttingContract;
        treesLeftForContract[contractId] = agreedNrTrees;
        contracts.push(contractId);
        return contractId;
    }

    function cut(bytes32 contractId) external {
        require(actors.cutterCompanies(contractInfo[contractId].cif) == msg.sender, "Not using the contract's company address");
        require(treesLeftForContract[contractId] > 0, "No trees left for this contract");
        treesLeftForContract[contractId]--;
    }

    function getContractSetAttribute(bytes32 contractId) view external returns (bool) {
        return contractInfo[contractId].set;
    }

    function getContractNrCutTrees(bytes32 contractId) view external returns (uint16) {
        return contractInfo[contractId].agreedNrTrees - treesLeftForContract[contractId];
    }
}