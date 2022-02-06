// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract ActorsRegistration {

    address public admin;

    mapping(address => bool) public cutters;
    mapping(address => bool) public foresters;

    modifier onlyAdmin {
        require(msg.sender == admin, "You must be using an admin address for that!");
        _;
    }

    modifier onlyAdminOrForester {
        bool forester = false;
        if (foresters[msg.sender] == true) {
            forester = true;
        }
        
        require(msg.sender == admin || forester, "You must be using an admin or a forester address for that!");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerForester(address foresterAddress) onlyAdmin external {
        foresters[foresterAddress] = true;
    }

    function registerCutter(address cutterAddress) onlyAdminOrForester external {
        cutters[cutterAddress] = true;
    }

    function deleteForester(address foresterAddress) onlyAdmin external {
        foresters[foresterAddress] = false;
    }

    function deleteCutter(address cutterAddress) onlyAdminOrForester external {
        cutters[cutterAddress] = false;
    }
}