import React, { useState } from "react";

function MetamaskConnection() {
const [currentAccount, setCurrentAccount] = useState(["0x"])

const connectToMetamask = async () => {
    const ethereum = window.ethereum;
    if (!ethereum) {
        alert("Metamask is not installed in your browser!");
    } else {
        console.log("Metamask is installed!")

        await ethereum.request({
            method: 'eth_requestAccounts',
        }).then(handleCurrentAccount)

        ethereum.on('accountsChanged', handleCurrentAccount)
    }
}

const handleCurrentAccount =  (accounts) => {
    setCurrentAccount([accounts[0]])
}
    return (
        <div className="App">
            <button onClick={connectToMetamask}>Connect to MetaMask</button>
            <p>Your account: {currentAccount}</p>
        </div>
    );
}

export default MetamaskConnection;
