import styles from './Cuts.module.css'
import { Modal, Button, Loader, Input } from 'rsuite';
import { InputGroup } from 'rsuite';
import Search from '@rsuite/icons/Search';
import CutsList from '../../components/lists/cuts/CutsList';
import { useState, useEffect } from 'react';
import CutForm from '../../components/forms/CutForm';
import { actorContract, cuttingContract } from '../../web3';
import { QRCodeCanvas } from 'qrcode.react';
import { clientUrl } from '../../common/constants/client-url';
import { getAccount } from '../../components/header/MetamaskConnection/MetamaskConnection';

const Cuts = () => {

    const [cuts, setCuts] = useState([]);
    const [searchedCuts, setSearchedCuts] = useState([]);
    const [cutsFetched, setCutsFetched] = useState(false);

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);

    const [resultHash, setResultHash] = useState('');

    const [isForester, setIsForester] = useState(false);

    useEffect(() => {
        getCuts();
        checkIfForester();
    }, [])

    const openFormModal = () => {
        setIsFormModalOpen(true);
    };

    const closeFormModal = () => {
        setIsFormModalOpen(false);
    };

    const openResultModal = (hash) => {
        setResultHash(hash);
        setIsResultModalOpen(true);
    };

    const closeResultModal = () => {
        setIsResultModalOpen(false);
    };

    const reload = () => {
        setCutsFetched(false);
        setCuts([]);
        setSearchedCuts([]);
        getCuts();
    };

    const checkIfForester = () => {
        getAccount().then(account => {
            actorContract.methods.foresters(account).call()
            .then(resp => {
                setIsForester(resp);
            });
        });
    };

    const getCuts = () => {
        cuttingContract.methods.getAllContractsCount().call()
            .then(count => {
                for (let i = 0; i < count; i++) {
                    cuttingContract.methods.contractHashes(i).call()
                        .then(contractHash => {
                            cuttingContract.methods.contractInfo(contractHash).call()
                                .then(contract => {
                                    actorContract.methods.companyInfo(contract[0]).call()
                                        .then(info => {
                                            const cut = {
                                                hash: contractHash,
                                                company: info.name,
                                                agreedNrTrees: contract[1],
                                                location: contract[2],
                                                startTime: contract[3],
                                                nrCutTrees: contract[4]
                                            }
                                            setCuts(cuts => cuts.concat(cut));
                                            setSearchedCuts(searchedCuts => searchedCuts.concat(cut));
                                        });
                                });
                        });
                }
                setCutsFetched(true);
            });
    };

    const searchHandler = (value) => {
        var lowerCase = value.toLowerCase();

        if (lowerCase === '') {
            setSearchedCuts(cuts);
        }
        else {
            const filteredResults = cuts.filter((cut) => {
                return cut.hash.startsWith(lowerCase) || cut.location.toLowerCase().startsWith(lowerCase);
            });

            setSearchedCuts(filteredResults);
        }
    };

    return (
        <>
            <h2 className={styles.pageTitle}>Cutting contracts</h2>

            <div className={styles.addButton}>
                { isForester && <Button appearance='ghost' onClick={openFormModal}>+ Create cutting contract</Button> }
                <Modal overflow={false} size='md' open={isFormModalOpen} onClose={closeFormModal}>
                    <Modal.Header>
                        <Modal.Title>Create cutting contract</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CutForm closeFormModal={closeFormModal} reload={reload} openResultModal={openResultModal} givenCif='' />
                    </Modal.Body>
                    <Modal.Footer />
                </Modal>

                <Modal overflow={false} size='md' open={isResultModalOpen} onClose={closeResultModal}>
                    <Modal.Header>
                        <Modal.Title>Created cutting contract</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <QRCodeCanvas value={clientUrl + '/cut/' + resultHash} className={styles.resultHash} />
                        <p>Contract hash: {resultHash}</p>
                        <p><i>Please make sure to screenshot the QR code!</i></p>
                    </Modal.Body>
                    <Modal.Footer />
                </Modal>
            </div>

            <div className={styles.search}>
                <InputGroup inside>
                    <Input placeholder='Search for cutting contract hash or location' onChange={searchHandler}/>
                    <InputGroup.Addon>
                        <Search />
                    </InputGroup.Addon>
                </InputGroup>
            </div>

            <div className={styles.content}>
                {
                    cutsFetched ?
                        <CutsList cuts={searchedCuts} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }
            </div>
        </>
    )
}

export default Cuts