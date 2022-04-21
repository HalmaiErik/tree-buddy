// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "./ActorsRegistration.sol";
import "./TreeCutting.sol";

contract Transportation {

    struct Transport {
        uint8 nrTrees;
        bytes7 car;
        bytes32 cutHash;
        uint departureTime; 
    }

    bytes32[] public contractHashes;
    mapping(bytes32 => Transport) public contractInfo;
    mapping(bytes32 => bytes32[]) public cuttingContractTransportHashes; // cutting contract => transport contracts
    mapping(bytes32 => uint16) public treesTransported; // cutting contract => trees transported
    mapping(bytes7 => bytes32[]) public carTransports;

    ActorsRegistration private actors;
    TreeCutting private cutting;

    constructor(address actorsContractAddress, address cuttingContractAddress) {
        actors = ActorsRegistration(actorsContractAddress);
        cutting = TreeCutting(cuttingContractAddress);
    }
    
    function createTransportContract(uint8 nrTrees, bytes7 car, bytes32 cutHash) external returns (bytes32) {
        require(actors.foresters(msg.sender), "Not using a registered forester address");

        uint16 newNrTreesTransported = treesTransported[cutHash] + nrTrees;
        require(newNrTreesTransported <= cutting.getContractNrCutTrees(cutHash), 
                "Cannot transport more trees than what has been cut for cutting contract");
        treesTransported[cutHash] = newNrTreesTransported;

        Transport memory transport = Transport(nrTrees, car, cutHash, block.timestamp);
        bytes32 transportId = keccak256(abi.encode(transport));
        contractInfo[transportId] = transport;
        cuttingContractTransportHashes[cutHash].push(transportId);
        carTransports[car].push(transportId);
        contractHashes.push(transportId);
        return transportId;
    }

    function getAllContractsCount() external view returns (uint) {
        return contractHashes.length;
    }

    function getCuttingContractTransportHashesCount(bytes32 cutHash) external view returns (uint) {
        return cuttingContractTransportHashes[cutHash].length;
    }
}