// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract ActorsRegistration {

    string[] public companies;
    mapping(string => address) public cutterCompanies;
    mapping(address => bool) public foresters;

    constructor() {
        foresters[msg.sender] = true;
    }

    modifier onlyForester {        
        require(foresters[msg.sender], "Not using a registered forester address");
        _;
    }

    function registerForester(address foresterAddress) onlyForester external {
        foresters[foresterAddress] = true;
    }

    function registerCutter(string memory cif, address cutterAddress) onlyForester external {
        cutterCompanies[cif] = cutterAddress;
        companies.push(cif);
    }

    function deleteForester(address foresterAddress) onlyForester external {
        foresters[foresterAddress] = false;
    }

    function deleteCutter(string memory cif) onlyForester external {
        cutterCompanies[cif] = address(0);
    }
}