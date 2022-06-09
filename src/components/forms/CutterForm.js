import React, { useState } from 'react';
import { Button, ButtonToolbar, Form, Schema, toaster } from 'rsuite';
import web3, { actorContract } from '../../web3';
import { successNotification, errorNotification, loadingNotification } from '../../common/notifications/notifications';

const CutterForm = ({ closeModal, reload }) => {

    const [formValue, setFormValue] = useState({
        cif: '',
        name: '',
        phone: '',
        walletAddress: ''
    });

    const model = Schema.Model({
        name: Schema.Types.StringType()
            .isRequired('This field is required'),
        cif: Schema.Types.StringType()
            .isRequired('This field is required')
            .pattern(/^([0-9]{8})$/, 'The CIF must be of 8 numbers'),
        phone: Schema.Types.StringType()
            .isRequired('This field is required')
            .pattern(/^([0-9]{10})$/, 'The phone number must be of 10 numbers'),
        walletAddress: Schema.Types.StringType()
            .isRequired('This field is required')
            .pattern(/^(0x[a-fA-F0-9]{40})$/, 'Please enter a valid ethereum address')
    });

    const submitForm = () => {
        registerCutter();
        closeModal();
        setFormValue({
            cif: '',
            name: '',
            phone: '',
            walletAddress: ''
        });
    }

    const registerCutter = async () => {
        const accounts = await web3.eth.getAccounts();

        try {
            await actorContract.methods.registerCutter(web3.utils.asciiToHex(formValue.cif), formValue.name, web3.utils.asciiToHex(formValue.phone), formValue.walletAddress).call({
                from: accounts[0]
            });

            actorContract.methods.registerCutter(web3.utils.asciiToHex(formValue.cif), formValue.name, web3.utils.asciiToHex(formValue.phone), formValue.walletAddress).send({
                from: accounts[0]
            }).on('error', (e) => {
                toaster.push(errorNotification(e), { placement: 'bottomEnd' });
            }).on('transactionHash', (txHash) => {
                toaster.push(loadingNotification(txHash), { placement: 'bottomEnd' });
            }).then(() => {
                toaster.push(successNotification('Cutter company registered'), { placement: 'bottomEnd' });
                reload();
            });
        }
        catch (e) {
            toaster.push(errorNotification(e), { placement: 'bottomEnd' });
        }
    };

    return (
        <Form fluid onChange={setFormValue} formValue={formValue} model={model}>
            <Form.Group controlId='name-9'>
                <Form.ControlLabel>Company name</Form.ControlLabel>
                <Form.Control name="name" />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="cif-9">
                <Form.ControlLabel>CIF</Form.ControlLabel>
                <Form.Control name="cif" />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="phone-9">
                <Form.ControlLabel>Phone</Form.ControlLabel>
                <Form.Control name="phone" type="tel" />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="walletAddress-9">
                <Form.ControlLabel>Ethereum wallet address</Form.ControlLabel>
                <Form.Control name="walletAddress" />
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

export default CutterForm