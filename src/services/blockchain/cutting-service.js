import web3, {cuttingContractAddress} from '../../web3';

const abi = require('../../abi/TreeCutting.json').abi;
const cuttingContract = new web3.eth.Contract(abi, cuttingContractAddress);
const accounts = await web3.eth.getAccounts();

const getAllCuttingContracts = async () => {
    const contractsCount = await cuttingContract.methods.getContractsCount().call();
    let contracts = [];
    for (let i = 0; i < contractsCount; i++) {
        const contractHash = await cuttingContract.methods.contracts(i).call();
        const contractInfo = getCuttingContractInfo(contractHash);
        const contract = {
            hash: contractHash, 
            cif: contractInfo["cif"], 
            agreedNrTrees: contractInfo["agreedNrTrees"], 
            location: contractInfo["location"], 
            parcel: contractInfo["parcel"], 
            startTime: contractInfo["startTime"], 
            treesLeftForContract: contractInfo["treesLeftForContract"]
        };
        contracts.push(contract);
    }
    return contracts;
};

const getCuttingContractInfo = async (contractHash) => {
    const contractInfo = await cuttingContract.methods.contractInfo(contractHash).call();
    const treesLeftForContract = await cuttingContract.methods.treesLeftForContract(contractHash).call();
    const contract = {
        cif: contractInfo[1], 
        agreedNrTrees: contractInfo[2], 
        location: contractInfo[3], 
        parcel: contractInfo[4], 
        startTime: contractInfo[5], 
        treesLeftForContract: treesLeftForContract
    };
    return contract;
};

const getCuttingContractsOfCompany = async (companyCif) => {
    const allContracts = getAllCuttingContracts();
    let companyContracts = [];
    allContracts.forEach((contact) => {
        if (contract[1] == companyCif) {
            companyContracts.push(contract);
        }
    });
    return companyContracts;
};

export const cuttingServiceBlockchain = {
    getAllCuttingContracts,
    getCuttingContractInfo,
    getCuttingContractsOfCompany
}