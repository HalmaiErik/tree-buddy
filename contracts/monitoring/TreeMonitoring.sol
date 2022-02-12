// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../registration/ActorsRegistration.sol";

contract TreeMonitoring {

    struct MonitoredValue {
        uint timestamp;
        uint32 woodQuantity;
        bool healthy;
    }

    mapping(address => bool) public monitoredTrees;
    mapping(address => uint16) public treeParcel;
    mapping(address => MonitoredValue[]) public monitoringValues;

    mapping(address => bool) public markedTrees;

    mapping(uint16 => uint32) public parcelMarkedWoodQuantity;

    ActorsRegistration private registrationContract;

    modifier onlyAdminOrForester {
        require(msg.sender == registrationContract.admin() || registrationContract.foresters(msg.sender), 
        "You must be using an admin or a forester address for that!");
        _;
    }

    modifier onlyRegisteredActor {
        require(msg.sender == registrationContract.admin() || registrationContract.foresters(msg.sender) || registrationContract.cutters(msg.sender), 
        "You must be using a registered address for that!");
        _;
    }

    modifier onlyTreeMonitor {
        require(monitoredTrees[msg.sender], 
        "Only registered tree monitoring devices are allowed to push data!");
        _;
    }

    constructor(address actorsRegistrationContract) {
        registrationContract = ActorsRegistration(actorsRegistrationContract);
    }

    function addMonitoredTree(address treeAddress, uint16 parcel) onlyAdminOrForester external {
        monitoredTrees[treeAddress] = true;
        treeParcel[treeAddress] = parcel;
    }

    function removeMonitoredTree(address treeAddress) onlyRegisteredActor external {
        monitoredTrees[treeAddress] = false;
        markedTrees[treeAddress] = false;

        MonitoredValue[] memory values = monitoringValues[treeAddress];
        uint16 parcel = treeParcel[treeAddress];
        parcelMarkedWoodQuantity[parcel] -= values[values.length - 1].woodQuantity;
    }

    function monitor(uint32 woodQuantity, bool healthy) onlyTreeMonitor external {
        monitoringValues[msg.sender].push(MonitoredValue(block.timestamp, woodQuantity, healthy));
        checkHealth(msg.sender);
    }

    function checkHealth(address treeAddress) private {
        MonitoredValue[] memory values = monitoringValues[treeAddress];
        if (values.length >= 2) {
            uint16 parcel = treeParcel[treeAddress];
            if (markedTrees[treeAddress]) {
                // Decrement last quantity and add new quantity
                parcelMarkedWoodQuantity[parcel] = parcelMarkedWoodQuantity[parcel] - 
                    values[values.length - 2].woodQuantity + values[values.length - 1].woodQuantity;
            }
            else if (values[values.length - 2].healthy == false && values[values.length - 1].healthy == false) {
                markedTrees[treeAddress] = true;
                parcelMarkedWoodQuantity[parcel] += values[values.length - 1].woodQuantity;
            }
        }
    }

}