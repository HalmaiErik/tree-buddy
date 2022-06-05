import styles from './CutterDescription.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import web3, { actorContract, cuttingContract, transportContract } from '../../web3';
import CutsList from '../../components/lists/cuts/CutsList';
import TransportsList from '../../components/lists/transports/TransportsList';
import { Button, Loader, Modal } from 'rsuite';
import CutterOverview from '../../components/overviews/cutter-overview/CutterOverview';
import CutForm from '../../components/forms/CutForm';
import TransportForm from '../../components/forms/TransportForm';
import { QRCodeCanvas } from 'qrcode.react';
import { clientUrl } from '../../common/constants/client-url';
import { getAccount } from '../../components/header/MetamaskConnection/MetamaskConnection';

const CutterDescription = () => {

    const [cutterInfo, setCutterInfo] = useState({
        cif: '',
        name: '',
        registrationTime: '',
        description: '',
        location: '',
        phone: '',
        email: '',
        walletAddress: ''
    });
    const [cuts, setCuts] = useState([]);
    const [transports, setTransports] = useState([]);

    const [cutterInfoFetched, setCutterInfoFetched] = useState(false);
    const [contractsFetched, setContractsFetched] = useState(false);

    const [isCutModalOpen, setIsCutModalOpen] = useState(false);
    const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);
    const [isCutResultModalOpen, setIsCutResultModalOpen] = useState(false);
    const [isTransportResultModalOpen, setIsTransportResultModalOpen] = useState(false);

    const [resultHash, setResultHash] = useState('');

    const [isForester, setIsForester] = useState(false);

    useEffect(() => {
        getCutterInfo();
        getAssociatedContracts(true);
        checkIfForester();
    }, []);

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

    const openCutResultModal = (hash) => {
        setResultHash(hash);
        setIsCutResultModalOpen(true);
    };

    const closeCutResultModal = () => {
        setIsCutResultModalOpen(false);
    };

    const openTransportResultModal = (hash) => {
        setResultHash(hash);
        setIsTransportResultModalOpen(true);
    };

    const closeTransportResultModal = () => {
        setIsTransportResultModalOpen(false);
    };

    const getCutterInfo = () => {
        actorContract.methods.companyInfo(cifHex).call()
            .then(info => {
                setCutterInfo({
                    cif: cif,
                    name: info.name,
                    phone: web3.utils.hexToAscii(info.phone),
                    walletAddress: info.walletAddress
                });
                setCutterInfoFetched(true);
            });
    };

    const reloadCuts = () => {
        setContractsFetched(false);
        setCuts([]);
        getAssociatedContracts(false);
    };
    const reloadTransports = () => {
        setContractsFetched(false);
        setTransports([]);
        getAllTransports();
    };

    const checkIfForester = () => {
        getAccount().then(account => {
            actorContract.methods.foresters(account).call()
            .then(resp => {
                setIsForester(resp);
            });
        });
    };

    const getAssociatedContracts = (refreshTransports) => {
        cuttingContract.methods.getCompanyContractHashesCount(cifHex).call()
            .then(count => {
                for (let i = 0; i < count; i++) {
                    cuttingContract.methods.companyContractHashes(cifHex, i).call()
                        .then(contractHash => {
                            cuttingContract.methods.contractInfo(contractHash).call()
                                .then(contract => {
                                    actorContract.methods.companyInfo(cifHex).call()
                                        .then(info => {
                                            setCuts(cuts => cuts.concat({
                                                hash: contractHash,
                                                company: info.name,
                                                agreedNrTrees: contract[1],
                                                location: contract[2],
                                                startTime: contract[3],
                                                nrCutTrees: contract[4]
                                            }));

                                            if (refreshTransports) {
                                                getCutTransports(contractHash);
                                            }
                                            else {
                                                setContractsFetched(true);
                                            }
                                        });
                                });
                        });
                }
                if (count == 0) {
                    setContractsFetched(true);
                }
            });
    };

    const getCutTransports = (cutHash) => {
        transportContract.methods.getCuttingContractTransportHashesCount(cutHash).call()
            .then(count => {
                for (let i = 0; i < count; i++) {
                    transportContract.methods.cuttingContractTransportHashes(cutHash, i).call()
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
                setContractsFetched(true);
            });
    };

    const getAllTransports = () => {
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
        setContractsFetched(true);
    }

    return (
        <div className={styles.content}>
            <div className={styles.center}>
                {cutterInfoFetched && <h2 className={styles.companyName}>{cutterInfo['name']}</h2>}
            </div>

            <div className={styles.descriptionContent}>

                {
                    cutterInfoFetched ?
                        <CutterOverview cutterInfo={cutterInfo} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }

            </div>

            <div className={styles.transportsContent}>
                <div className={styles.descriptionTitle}>Associated cutting contracts</div>
                { isForester && <Button className={styles.addBtn} appearance='ghost' onClick={openCutModal}>+ Create cutting contract</Button> }
                <Modal overflow={false} size='md' open={isCutModalOpen} onClose={closeCutModal}>
                    <Modal.Header>
                        <Modal.Title>Create cutting contract</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CutForm closeFormModal={closeCutModal} reload={reloadCuts} givenCif={cif} openResultModal={openCutResultModal} />
                    </Modal.Body>
                    <Modal.Footer />
                </Modal>

                <Modal overflow={false} size='md' open={isCutResultModalOpen} onClose={closeCutResultModal}>
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

                {
                    contractsFetched ?
                        <CutsList cuts={cuts} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }
            </div>

            <div className={styles.transportsContent}>
                <div className={styles.descriptionTitle}>Associated transport contracts</div>
                { isForester && <Button className={styles.addBtn} appearance='ghost' onClick={openTransportModal}>+ Create transport contract</Button> }
                <Modal overflow={false} size='md' open={isTransportModalOpen} onClose={closeTransportModal}>
                    <Modal.Header>
                        <Modal.Title>Create transport contract</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TransportForm closeModal={closeTransportModal} openResultModal={openTransportResultModal} reload={reloadTransports} givenCif={cif}
                            givenCuts={
                                cuts.map(cut => ({
                                    label: cut.hash,
                                    value: cut.hash
                                }))
                            } />
                    </Modal.Body>
                    <Modal.Footer />
                </Modal>

                <Modal overflow={false} size='md' open={isTransportResultModalOpen} onClose={closeTransportResultModal}>
                    <Modal.Header>
                        <Modal.Title>Created transport contract</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <QRCodeCanvas value={clientUrl + '/transport/' + resultHash} className={styles.resultHash} />
                        <p>Contract hash: {resultHash}</p>
                        <p><i>Please make sure to screenshot the QR code!</i></p>
                    </Modal.Body>
                    <Modal.Footer />
                </Modal>

                {
                    contractsFetched ?
                        <TransportsList transports={transports} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }
            </div>
        </div>
    )
}

export default CutterDescription