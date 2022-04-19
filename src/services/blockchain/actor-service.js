import web3, {actorContractAddress} from '../../web3';

const abi = require('../../abi/ActorsRegistration.json').abi;
const actorContract = new web3.eth.Contract(abi, actorContractAddress);

const getConnectedWalletRole = async () => {
    
}

export {
    getConnectedWalletRole
}