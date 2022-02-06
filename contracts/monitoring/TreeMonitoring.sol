// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../registration/ActorsRegistration.sol";

contract TreeMonitoring {

    struct MonitoredValue {
        uint timestamp;
        uint32 woodQuantity;
        bool healthy;
    }

    mapping(address => bool) public monitors;
    mapping(address => MonitoredValue[]) public monitoringValues;
    mapping(address => string) public monitorParcel;

    mapping(address => bool) public markedTrees;

    ActorsRegistration private registrationContract;

    modifier onlyAdminOrForester {
        bool forester = false;
        if (registrationContract.foresters(msg.sender) == true) {
            forester = true;
        }
        
        require(msg.sender == registrationContract.admin() || forester, "You must be using an admin or a forester address for that!");
        _;
    }

    modifier onlyTreeMonitors {
        require(monitors[msg.sender] == true, "Only registered tree monitoring devices are allowed to push data!");
        _;
    }

    constructor(address actorsRegistrationContract) {
        registrationContract = ActorsRegistration(actorsRegistrationContract);
    }

    function addTreeMonitor(address monitorAddress, string memory parcel) onlyAdminOrForester public {
        monitors[monitorAddress] = true;
        monitorParcel[monitorAddress] = parcel;
    } 

    function monitor(uint32 woodQuantity, bool healthy) onlyTreeMonitors public {
        monitoringValues[msg.sender].push(MonitoredValue(block.timestamp, woodQuantity, healthy));
        checkHealth(msg.sender);
    }

    function checkHealth(address treeAddress) private {
        MonitoredValue[] memory values = monitoringValues[treeAddress];
        if (values.length >= 3) {
            if (values[values.length - 2].healthy == false && values[values.length - 1].healthy == false) {
                markedTrees[treeAddress] = true;
            }
        }
    }

}