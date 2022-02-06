// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../registration/ActorsRegistration.sol";
import "../monitoring/TreeMonitoring.sol";

contract TreeCutting {

    struct CuttingContract {
        uint32 agreedNrTrees;
        uint startTime;
        uint endTime;
        string cutterName;
    }

    mapping(string => mapping(address => int32)) cutterRemainingTrees;
    mapping(string => mapping(address => address[])) cutterCutTrees;
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

    function createCuttingContract(address cutterAddress, uint32 agreedNrTrees, uint startTime, string memory cutterName, string memory parcel) onlyAdmin external {
        require(registrationContract.cutters(cutterAddress) == true, "You need to first register the cutter!");
        parcelContracts[parcel].push(CuttingContract(agreedNrTrees, startTime, 0, cutterName));
        
    }

    function cutTree(address monitorAddress) onlyCutter external {
        string memory monitorParcel = monitoringContract.monitorParcel(monitorAddress);
        require(cutterRemainingTrees[monitorParcel][msg.sender] > 0, "You cannot cut anymore! The agreed tree count, from the contract, has been reached!");
        
        cutterRemainingTrees[monitorParcel][msg.sender]--;
        // Add to contract's cut tree list
    }
}