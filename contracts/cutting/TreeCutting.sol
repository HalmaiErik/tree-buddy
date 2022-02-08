// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../registration/ActorsRegistration.sol";
import "../monitoring/TreeMonitoring.sol";

contract TreeCutting {

    struct CuttingContract {
        int32 agreedNrTrees;
        uint startTime;
        uint endTime;
        string cutterName;
    }

    mapping(bytes32 => CuttingContract) public cuttingContract;
    mapping(string => mapping(address => address[])) public contractAllCutTrees;
    mapping(string => mapping(address => address[])) public contractTransportedCutTrees;

    mapping(string => mapping(address => int32)) treesLeftForContractAtParcel;
    mapping(string => CuttingContract[]) parcelContracts;

    ActorsRegistration registrationContract;
    TreeMonitoring monitoringContract;

    modifier onlyCutter {
        require(registrationContract.cutters(msg.sender) == true, "Only a registered cutter can mark a tree as cut!");
        _;
    }

    modifier onlyAdmin {
        require(msg.sender == registrationContract.admin());
        _;
    }

    constructor(address actorsRegistrationContract, address treeMonitoringContract) {
        registrationContract = ActorsRegistration(actorsRegistrationContract);
        monitoringContract = TreeMonitoring(treeMonitoringContract);
    }

    function createCuttingContract(bytes32 contractId, address cutterAddress, int32 agreedNrTrees, uint startTime, string memory cutterName, string memory parcel) onlyAdmin external {
        require(registrationContract.cutters(cutterAddress) == true, "You need to first register the cutter!");

        CuttingContract memory newContract = CuttingContract(agreedNrTrees, startTime, 0, cutterName);
        cuttingContract[contractId] = newContract;
        parcelContracts[parcel].push(newContract);
        treesLeftForContractAtParcel[parcel][cutterAddress] = agreedNrTrees;
    }

    function cutTree(address treeAddress) onlyCutter external {
        string memory treeParcel = monitoringContract.treeParcel(treeAddress);
        require(treesLeftForContractAtParcel[treeParcel][msg.sender] > 0, "You cannot cut anymore! The agreed tree count, from the contract, has been reached!");
        require(monitoringContract.markedTrees(treeAddress) == true, "You cannot cut a tree which is not marked for cutting!");
        
        treesLeftForContractAtParcel[treeParcel][msg.sender]--;
        contractAllCutTrees[treeParcel][msg.sender].push(treeAddress);
        contractTransportedCutTrees[treeParcel][msg.sender].push(treeAddress);
    }
}