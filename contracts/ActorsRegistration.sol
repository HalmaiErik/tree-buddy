// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract ActorsRegistration {

    bytes8[] public companies;
    mapping(bytes8 => address) public cutterCompanies;
    mapping(address => bool) public cutters;
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

    function registerCutter(bytes8 cif, address cutterAddress) onlyForester external {
        require(cutterCompanies[cif] == address(0), "Cutter company already registered");
        cutterCompanies[cif] = cutterAddress;
        cutters[cutterAddress] = true;
        companies.push(cif);
    }

    function deleteForester(address foresterAddress) onlyForester external {
        foresters[foresterAddress] = false;
    }

    function deleteCutter(bytes8 cif) onlyForester external {
        cutters[cutterCompanies[cif]] = false;
        cutterCompanies[cif] = address(0);
    }

    function getCompaniesCount() external view returns (uint) {
        return companies.length;
    }
}