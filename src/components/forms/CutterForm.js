import React, { useState } from 'react';
import { Button, ButtonToolbar, Form, Input, toaster } from 'rsuite';
import web3, { actorContract } from '../../web3';
import * as CutterApi from '../../services/rest/cutter-api';
import { successNotification, errorNotification, loadingNotification } from '../../common/notifications/notifications';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const CutterForm = ({ closeModal, reload }) => {

    const [formValue, setFormValue] = useState({
        cif: '',
        name: '',
        description: '',
        location: '',
        phone: '',
        email: '',
        address: ''
    });

    const submitForm = () => {
        registerCutter();
        closeModal();
        setFormValue({
            cif: '',
            name: '',
            description: '',
            location: '',
            phone: '',
            email: '',
            address: ''
        });
    }

    const registerCutter = async () => {
        const accounts = await web3.eth.getAccounts();
        actorContract.methods.registerCutter(web3.utils.asciiToHex(formValue.cif), formValue.address).send({
            from: accounts[0]
        }).on('error', (e) => {
            toaster.push(errorNotification(e), { placement: 'bottomEnd' });
        }).on('transactionHash', (txHash) => {
            toaster.push(loadingNotification(txHash), { placement: 'bottomEnd' });
        }).then(() => {
            toaster.push(successNotification('Cutter company registered'), { placement: 'bottomEnd' });
            CutterApi.insertCutter(formValue);
            reload();
        }).catch((e) => {
            toaster.push(errorNotification(e), { placement: 'bottomEnd' });
        });
    };

    return (
        <Form fluid onChange={setFormValue} formValue={formValue}>
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
            <Form.Group controlId="description-9">
                <Form.ControlLabel>Brief description</Form.ControlLabel>
                <Form.Control rows={5} name="description" accepter={Textarea} />
            </Form.Group>
            <Form.Group controlId="location-9">
                <Form.ControlLabel>Location</Form.ControlLabel>
                <Form.Control name="location" />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="phone-9">
                <Form.ControlLabel>Phone</Form.ControlLabel>
                <Form.Control name="phone" type="tel" />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="email-9">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control name="email" type="email" />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="address-9">
                <Form.ControlLabel>Ethereum wallet address</Form.ControlLabel>
                <Form.Control name="address" />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group>
                <ButtonToolbar style={{'float': 'right'}}>
                    <Button appearance="primary" onClick={submitForm}>Submit</Button>
                    <Button appearance="subtle" onClick={closeModal}>Cancel</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}

export default CutterForm