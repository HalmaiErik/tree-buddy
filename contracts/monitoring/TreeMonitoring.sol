// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../registration/ActorsRegistration.sol";

contract TreeMonitoring {

    struct MonitoredValue {
        uint timestamp;
        uint32 woodQuantity;
        bool healthy;
    }

    mapping(address => MonitoredValue[]) public treeMonitoringValues;
    mapping(address => bool) public treeMonitors;

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
        require(treeMonitorParcells[msg.sender].length != 0, "Only registered tree monitoring devices are allowed to push data!");
        _;
    }

    constructor(address actorsRegistrationContract) {
        registrationContract = ActorsRegistration(actorsRegistrationContract);
    }

    function addTreeMonitor(address treeMonitorAddress, string memory parcell) onlyAdminOrForester public {

    } 

    function monitor(uint32 woodQuantity, bool healthy) onlyTreeMonitors public {
        treeMonitoringValues[msg.sender].push(MonitoredValue(block.timestamp, woodQuantity, healthy));
        checkHealth(msg.sender);
    }

    function checkHealth(address treeAddress) private {
        MonitoredValue[] memory values = treeMonitoringValues[treeAddress];
        if (values.length >= 3) {
            if (values[values.length - 2].healthy == false && values[values.length - 1].healthy == false) {
                markedTrees[treeAddress] = true;
            }
        }
    }

}