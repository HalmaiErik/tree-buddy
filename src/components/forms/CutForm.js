import { useState } from 'react'
import web3, { cuttingContract } from '../../web3';
import { Button, ButtonToolbar, Form, toaster } from 'rsuite';
import { successNotification, errorNotification, loadingNotification } from '../../common/notifications/notifications';

const CutForm = ({ closeModal, reload, givenCif }) => {

    const [formValue, setFormValue] = useState({
        cif: givenCif,
        agreedNrTrees: 0,
        location: '',
        parcel: 0
    });

    const submitForm = () => {
        createCuttingContract();
        closeModal();
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
        }).then(() => {
            toaster.push(successNotification('Cutting contract created'), { placement: 'bottomEnd' });
            reload();
        }).catch((e) => {
            toaster.push(errorNotification(e), { placement: 'bottomEnd' });
        });
    };

    return (
        <Form fluid onChange={setFormValue} formValue={formValue}>
            <Form.Group controlId='cif-9' contentEditable={false}>
                <Form.ControlLabel>CIF</Form.ControlLabel>
                <Form.Control readOnly name="cif" />
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
                    <Button appearance="subtle" onClick={closeModal}>Cancel</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>
    )
}

export default CutForm