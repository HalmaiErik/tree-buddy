import React, { useEffect, useState } from 'react';
import styles from './Cutters.module.css';
import { Content, Button, Modal, Loader } from 'rsuite';
import { AutoComplete, InputGroup } from 'rsuite';
import Search from '@rsuite/icons/Search';
import * as CutterApi from '../../services/rest/cutter-api';
import web3, { actorContract } from '../../web3';
import CuttersList from '../../components/lists/cutters/CuttersList';
import CutterForm from '../../components/forms/CutterForm';

const data = [];

const Cutters = () => {

  const [dataFetched, setDataFetched] = useState(false);
  const [cutters, setCutters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCutters();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const reload = () => {
    setDataFetched(false);
    getCutters();
  }

  const getCutters = () => {
    setCutters([]);
    actorContract.methods.getCompaniesCount().call()
      .then(companiesCount => {
        for (let i = 0; i < companiesCount; i++) {
          actorContract.methods.companies(i).call()
            .then(cif => {
              CutterApi.getCutterByCif(web3.utils.hexToAscii(cif))
                .then(cutter => {
                  setCutters(cutters => cutters.concat(cutter));
                })
            });
        }
        setDataFetched(true);
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
            <CutterForm closeModal={closeModal} reload={reload} />
          </Modal.Body>
          <Modal.Footer />
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
        {
          dataFetched ?
          <CuttersList cutters={cutters} />
          :
          <Loader size='lg' backdrop content="loading..." vertical />
        }
      </Content>
    </>
  )
}

export default Cutters