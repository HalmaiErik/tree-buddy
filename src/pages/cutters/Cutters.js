import React, { useEffect, useState } from 'react';
import styles from './Cutters.module.css';
import { List, FlexboxGrid, Content, Button, Modal, Form, Input } from 'rsuite';
import { IoLocationOutline } from 'react-icons/io5';
import { AutoComplete, InputGroup } from 'rsuite';
import Search from '@rsuite/icons/Search';
import { useNavigate } from 'react-router-dom';
import * as CutterApi from '../../services/rest/cutter-api';
import web3, { actorContractAddress } from '../../web3';
import { Paragraph } from '@rsuite/icons';
import FormGroup from 'rsuite/esm/FormGroup';

const data = [
  {
    id: 0,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 1,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 2,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 3,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 4,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 5,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 6,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 7,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 8,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
];

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
    email: ''
  })

  useEffect(() => {
    /*callGetCompanies(); */
  }, []);

  const abi = require('../../abi/ActorsRegistration.json').abi;
  const actorContract = new web3.eth.Contract(abi, actorContractAddress);

  const callGetCompanies = () => {
    actorContract.methods.getCompaniesCount().call()
      .then((companiesCount) => {
        for (let i = 0; i < companiesCount; i++) {
          actorContract.methods.contracts(i).call()
            .then((cif) => {
              CutterApi.getCutterByCif()
                .then((cutter) => {
                  setCutters(cutters => cutters.concat(cutter));
                })
            });
        }
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

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
              <FormGroup controlId='name-9'>
                <Form.ControlLabel>Company name</Form.ControlLabel>
                <Form.Control name="name" />
                <Form.HelpText>Required</Form.HelpText>
              </FormGroup>
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal} appearance="primary">
              Ok
            </Button>
            <Button onClick={closeModal} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className={styles.search}>
        <InputGroup inside>
          <AutoComplete data={data} placeholder='Search for cutting company name or CIF' />
          <InputGroup.Addon>
            <Search />
          </InputGroup.Addon>
        </InputGroup>
      </div>

      <Content className={styles.content}>
        <List hover bordered className={styles.list}>
          {data.map((item, index) => (
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