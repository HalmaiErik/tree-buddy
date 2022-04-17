import React, { useState } from "react";
import styles from './MetamaskConnection.module.css';
import { Button, Popover, Whisper, Dropdown } from "rsuite";


function MetamaskConnection() {

    const [accountAddress, setAccountAddress] = useState("");
    const ref = React.useRef();

    const LogoutPopover = ({ address }) => {

        const ref = React.useRef();

        const MenuPopover = React.forwardRef(({ onSelect, ...rest }, ref) => (
            <Popover ref={ref} {...rest} full>
                <Dropdown.Menu onSelect={onSelect}>
                    <Dropdown.Item eventKey={1}>Disconnect</Dropdown.Item>
                </Dropdown.Menu>
            </Popover>
        ));

        function handleSelectMenu(eventKey, event) {
            if (eventKey == 1) {
                setAccountAddress("");
            }

            ref.current.close();
        }

        return (
            <Whisper
                placement="bottomEnd"
                controlId="control-id-with-dropdown"
                trigger="click"
                ref={ref}
                speaker={<MenuPopover onSelect={handleSelectMenu} />}
            >
                <Button className={styles.btn} appearance="primary">{address}</Button>
            </Whisper>
        );
    }

    async function getAccount() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const account = accounts[0];
        return account;
    }

    const connectButtonOnClick = () => {
        if (typeof window !== "undefined") {
            getAccount().then((response) => {
                setAccountAddress(response);
            });
        }
    };

    return (
        !!accountAddress ?
            <LogoutPopover address={accountAddress.substring(0, 5) + "..." + accountAddress.substring(accountAddress.length - 4)} />
            :
            <Button className={styles.btn} appearance="primary" onClick={connectButtonOnClick}>Connect wallet</Button>
    );
}

export default MetamaskConnection;
