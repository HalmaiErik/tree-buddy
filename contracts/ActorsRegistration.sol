// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract ActorsRegistration {

    struct Company {
        string name;
        bytes10 phone;
        address walletAddress;
    }

    bytes8[] public companies;
    mapping(bytes8 => Company) public companyInfo;
    mapping(address => bytes8) public addressCompany;
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

    function registerCutter(bytes8 tin, string memory name, bytes10 phone, address walletAddress) onlyForester external {
        require(getCompanyAddress(tin) == address(0), "Cutter company already registered");

        Company memory company = Company(name, phone, walletAddress);
        companyInfo[tin] = company;
        companies.push(tin);
        addressCompany[walletAddress] = tin;
    }

    function getCompaniesCount() external view returns (uint) {
        return companies.length;
    }

    function getCompanyAddress(bytes8 tin) public view returns (address) {
        return companyInfo[tin].walletAddress;
    }
}