// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../registration/ActorsRegistration.sol";
import "../cutting/TreeCutting.sol";

contract Transportation is ActorsRegistration {

    struct Transport {
        bytes32[] trees;
        uint departureTime;
        string car;
    }

    mapping(bytes32 => Transport) transportInfo;
    mapping(bytes32 => bytes32[]) cuttingContractTransports; // cutting contract => transport contracts
    mapping(string => bytes32[]) carTransports; // car => transport contracts

    TreeCutting private cutting;

    constructor(address cuttingContract) {
        cutting = TreeCutting(cuttingContract);
    }
    
    function createTransportContract(bytes32 cuttingId, string memory car) onlyForester external returns (bytes32) {
        require(cutting.contracts(cuttingId), "A valid cutting contract needs to be used");
        Transport memory transport = Transport(new bytes32[](0), block.timestamp, car);
        bytes32 transportId = keccak256(abi.encode(transport));
        transportInfo[transportId] = transport;
        cuttingContractTransports[cuttingId].push(transportId);
        carTransports[car].push(transportId);
        return transportId;
    }

    function addTreeToTransport(bytes32 transportId, bytes32 cuttingId, bytes32 treeId) onlyCutter external {
        require(cutting.treesCutForContract(cuttingId, treeId), "The tree is not cut for this contract");
        transportInfo[transportId].trees.push(treeId);
    }
}