import React, { useState } from 'react'
import web3, { transportContract } from '../../web3';
import { Button, ButtonToolbar, Form, toaster, SelectPicker, Schema } from 'rsuite';
import { successNotification, errorNotification, loadingNotification } from '../../common/notifications/notifications';

const TransportForm = ({ closeModal, reload, givenCif, givenCut, givenCuts, givenCar, openResultModal }) => {

    const [formValue, setFormValue] = useState({
        cutHash: givenCut,
        cif: givenCif,
        nrTrees: 0,
        car: givenCar
    });

    const model = Schema.Model({
        cutHash: Schema.Types.StringType()
            .isRequired('This field is required')
            .pattern(/^(0x[a-fA-F0-9]{64})$/, 'Please enter a valid cutting contract hash'),
        nrTrees: Schema.Types.NumberType()
            .isRequired('This field is required')
            .range(0, 255, 'Please enter a number between 1 and 255'),
        car: Schema.Types.StringType()
            .isRequired('This field is required')
            .rangeLength(7, 7, 'The car number plate can only have 7 characters'),
    });

    const submitForm = () => {
        createTransportContract();
        closeModal();
        setFormValue({
            cutHash: givenCut,
            cif: givenCif,
            nrTrees: 0,
            car: ''
        });
    };

    const createTransportContract = async () => {
        const accounts = await web3.eth.getAccounts();

        try {
            await transportContract.methods.createTransportContract(formValue.nrTrees, web3.utils.asciiToHex(formValue.car.toUpperCase()), formValue.cutHash).call({
                from: accounts[0]
            });

            transportContract.methods.createTransportContract(formValue.nrTrees, web3.utils.asciiToHex(formValue.car.toUpperCase()), formValue.cutHash).send({
                from: accounts[0]
            }).on('error', (e) => {
                toaster.push(errorNotification(e), { placement: 'bottomEnd' });
            }).on('transactionHash', (txHash) => {
                toaster.push(loadingNotification(txHash), { placement: 'bottomEnd' });
            }).then(result => {
                toaster.push(successNotification('Transport contract created'), { placement: 'bottomEnd' });
                reload();
                openResultModal(result.events.TransportCreated.returnValues.transportHash);
            });
        }
        catch (e) {
            toaster.push(errorNotification(e), { placement: 'bottomEnd' });
        }
    };

    return (
        <Form fluid onChange={setFormValue} formValue={formValue} model={model}>
            <Form.Group controlId='cutHash-9'>
                <Form.ControlLabel>Cutting contract hash</Form.ControlLabel>
                {
                    !!givenCut ?
                        <Form.Control readOnly name="cutHash" />
                        :
                        givenCuts.length ?
                            <Form.Control name="cutHash" data={givenCuts} block accepter={SelectPicker} />
                            :
                            <Form.Control name="cutHash" />
                }
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="nrTrees-9">
                <Form.ControlLabel>Nr. trees</Form.ControlLabel>
                <Form.Control name="nrTrees" />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="car-9">
                <Form.ControlLabel>Vehicle number plate</Form.ControlLabel>
                {
                    !!givenCar ?
                    <Form.Control name="car" readOnly />
                    :
                    <Form.Control name="car" />
                }
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