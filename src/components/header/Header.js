import React, { useState, useEffect } from 'react'
import { Button, Nav, Navbar, Modal, Form } from 'rsuite'
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { successNotification, errorNotification, loadingNotification } from '../../common/notifications/notifications';
import { toaster } from 'rsuite';
import web3, { actorContract } from '../../web3';
import MetamaskConnection from './MetamaskConnection/MetamaskConnection';
import { getAccount } from './MetamaskConnection/MetamaskConnection';
import { isMobile, isEdge } from 'react-device-detect';

const Header = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValue, setFormValue] = useState({
        address: ''
    });

    const [isForester, setIsForester] = useState(false);

    useEffect(() => {
        checkIfForester();
    }, []);

    const NavLink = props => <Nav.Item as={Link} {...props} />

    const submitForm = () => {
        registerForester();
        closeModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const registerForester = async () => {
        const accounts = await web3.eth.getAccounts();
        actorContract.methods.registerForester(formValue.address).send({
            from: accounts[0],
            gas: 200000
        }).on('error', (e) => {
            toaster.push(errorNotification(e), { placement: 'bottomEnd' });
        }).on('transactionHash', (txHash) => {
            toaster.push(loadingNotification(txHash), { placement: 'bottomEnd' });
        }).then((result) => {
            toaster.push(successNotification('Forester registered'), { placement: 'bottomEnd' });
        }).catch((e) => {
            toaster.push(errorNotification(e), { placement: 'bottomEnd' });
        });
    };

    const checkIfForester = () => {
        if (window.ethereum) {
            getAccount().then(account => {
                actorContract.methods.foresters(account).call()
                    .then(resp => {
                        setIsForester(resp);
                    });
            });
        }
    };

    return (
        <Navbar>
            <Navbar.Brand as={Link} to="/">
                Tree Buddy
            </Navbar.Brand>
            <Nav>
                <NavLink to="/transports">Transports</NavLink>
                <NavLink to="/cuts">Cuts</NavLink>
                <NavLink to="/cutters">Cutters</NavLink>
            </Nav>
            <Nav pullRight className={styles.wallet}>
                {isForester && <Button appearance='ghost' onClick={openModal} className={styles.addForesterBtn}>Add forester</Button>}
                <Modal overflow={false} size='md' open={isModalOpen} onClose={closeModal}>
                    <Modal.Header>
                        <Modal.Title>Add forester</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form fluid onChange={setFormValue} formValue={formValue}>
                            <Form.Group controlId="address-9">
                                <Form.ControlLabel>Ethereum wallet address</Form.ControlLabel>
                                <Form.Control name="address" />
                                <Form.HelpText>Required</Form.HelpText>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={submitForm} appearance="primary">
                            Confirm
                        </Button>
                        <Button onClick={closeModal} appearance="subtle">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

                {!isMobile && !isEdge && <MetamaskConnection />}
            </Nav>
        </Navbar>
    )
}

export default Header