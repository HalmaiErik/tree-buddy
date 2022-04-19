import React, { useState, useEffect } from 'react'
import { Button, Nav, Navbar, Modal, Form } from 'rsuite'
import MetamaskConnection from './MetamaskConnection/MetamaskConnection'
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { successNotification, errorNotification, loadingNotification } from '../../common/notifications/notifications';
import { toaster } from 'rsuite';
import web3, { actorContractAddress } from '../../web3';


const Header = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValue, setFormValue] = useState({
        address: ''
    });

    useEffect(() => {

    }, []);

    const abi = require('../../abi/ActorsRegistration.json').abi;
    const actorContract = new web3.eth.Contract(abi, actorContractAddress);

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
            toaster.push(errorNotification(e), {placement: 'bottomEnd'});
        }).on('transactionHash', (txHash) => {
            toaster.push(loadingNotification(txHash), {placement: 'bottomEnd'});
        }).then((result) => {
            toaster.push(successNotification('Forester registered'), {placement: 'bottomEnd'});
        }).catch((e) => {
            toaster.push(errorNotification(e), {placement: 'bottomEnd'});
        });
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
                <Button appearance='ghost' onClick={openModal} className={styles.addForesterBtn}>Add forester</Button>
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
                <MetamaskConnection />
            </Nav>
        </Navbar>
    )
}

export default Header