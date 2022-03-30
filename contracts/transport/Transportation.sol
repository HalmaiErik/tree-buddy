// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../registration/ActorsRegistration.sol";
import "../cutting/TreeCutting.sol";

contract Transportation {

    struct Transport {
        uint8 nrTrees;
        string car;
        string cif;
        uint departureTime;
        string startLocation;
        string destination;
    }

    bytes32[] public contracts;
    mapping(bytes32 => Transport) public transportInfo;
    mapping(bytes32 => uint16) public treesTransported; // cutting contract => trees transported
    mapping(bytes32 => bytes32[]) public cuttingContractTransports; // cutting contract => transport contracts
    mapping(string => bytes32[]) public carTransports; // number plate => transport contracts

    ActorsRegistration private actors;
    TreeCutting private cutting;

    constructor(address actorsContractAddress, address cuttingContractAddress) {
        actors = ActorsRegistration(actorsContractAddress);
        cutting = TreeCutting(cuttingContractAddress);
    }
    
    function createTransportContract(uint8 nrTrees, string memory car, string memory cif, string memory destination, bytes32 cuttingId) external returns (bytes32) {
        require(actors.foresters(msg.sender), "Not using a registered forester address");
        require(cutting.getContractSetAttribute(cuttingId), "An already created cutting contract needs to be used");
        require(actors.cutterCompanies(cif) != address(0), "Not using a registered cutter");
        require(treesTransported[cuttingId] + nrTrees <= cutting.getContractNrCutTrees(cuttingId), 
                "Cannot transport more trees than what has been cut for cutting contract");
        treesTransported[cuttingId] += nrTrees;
        Transport memory transport = Transport(nrTrees, car, cif, block.timestamp, cutting.getContractLocation(cuttingId), destination);
        bytes32 transportId = keccak256(abi.encode(transport));
        transportInfo[transportId] = transport;
        cuttingContractTransports[cuttingId].push(transportId);
        carTransports[car].push(transportId);
        contracts.push(transportId);
        return transportId;
    }
}