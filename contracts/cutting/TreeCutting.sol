// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../registration/ActorsRegistration.sol";
import "../monitoring/TreeMonitoring.sol";

contract TreeCutting {

    struct CuttingContract {
        string cutterName;
        uint16 parcel;
        int32 agreedNrTrees;
        uint startTime;
        uint endTime;
    }

    bytes32[] contracts;
    mapping(bytes32 => CuttingContract) public contractInfo;
    mapping(address => mapping(uint16 => bytes32)) public contractIdOfCutterAtParcel;

    mapping(bytes32 => int32) public treesLeftForContract;
    mapping(bytes32 => mapping(address => bool)) public cutTreesMapForContract;
    mapping(bytes32 => address[]) public cutTreesListForContract;

    ActorsRegistration private registrationContract;
    TreeMonitoring private monitoringContract;

    modifier onlyCutter {
        require(registrationContract.cutters(msg.sender) == true, "Only a registered cutter can mark a tree as cut!");
        _;
    }

    modifier onlyAdmin {
        require(msg.sender == registrationContract.admin());
        _;
    }

    modifier onlyAdminOrForester {
        require(msg.sender == registrationContract.admin() || registrationContract.foresters(msg.sender), 
        "You must be using an admin or a forester address for that!");
        _;
    }

    event ContractCreated(address indexed cutterAddress, string indexed cutterName, bytes32 contractId, uint16 parcel, int32 agreedNrTrees);
    event ContractFinished(address indexed cutterAddress, string indexed cutterName, address indexed foresterAddress, bytes32 contractId);

    event CutTreeWithoutContract(address indexed cutterAddress, string indexed cutterName, uint16 parcel, address treeAddress);
    event CutTreeAfterZeroLeft(address indexed cutterAddress, string indexed cutterName, uint16 parcel, address treeAddress);
    event CutUnmarkedTree(address indexed cutterAddress, string indexed cutterName, uint16 parcel, address treeAddress);

    event UncutTreeOnTransport(address indexed cutterAddress, string indexed cutterName, address treeAddress, address indexed foresterAddress);
    event TreeNotOnCutList(address indexed cutterAddress, string indexed cutterName, address treeAddress, address indexed foresterAddress);

    constructor(address actorsRegistrationContract, address treeMonitoringContract) {
        registrationContract = ActorsRegistration(actorsRegistrationContract);
        monitoringContract = TreeMonitoring(treeMonitoringContract);
    }

    function createCuttingContract(address cutterAddress, string memory cutterName, uint16 parcel, int32 agreedNrTrees) onlyAdmin external returns (bytes32) {
        require(registrationContract.cutters(cutterAddress) == true, "You need to first register the cutter!");

        CuttingContract memory newContract = CuttingContract(cutterName, parcel, agreedNrTrees, block.timestamp, 0);
        bytes32 contractId = keccak256(abi.encode(newContract));

        contracts.push(contractId);
        contractInfo[contractId] = newContract;
        contractIdOfCutterAtParcel[cutterAddress][parcel] = contractId;
        treesLeftForContract[contractId] = agreedNrTrees;
        emit ContractCreated(cutterAddress, cutterName, contractId, parcel, agreedNrTrees);
        return contractId;
    }

    function cutTree(address treeAddress) onlyCutter external {
        uint16 parcel = monitoringContract.treeParcel(treeAddress);
        bytes32 contractId = contractIdOfCutterAtParcel[msg.sender][parcel];
        string memory cutterName = contractInfo[contractId].cutterName;

        if (!monitoringContract.markedTrees(treeAddress)) {
            emit CutUnmarkedTree(msg.sender, cutterName, parcel, treeAddress);
            revert();
        }

        if (contractId == bytes32(0)) {
            emit CutTreeWithoutContract(msg.sender, cutterName, parcel, treeAddress);
            revert();
        }

        if (treesLeftForContract[contractId] <= 0) {
            emit CutTreeAfterZeroLeft(msg.sender, cutterName, parcel, treeAddress);
            revert();
        }
        
        treesLeftForContract[contractId]--;
        cutTreesMapForContract[contractId][treeAddress] = true;
        cutTreesListForContract[contractId].push(treeAddress);
        monitoringContract.removeMonitoredTree(treeAddress);
    }

    function verifyTreeOnTransport(address treeAddress, address cutterAddress, bytes32 contractId) onlyAdminOrForester external {
        string memory cutterName = contractInfo[contractId].cutterName;
        if (monitoringContract.monitoredTrees(treeAddress)) {
            emit UncutTreeOnTransport(cutterAddress, cutterName, treeAddress, msg.sender);
            revert();
        }

        if(!cutTreesMapForContract[contractId][treeAddress]) {
            emit TreeNotOnCutList(cutterAddress, cutterName, treeAddress, msg.sender);
            revert();
        }

        emit ContractFinished(cutterAddress, cutterName, msg.sender, contractId);
        contractInfo[contractId].endTime = block.timestamp;
    }
}