import React, { useState, useEffect } from "react";
import styles from './MetamaskConnection.module.css';
import { Button, Popover, Whisper, Dropdown } from "rsuite";
import { useNavigate } from 'react-router-dom';

const getAccount = async () => {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    const account = accounts[0];
    return account;
}

function MetamaskConnection() {

    const [accountAddress, setAccountAddress] = useState("");

    useEffect(() => {
        connectButtonOnClick();

        window.ethereum.on('accountsChanged', () => {
            connectButtonOnClick();
        });
    }, []);

    const ref = React.useRef();

    const LogoutPopover = ({ address }) => {

        const ref = React.useRef();

        let navigate = useNavigate();

        const MenuPopover = React.forwardRef(({ onSelect, ...rest }, ref) => (
            <Popover ref={ref} {...rest} full>
                <Dropdown.Menu onSelect={onSelect}>
                    <Dropdown.Item eventKey={1}>Dashboard</Dropdown.Item>
                    <Dropdown.Item eventKey={2}>Disconnect</Dropdown.Item>
                </Dropdown.Menu>
            </Popover>
        ));

        function handleSelectMenu(eventKey, event) {
            if (eventKey == 1) {
                navigate("/dashboard/" + address);
            }
            else if (eventKey == 2) {
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
                <Button className={styles.btn} appearance="primary">{address.substring(0, 5) + "..." + address.substring(address.length - 4)}</Button>
            </Whisper>
        );
    }

    const connectButtonOnClick = () => {
        if (typeof window !== "undefined") {
            getAccount().then(response => {
                setAccountAddress(response);
            });
        }
    };

    return (
        !!accountAddress ?
            <LogoutPopover address={accountAddress} />
            :
            <Button className={styles.btn} appearance="primary" onClick={connectButtonOnClick}>Connect wallet</Button>
    );
}

export default MetamaskConnection;
export { getAccount };
