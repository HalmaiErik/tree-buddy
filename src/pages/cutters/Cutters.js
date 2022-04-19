import React, { useEffect, useState } from 'react';
import styles from './Cutters.module.css';
import { List, FlexboxGrid, Content, Button, Modal, Form, Input } from 'rsuite';
import { IoLocationOutline } from 'react-icons/io5';
import { AutoComplete, InputGroup } from 'rsuite';
import Search from '@rsuite/icons/Search';
import { useNavigate } from 'react-router-dom';
import * as CutterApi from '../../services/rest/cutter-api';
import web3, { actorContractAddress } from '../../web3';
import { successNotification, errorNotification, loadingNotification } from '../../common/notifications/notifications';
import { toaster } from 'rsuite';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const Cutters = () => {

  let navigate = useNavigate();

  const [cutters, setCutters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    cif: '',
    name: '',
    description: '',
    location: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    getCutters();
  }, []);

  const abi = require('../../abi/ActorsRegistration.json').abi;
  const actorContract = new web3.eth.Contract(abi, actorContractAddress);

  const submitForm = () => {
    registerCutter();
    closeModal();
    setFormValue = {
      cif: '',
      name: '',
      description: '',
      location: '',
      phone: '',
      email: '',
      address: ''
    };
  }

  const registerCutter = async () => {
    const accounts = await web3.eth.getAccounts();
    actorContract.methods.registerCutter(formValue.cif, formValue.address).send({
      from: accounts[0],
      gas: 200000
    }).on('error', (e) => {
      toaster.push(errorNotification(e), { placement: 'bottomEnd' });
    }).on('transactionHash', (txHash) => {
      toaster.push(loadingNotification(txHash), {placement: 'bottomEnd'});
    }).then((result) => {
      toaster.push(successNotification('Cutter company registered'), {placement: 'bottomEnd'});
      CutterApi.insertCutter(formValue);
    }).catch((e) => {
      toaster.push(errorNotification(e), { placement: 'bottomEnd' });
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getCutters = () => {
    setCutters([]);
    actorContract.methods.getCompaniesCount().call()
      .then((companiesCount) => {
        for (let i = 0; i < companiesCount; i++) {
          actorContract.methods.companies(i).call()
            .then((cif) => {
              CutterApi.getCutterByCif(cif)
                .then((cutter) => {
                  setCutters(cutters => cutters.concat(cutter));
                })
            });
        }
      });
  };

  return (
    <>
      <h2 className={styles.pageTitle}>Cutting companies</h2>

      <div className={styles.addButton}>
        <Button appearance='ghost' onClick={openModal}>+ Add cutter company</Button>
        <Modal overflow={false} size='md' open={isModalOpen} onClose={closeModal}>
          <Modal.Header>
            <Modal.Title>Add cutter company</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
      </div>

      <div className={styles.search}>
        <InputGroup inside>
          <AutoComplete data={cutters} placeholder='Search for cutting company name or CIF' />
          <InputGroup.Addon>
            <Search />
          </InputGroup.Addon>
        </InputGroup>
      </div>

      <Content className={styles.content}>
        <List hover bordered className={styles.list}>
          {cutters.map((item, index) => (
            <List.Item key={item['cif']} index={index + 1} onClick={() => { navigate("/cutter/" + item['cif']) }}>
              {/* name, location */}
              <FlexboxGrid className={styles.flex}>
                <FlexboxGrid.Item colspan={6} className={styles.center} style={{ flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
                  <div className={styles.titleText}>{item['name']}</div>
                  <div className={styles.slimText}>
                    <div>
                      <IoLocationOutline />
                      {' ' + item['location']}
                    </div>
                  </div>
                </FlexboxGrid.Item>

                {/* cif */}
                <FlexboxGrid.Item colspan={6} className={styles.center}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>CIF</div>
                    <div className={styles.dataText}>{item['cif']}</div>
                  </div>
                </FlexboxGrid.Item>

                {/* email */}
                <FlexboxGrid.Item colspan={6} className={styles.center}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Email</div>
                    <div className={styles.dataText}>{item['email']}</div>
                  </div>
                </FlexboxGrid.Item>

                {/* phone */}
                <FlexboxGrid.Item colspan={6} className={styles.center}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Phone</div>
                    <div className={styles.dataText}>{item['phone']}</div>
                  </div>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          ))}
        </List>
      </Content>
    </>
  )
}

export default Cutters