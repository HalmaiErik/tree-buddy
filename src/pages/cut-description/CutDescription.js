import styles from './CutDescription.module.css';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import web3, { actorContract, cuttingContract, transportContract } from '../../web3'
import CutOverview from '../../components/overviews/cut-overview/CutOverview';
import { useEffect, useState } from 'react';
import TransportsList from '../../components/lists/transports/TransportsList';
import { Button, Loader, Modal, toaster } from 'rsuite';
import { successNotification, errorNotification, loadingNotification } from '../../common/notifications/notifications';
import TransportForm from '../../components/forms/TransportForm';
import { getAccount } from '../../components/header/MetamaskConnection/MetamaskConnection';
import { clientUrl } from '../../common/constants/client-url';

const CutDescription = () => {

    const [cutInfo, setCutInfo] = useState({
        company: '',
        agreedNrTrees: 0,
        location: '',
        startTime: 0,
        nrCutTrees: 0,
        hash: ''
    });
    const [transports, setTransports] = useState([]);

    const [cutInfoFetched, setCutInfoFetched] = useState(false);
    const [transportsFetched, setTransportsFetched] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);

    const [resultHash, setResultHash] = useState('');

    const [isCutOwnedByAccount, setIsCutOwnedByAccount] = useState(false);
    const [isForester, setIsForester] = useState(false);

    let { hash } = useParams();

    useEffect(() => {
        getCutInfo();
        getTransports();
        checkIfForester();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openResultModal = (hash) => {
        setResultHash(hash);
        setIsResultModalOpen(true);
    };

    const closeResultModal = () => {
        setIsResultModalOpen(false);
    };

    const reloadCutInfo = () => {
        setCutInfoFetched(false);
        getCutInfo();
    }

    const reloadTransports = () => {
        setTransportsFetched(false);
        setTransports([]);
        getTransports();
    };
    
    const checkIfForester = () => {
        getAccount().then(account => {
            actorContract.methods.foresters(account).call()
            .then(resp => {
                setIsForester(resp);
            });
        });
    }

    const getCutInfo = () => {
        cuttingContract.methods.contractInfo(hash).call()
            .then(cutInfo => {
                actorContract.methods.companyInfo(cutInfo.tin).call()
                    .then(info => {
                        getAccount().then(account => {
                            actorContract.methods.addressCompany(account).call()
                                .then(accountCif => {
                                    setIsCutOwnedByAccount(accountCif == cutInfo.tin);

                                    setCutInfo({
                                        company: info.name,
                                        agreedNrTrees: cutInfo[1],
                                        location: cutInfo[2],
                                        startTime: cutInfo[3],
                                        nrCutTrees: cutInfo[4],
                                        hash: hash
                                    });
                                    setCutInfoFetched(true);
                                });
                        });
                    });
            });
    };

    const getTransports = () => {
        transportContract.methods.getCuttingContractTransportHashesCount(hash).call()
            .then(count => {
                for (let i = 0; i < count; i++) {
                    transportContract.methods.cuttingContractTransportHashes(hash, i).call()
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
                setTransportsFetched(true);
            });
    };

    const requestCut = async () => {
        const accounts = await web3.eth.getAccounts();
        cuttingContract.methods.cut(hash).send({
            from: accounts[0]
        }).on('error', (e) => {
            toaster.push(errorNotification(e), { placement: 'bottomEnd' });
        }).on('transactionHash', (txHash) => {
            toaster.push(loadingNotification(txHash), { placement: 'bottomEnd' });
        }).then(() => {
            toaster.push(successNotification('Cut authorized'), { placement: 'bottomEnd' });
            reloadCutInfo();
        }).catch((e) => {
            toaster.push(errorNotification(e), { placement: 'bottomEnd' });
        });
    };

    return (
        <div className={styles.content}>
            <div className={styles.center}>
                <QRCodeCanvas value={window.location.href} className={styles.qrcode} />
            </div>

            {
                cutInfoFetched ?
                    isCutOwnedByAccount && <Button className={styles.cutBtn} appearance='ghost' onClick={requestCut}>+ Request cut</Button>
                    :
                    <Loader size='lg' backdrop content="loading..." vertical />
            }

            <div className={styles.descriptionContent}>
                {
                    cutInfoFetched ?
                        <CutOverview cutInfo={cutInfo} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }
            </div>

            <div className={styles.transportsContent}>
                <div className={styles.descriptionTitle}>Associated transport contracts</div>
                { isForester && <Button className={styles.addBtn} appearance='ghost' onClick={openModal}>+ Create transport contract</Button> }
                <Modal overflow={false} size='md' open={isModalOpen} onClose={closeModal}>
                    <Modal.Header>
                        <Modal.Title>Create transport contract</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TransportForm closeModal={closeModal} openResultModal={openResultModal} reload={reloadTransports} givenCif='' givenCar=''
                            givenCuts={[{ label: hash, value: hash }]} />
                    </Modal.Body>
                    <Modal.Footer />
                </Modal>

                <Modal overflow={false} size='md' open={isResultModalOpen} onClose={closeResultModal}>
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
                    transportsFetched ?
                        <TransportsList transports={transports} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }
            </div>
        </div>
    )
}

export default CutDescription