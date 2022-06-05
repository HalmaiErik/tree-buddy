// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "./ActorsRegistration.sol";

contract TreeCutting {

    struct CuttingContract {
        bytes8 tin;
        uint16 agreedNrTrees;
        string location;
        uint startTime; 
        uint16 nrCutTrees;
    }

    bytes32[] public contractHashes;
    mapping(bytes32 => CuttingContract) public contractInfo;
    mapping(bytes8 => bytes32[]) public companyContractHashes;

    ActorsRegistration private actors;

    event CutCreated(bytes32 cutHash);

    constructor(address actorsContractAddress) {
        actors = ActorsRegistration(actorsContractAddress);
    }

    function createCuttingContract(bytes8 tin, uint16 agreedNrTrees, string memory location) external {
        require(actors.foresters(msg.sender), "Not using a registered forester address");
        require(actors.getCompanyAddress(tin) != address(0), "Not using a registered cutter");

        CuttingContract memory cuttingContract = CuttingContract(tin, agreedNrTrees, location, block.timestamp, 0);
        bytes32 cutHash = keccak256(abi.encode(cuttingContract));
        contractInfo[cutHash] = cuttingContract;
        contractHashes.push(cutHash);
        companyContractHashes[tin].push(cutHash);
        emit CutCreated(cutHash);
    }

    function cut(bytes32 cutHash) external {
        CuttingContract storage cuttingContract = contractInfo[cutHash];
        require(actors.getCompanyAddress(cuttingContract.tin) == msg.sender, "Not using the contract's company address");
        require(cuttingContract.agreedNrTrees > cuttingContract.nrCutTrees, "No trees left for this contract");

        cuttingContract.nrCutTrees++;
    }

    function getContractNrCutTrees(bytes32 cutHash) view external returns (uint16) {
        return contractInfo[cutHash].nrCutTrees;
    }

    function getAllContractsCount() external view returns (uint) {
        return contractHashes.length;
    }

    function getCompanyContractHashesCount(bytes8 tin) external view returns (uint) {
        return companyContractHashes[tin].length;
    }
}