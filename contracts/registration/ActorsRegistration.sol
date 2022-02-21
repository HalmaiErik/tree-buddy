// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract ActorsRegistration {

    mapping(string => address) public companyAddress;
    mapping(address => bool) public cutters;
    mapping(address => bool) public foresters;

    modifier onlyForester {        
        require(foresters[msg.sender], "Not using a registered forester address");
        _;
    }

    modifier onlyCutter {
        require(cutters[msg.sender], "Not using a registered cutter address");
        _;
    }

    function registerForester(address foresterAddress) onlyForester external {
        foresters[foresterAddress] = true;
    }

    function registerCutter(string memory cif, address cutterAddress) onlyForester external {
        cutters[cutterAddress] = true;
        companyAddress[cif] = cutterAddress;
    }

    function deleteForester(address foresterAddress) onlyForester external {
        foresters[foresterAddress] = false;
    }

    function deleteCutter(address cutterAddress) onlyForester external {
        cutters[cutterAddress] = false;
    }
}