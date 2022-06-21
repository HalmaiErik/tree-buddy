import React, { useEffect, useState } from 'react';
import styles from './Cutters.module.css';
import { Content, Button, Modal, Loader } from 'rsuite';
import { InputGroup, Input } from 'rsuite';
import Search from '@rsuite/icons/Search';
import web3, { actorContract } from '../../web3';
import CuttersList from '../../components/lists/cutters/CuttersList';
import CutterForm from '../../components/forms/CutterForm';
import { getAccount } from '../../components/header/MetamaskConnection/MetamaskConnection';

const Cutters = () => {

    const [dataFetched, setDataFetched] = useState(false);
    const [cutters, setCutters] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchedCutters, setSearchedCutters] = useState([]);
    const [isForester, setIsForester] = useState(false);

    useEffect(() => {
        getCutters();
        checkIfForester();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const reload = () => {
        setDataFetched(false);
        setCutters([]);
        setSearchedCutters([]);
        getCutters();
    };

    const checkIfForester = () => {
        getAccount().then(account => {
            actorContract.methods.foresters(account).call()
            .then(resp => {
                setIsForester(resp);
            });
        });
    };

    const searchHandler = (value) => {
        var lowerCase = value.toLowerCase();

        if (lowerCase === '') {
            setSearchedCutters(cutters);
        }
        else {
            const filteredResults = cutters.filter((cutter) => {
                return cutter.cif.startsWith(lowerCase) || cutter.name.toLowerCase().startsWith(lowerCase);;
            });

            setSearchedCutters(filteredResults);
        }
    };

    const getCutters = () => {
        actorContract.methods.getCompaniesCount().call()
            .then(companiesCount => {
                for (let i = 0; i < companiesCount; i++) {
                    actorContract.methods.companies(i).call()
                        .then(cif => {
                            actorContract.methods.companyInfo(cif).call()
                                .then(info => {
                                    const cutter = {
                                        cif: web3.utils.hexToAscii(cif),
                                        name: info.name,
                                        phone: web3.utils.hexToAscii(info.phone),
                                        address: info.walletAddress
                                    };
                                    setCutters(cutters => cutters.concat(cutter))
                                    setSearchedCutters(searchedCutters => searchedCutters.concat(cutter));
                                });
                        });
                }
                setDataFetched(true);
            });
    };

    return (
        <>
            <h2 className={styles.pageTitle}>Cutting companies</h2>

            <div className={styles.addButton}>
                { isForester && <Button appearance='ghost' onClick={openModal}>+ Add cutter company</Button> }
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
                    <Input placeholder='Search for cutting company name or TIN' onChange={searchHandler} />
                    <InputGroup.Addon>
                        <Search />
                    </InputGroup.Addon>
                </InputGroup>
            </div>

            <Content className={styles.content}>
                {
                    dataFetched ?
                        <CuttersList cutters={searchedCutters} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }
            </Content>
        </>
    )
}

export default Cutters