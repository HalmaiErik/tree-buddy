import React, { useState } from 'react'
import web3, { transportContract } from '../../web3';
import { Button, ButtonToolbar, Form, toaster, SelectPicker } from 'rsuite';
import { successNotification, errorNotification, loadingNotification } from '../../common/notifications/notifications';

const TransportForm = ({ closeModal, reload, givenCif, givenCuts }) => {

    const [formValue, setFormValue] = useState({
        cutHash: '',
        cif: givenCif,
        nrTrees: 0,
        car: '',
        startLocation: '',
        destination: ''
    });

    const submitForm = () => {
        createTransportContract();
        closeModal();
        setFormValue({
            cutHash: '',
            cif: givenCif,
            nrTrees: 0,
            car: '',
            startLocation: '',
            destination: ''
        });
    };

    const createTransportContract = async () => {
        const accounts = await web3.eth.getAccounts();
        transportContract.methods.createTransportContract(formValue.nrTrees, web3.utils.asciiToHex(formValue.car), formValue.cutHash).send({
            from: accounts[0]
        }).on('error', (e) => {
            toaster.push(errorNotification(e), { placement: 'bottomEnd' });
        }).on('transactionHash', (txHash) => {
            toaster.push(loadingNotification(txHash), { placement: 'bottomEnd' });
        }).then(() => {
            toaster.push(successNotification('Transport contract created'), { placement: 'bottomEnd' });
            reload();
        }).catch((e) => {
            toaster.push(errorNotification(e), { placement: 'bottomEnd' });
        });
    };

    return (
        <Form fluid onChange={setFormValue} formValue={formValue}>
            <Form.Group controlId='cutHash-9' contentEditable={false}>
                <Form.ControlLabel>Cutting contract hash</Form.ControlLabel>
                <Form.Control name="cutHash" data={givenCuts} block accepter={SelectPicker} />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="nrTrees-9">
                <Form.ControlLabel>Nr. trees</Form.ControlLabel>
                <Form.Control name="nrTrees" />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="car-9">
                <Form.ControlLabel>Vehicle number plate</Form.ControlLabel>
                <Form.Control name="car" />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group>
                <ButtonToolbar style={{ 'float': 'right' }}>
                    <Button appearance="primary" onClick={submitForm}>Submit</Button>
                    <Button appearance="subtle" onClick={closeModal}>Cancel</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}

export default TransportForm