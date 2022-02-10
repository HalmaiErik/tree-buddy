// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../registration/ActorsRegistration.sol";
import "../monitoring/TreeMonitoring.sol";

contract TreeCutting {

    struct CuttingContract {
        string cutterName;
        string parcel;
        int32 agreedNrTrees;
        uint startTime;
        uint endTime;
    }

    CuttingContract[] contracts;
    mapping(bytes32 => CuttingContract) public contractInfo;
    mapping(address => mapping(string => bytes32)) public contractIdOfCutterAtParcel;

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

    event ContractCreated(address indexed cutterAddress, string indexed cutterName, string parcel, int32 agreedNrTrees, uint startTime, uint endTime);
    event CutTreeWithoutContract(address indexed cutterAddress, string indexed cutterName, string parcel);
    event CutTreeAfterZeroLeft(address indexed cutterAddress, string parcel);
    event CutUnmarkedTree(address indexed cutterAddress, address treeAddress);
    event UncutTreeOnTransport(address indexed cutterAddress, string indexed cutterName, address indexed treeAddress);
    event TreeNotOnCutList(address indexed cutterAddress, string indexed cutterName, address indexed treeAddress);

    constructor(address actorsRegistrationContract, address treeMonitoringContract) {
        registrationContract = ActorsRegistration(actorsRegistrationContract);
        monitoringContract = TreeMonitoring(treeMonitoringContract);
    }

    function createCuttingContract(bytes32 contractId, address cutterAddress, int32 agreedNrTrees, uint startTime, string memory cutterName, string memory parcel) onlyAdmin external {
        require(registrationContract.cutters(cutterAddress) == true, "You need to first register the cutter!");

        CuttingContract memory newContract = CuttingContract(cutterName, parcel, agreedNrTrees, startTime, 0);
        contracts.push(newContract);
        contractInfo[contractId] = newContract;
        contractIdOfCutterAtParcel[cutterAddress][parcel] = contractId;
        treesLeftForContract[contractId] = agreedNrTrees;
        emit ContractCreated(cutterAddress, cutterName, parcel, agreedNrTrees, startTime, 0);
    }

    function cutTree(address treeAddress) onlyCutter external {
        if (!monitoringContract.markedTrees(treeAddress)) {
            emit CutUnmarkedTree(msg.sender, treeAddress);
            revert();
        }
        
        string memory treeParcel = monitoringContract.treeParcel(treeAddress);
        bytes32 contractId = contractIdOfCutterAtParcel[msg.sender][treeParcel];
        string memory cutterName = contractInfo[contractId].cutterName;

        if (contractId == bytes32(0)) {
            emit CutTreeWithoutContract(msg.sender, cutterName, treeParcel);
            revert();
        }

        if (treesLeftForContract[contractId] <= 0) {
            emit CutTreeAfterZeroLeft(msg.sender, treeParcel);
            revert();
        }
        
        treesLeftForContract[contractId]--;
        cutTreesMapForContract[contractId][treeAddress] = true;
        cutTreesListForContract[contractId].push(treeAddress);
        monitoringContract.removeMonitoredTree(treeAddress);
    }

    function verifyTreeOnTransport(address treeAddress, address cutterAddress, bytes32 contractId) onlyAdminOrForester external returns (bool) {
        string memory cutterName = contractInfo[contractId].cutterName;
        if (monitoringContract.monitoredTrees(treeAddress)) {
            emit UncutTreeOnTransport(cutterAddress, cutterName, treeAddress);
            revert();
        }

        if(!cutTreesMapForContract[contractId][treeAddress]) {
            emit TreeNotOnCutList(cutterAddress, cutterName, treeAddress);
            revert();
        }

        return true;
    }
}