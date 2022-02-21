import React, { useState } from "react";
import styles from './MetamaskConnection.module.css';
import { Button } from "rsuite";

function MetamaskConnection() {

    const [currentAccount, setCurrentAccount] = useState(["0x"])
    const [walletConnected, setWalletConnected] = useState(false)

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
            console.log('szia')
        }
    }

    const handleCurrentAccount = (accounts) => {
        setCurrentAccount([
            accounts[0][0] +
            accounts[0][1] +
            '...' +
            accounts[0][38] +
            accounts[0][39] +
            accounts[0][40] +
            accounts[0][41]
        ])
        setWalletConnected(true)
    }

    return (
        <Button className={styles.btn} color="green" appearance="primary" onClick={connectToMetamask}>
            {walletConnected ? {currentAccount} : 'Connect wallet'}
        </Button>
    );
}

export default MetamaskConnection;
