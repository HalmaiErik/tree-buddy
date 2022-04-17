import web3, {actorContractAddress} from '../../web3';
import { Roles } from '../../common';

const abi = require('../../abi/ActorsRegistration.json').abi;
const actorContract = new web3.eth.Contract(abi, actorContractAddress);
const accounts = await web3.eth.getAccounts();

const getCompanyCifs = () => {
    const companiesCount = await actorContract.methods.getCompaniesCount().call();
    let companies = [];
    for (let i = 0; i < companiesCount; i++) {
        const companyCif = await actorContract.methods.contracts(i).call();
        companies.push(company);
    }
    return companies;
}

const getConnectedWalletRole = () => {
    const isForester = await actorContract.foresters(accounts[0]).call();
    if (isForester == true) {
        return Roles.Forester;
    }

    const isCutter = await actorContract.cutters(accounts[0]).call();
    if (isCutter == true) {
        return Roles.Cutter;
    }

    return Roles.NonRegistered;
}

export const actorServiceBlockchain = {
    getCompanyCifs,
    getConnectedWalletRole
}