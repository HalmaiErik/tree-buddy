import styles from './CutterDescription.module.css';
import { useParams } from 'react-router-dom';
import * as CutterApi from '../../services/rest/cutter-api';
import { useEffect, useState } from 'react';
import web3, { actorContract, cuttingContract, transportContract } from '../../web3';
import CutsList from '../../components/lists/cuts/CutsList';
import TransportsList from '../../components/lists/transports/TransportsList';
import { Button, Loader, Modal } from 'rsuite';
import CutterOverview from '../../components/overviews/cutter-overview/CutterOverview';
import CutForm from '../../components/forms/CutForm';
import TransportForm from '../../components/forms/TransportForm';

const CutterDescription = () => {

    const [cutterAddress, setcutterAddress] = useState('');
    const [cutterInfo, setCutterInfo] = useState({
        cif: '',
        name: '',
        registrationTime: '',
        description: '',
        location: '',
        phone: '',
        email: '',
    });
    const [cuts, setCuts] = useState([]);
    const [transports, setTransports] = useState([]);

    const [cutterInfoFetched, setCutterInfoFetched] = useState(false);
    const [cutsFetched, setCutsFetched] = useState(false);
    const [transportsFetched, setTransportsFetched] = useState(false);

    const [isCutModalOpen, setIsCutModalOpen] = useState(false);
    const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);

    useEffect(() => {
        getCutterInfo();
        getAssociatedContracts(true);
    }, [])

    let { cif } = useParams();
    const cifHex = web3.utils.asciiToHex(cif);

    const openCutModal = () => {
        setIsCutModalOpen(true);
    };
    const closeCutModal = () => {
        setIsCutModalOpen(false);
    };

    const openTransportModal = () => {
        setIsTransportModalOpen(true);
    };
    const closeTransportModal = () => {
        setIsTransportModalOpen(false);
    };

    const getCutterInfo = () => {
        actorContract.methods.cutterCompanies(cifHex).call()
            .then((address) => {
                setcutterAddress(address);
                CutterApi.getCutterByCif(cif)
                    .then((cutter) => {
                        setCutterInfo(cutter);
                        setCutterInfoFetched(true);
                    })
            })
    };

    const reloadCuts = () => {
        setCutsFetched(false);
        setCuts([]);
        getAssociatedContracts(false);
    }
    const reloadTransports = () => {
        setTransportsFetched(false);
        setTransports([]);
        getTransports();
    }

    const getAssociatedContracts = (refreshTransports) => {
        cuttingContract.methods.getCompanyContractHashesCount(cifHex).call()
            .then((count) => {
                for (let i = 0; i < count; i++) {
                    cuttingContract.methods.companyContractHashes(cifHex, i).call()
                        .then((contractHash) => {
                            cuttingContract.methods.contractInfo(contractHash).call()
                                .then((contract) => {
                                    CutterApi.getCutterName(cif)
                                        .then((cutterName) => {
                                            setCuts(cuts => cuts.concat({
                                                hash: contractHash,
                                                company: cutterName['name'],
                                                agreedNrTrees: contract[2],
                                                location: contract[3],
                                                startTime: contract[4],
                                                nrCutTrees: contract[5]
                                            }));
                                        });
                                });
                        });
                }
                setCutsFetched(true);

                if (refreshTransports) {
                    getTransports();
                }
            });
    };

    const getTransports = () => {
        cuts.forEach(cut => {
            transportContract.methods.getCuttingContractTransportHashesCount(cut.hash).call()
                .then(count => {
                    for (let i = 0; i < count; i++) {
                        transportContract.methods.cuttingContractTransportHashes(cut.hash, i).call()
                            .then(transportHash => {
                                transportContract.methods.contractInfo(transportHash).call()
                                    .then(transport => {
                                        setTransports(transports => transports.concat({
                                            hash: transportHash,
                                            nrTrees: transport[0],
                                            car: transport[1],
                                            cutHash: transport[2],
                                            departureTime: transport[3]
                                        }));
                                    });
                            });
                    }
                });
        });
        setTransportsFetched(true);
    };

    return (
        <div className={styles.content}>
            <div className={styles.center}>
                {cutterInfoFetched && <h2 className={styles.companyName}>{cutterInfo['name']}</h2>}
            </div>

            <div className={styles.descriptionContent}>

                {
                    cutterInfoFetched ?
                        <CutterOverview cutterInfo={cutterInfo} cutterAddress={cutterAddress} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }

            </div>

            <div className={styles.transportsContent}>
                <div className={styles.descriptionTitle}>Associated cutting contracts</div>
                <Button className={styles.addBtn} appearance='ghost' onClick={openCutModal}>+ Create cutting contract</Button>
                <Modal overflow={false} size='md' open={isCutModalOpen} onClose={closeCutModal}>
                    <Modal.Header>
                        <Modal.Title>Create cutting contract</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CutForm closeModal={closeCutModal} reload={reloadCuts} givenCif={cif} />
                    </Modal.Body>
                    <Modal.Footer />
                </Modal>

                {
                    cutsFetched ?
                        <CutsList cuts={cuts} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }
            </div>

            <div className={styles.transportsContent}>
                <div className={styles.descriptionTitle}>Transports of contract</div>
                <Button className={styles.addBtn} appearance='ghost' onClick={openTransportModal}>+ Create transport contract</Button>
                <Modal overflow={false} size='md' open={isTransportModalOpen} onClose={closeTransportModal}>
                    <Modal.Header>
                        <Modal.Title>Create transport contract</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TransportForm closeModal={closeTransportModal} reload={reloadTransports} givenCif={cif}
                            givenCuts={
                                cuts.map(cut => ({
                                    label: cut.hash,
                                    value: cut.hash
                                }))
                            } />
                    </Modal.Body>
                    <Modal.Footer />
                </Modal>

                {
                    transportsFetched ?
                        <TransportsList transports={transports} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }
            </div>
        </div>
    )
}

export default CutterDescription