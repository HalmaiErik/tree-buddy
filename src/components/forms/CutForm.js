import { useState } from 'react'
import web3, { cuttingContract } from '../../web3';
import { Button, ButtonToolbar, Form, Schema, toaster } from 'rsuite';
import { successNotification, errorNotification, loadingNotification } from '../../common/notifications/notifications';

const CutForm = ({ closeFormModal, reload, openResultModal, givenCif }) => {

    const [formValue, setFormValue] = useState({
        cif: givenCif,
        agreedNrTrees: 0,
        location: '',
        parcel: 0
    });

    const model = Schema.Model({
        cif: Schema.Types.StringType()
            .isRequired('This field is required')
            .pattern(/^([0-9]{8})$/, 'The CIF must be of 8 numbers'),
        agreedNrTrees: Schema.Types.NumberType()
            .isRequired('This field is required')
            .range(0, 65535, 'Please enter a number between 1 and 65535'),
        location: Schema.Types.StringType()
            .isRequired('This field is required'),
    });

    const submitForm = () => {
        createCuttingContract();
        closeFormModal();
        setFormValue({
            cif: givenCif,
            agreedNrTrees: 0,
            location: '',
            parcel: 0
        });
    }

    const createCuttingContract = async () => {
        const accounts = await web3.eth.getAccounts();
        cuttingContract.methods.createCuttingContract(web3.utils.asciiToHex(formValue.cif), formValue.agreedNrTrees, formValue.location).send({
            from: accounts[0]
        }).on('error', (e) => {
            toaster.push(errorNotification(e), { placement: 'bottomEnd' });
        }).on('transactionHash', (txHash) => {
            toaster.push(loadingNotification(txHash), { placement: 'bottomEnd' });
        }).then(result => {
            toaster.push(successNotification('Cutting contract created'), { placement: 'bottomEnd' });
            reload();
            openResultModal(result.events.CutCreated.returnValues.cutHash);
        });
    };

    return (

        <Form fluid onChange={setFormValue} formValue={formValue} model={model}>
            <Form.Group controlId='cif-9'>
                <Form.ControlLabel>CIF</Form.ControlLabel>
                {
                    !!givenCif ?
                        <Form.Control readOnly name="cif" />
                        :
                        <Form.Control name="cif" />
                }
            </Form.Group>
            <Form.Group controlId="agreedNrTrees-9">
                <Form.ControlLabel>Agreed nr. trees</Form.ControlLabel>
                <Form.Control name="agreedNrTrees" />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="location-9">
                <Form.ControlLabel>Location</Form.ControlLabel>
                <Form.Control name="location" />
                <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group>
                <ButtonToolbar style={{ 'float': 'right' }}>
                    <Button appearance="primary" onClick={submitForm}>Submit</Button>
                    <Button appearance="subtle" onClick={closeFormModal}>Cancel</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}

export default CutForm