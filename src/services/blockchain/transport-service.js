import web3, {transportContractAddress} from '../../web3';

const abi = require('../../abi/Transportation.json').abi;
const transportContract = new web3.eth.Contract(abi, transportContractAddress);
const accounts = await web3.eth.getAccounts();

const getAllTransportContracts = async () => {
    const contractsCount = await transportContract.methods.getContractsCount().call();
    let contracts = [];
    for (let i = 0; i < contractsCount; i++) {
        const contractHash = await transportContract.methods.contracts(i).call();
        const contractInfo = getTransportContractInfo(contractHash);
        const contract = [contractHash, contractInfo[0], contractInfo[1], contractInfo[2], contractInfo[3], contractInfo[4], contractInfo[5]];
        contracts.push(contract);
    }
    return contracts;
};

const getTransportContractInfo = async (contractHash) => {
    const contractInfo = await transportContract.methods.transportInfo(contractHash).call();
    const contract = [contractInfo[1], contractInfo[2], contractInfo[3], contractInfo[4], contractInfo[5], treesLeftForContract];
    return contract;
};

const getTransportContractsOfCompany = async (companyCif) => {
    const allContracts = getAlltransportContracts();
    let companyContracts = [];
    allContracts.forEach((contact) => {
        if (contract[1] == companyCif) {
            companyContracts.push(contract);
        }
    });
    return companyContracts;
};

export const cuttingServiceBlockchain = {
    getAlltransportContracts,
    gettransportContractInfo,
    gettransportContractsOfCompany
}