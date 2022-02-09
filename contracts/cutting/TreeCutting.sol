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
    mapping(address => mapping(string => bytes32)) contractIdOfCutterAtParcel;

    mapping(bytes32 => int32) treesLeftForContract;
    mapping(bytes32 => mapping(address => bool)) cutTreesForContract;

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

    event ContractCreated(address indexed cutterAddress, address indexed cutterName, string parcel, int32 agreedNrTrees, uint startTime, uint endTime);
    event TreeCut(address indexed cutterAddress, address indexed treeAddress, string parcel);
    event CutTreeAfterZeroLeft(address indexed cutterAddress, string parcel);
    event CutUnmarkedTree(address indexed cutterAddress, address treeAddress);

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
        string memory treeParcel = monitoringContract.treeParcel(treeAddress);
        require(treesLeftForContractAtParcel[treeParcel][msg.sender] > 0, "You cannot cut anymore! The agreed tree count, from the contract, has been reached!");
        require(monitoringContract.markedTrees(treeAddress) == true, "You cannot cut a tree which is not marked for cutting!");
        
        treesLeftForContractAtParcel[treeParcel][msg.sender]--;
        cutTreesForContract[treeParcel][msg.sender].push(treeAddress);
        monitoringContract.removeMonitoredTree(treeAddress);
    }

    function verifyTreeOnTransport(address treeAddress, address cutterAddress) {
        string memory treeParcel = monitoringContract.treeParcel(treeAddress);
        require(cutTreesForContract[treeParcel][cutterAddress]);
    }
}