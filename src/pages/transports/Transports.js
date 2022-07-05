import styles from './Transports.module.css'
import { Loader, Button, Modal, InputGroup, Input } from 'rsuite';
import Search from '@rsuite/icons/Search';
import { useState, useEffect } from 'react';
import { actorContract, transportContract} from '../../web3';
import TransportForm from '../../components/forms/TransportForm';
import TransportsList from '../../components/lists/transports/TransportsList';
import { QRCodeCanvas } from 'qrcode.react';
import { clientUrl } from '../../common/constants/client-url';
import { getAccount } from '../../components/header/MetamaskConnection/MetamaskConnection';

const Transports = () => {

    const [transports, setTransports] = useState([]);
    const [searchedTransports, setSearchedTransports] = useState([]);
    const [transportsFetched, setTransportsFetched] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);

    const [resultHash, setResultHash] = useState('');

    const [isForester, setIsForester] = useState(false);

    useEffect(() => {
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

    const reload = () => {
        setTransportsFetched(false);
        setTransports([]);
        setSearchedTransports([]);
        getTransports();
    }

    const checkIfForester = () => {
        getAccount().then(account => {
            actorContract.methods.foresters(account).call()
            .then(resp => {
                setIsForester(resp);
            });
        });
    };

    const getTransports = () => {
        transportContract.methods.getAllContractsCount().call()
            .then(count => {
                for (let i = 0; i < count; i++) {
                    transportContract.methods.contractHashes(i).call()
                        .then(transportHash => {
                            transportContract.methods.contractInfo(transportHash).call()
                                .then(transport => {
                                    const trans = {
                                        hash: transportHash,
                                        nrTrees: transport[0],
                                        car: transport[1],
                                        cutHash: transport[2],
                                        departureTime: transport[3]
                                    };
                                    setTransports(transports => transports.concat(trans));
                                    setSearchedTransports(searchedTransports => searchedTransports.concat(trans));
                                });
                        });
                }
                setTransportsFetched(true);
            });
    };

    const searchHandler = (value) => {
        var lowerCase = value.toLowerCase();

        if (lowerCase === '') {
            setSearchedTransports(transports);
        }
        else {
            const filteredResults = transports.filter((transport) => {
                return transport.hash.startsWith(lowerCase);
            });

            setSearchedTransports(filteredResults);
        }
    };

    return (
        <>
            <h2 className={styles.pageTitle}>Transportation contracts</h2>

            <div className={styles.addButton}>
                { isForester && <Button appearance='ghost' onClick={openModal}>+ Create transport contract</Button> }
                <Modal overflow={false} size='md' open={isModalOpen} onClose={closeModal}>
                    <Modal.Header>
                        <Modal.Title>Create transport contract</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TransportForm closeModal={closeModal} openResultModal={openResultModal} reload={reload} givenCif='' givenCut='' givenCuts={[]} givenCar='' />
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
            </div>

            <div className={styles.search}>
                <InputGroup inside>
                    <Input placeholder='Search for transport contract hash' onChange={searchHandler} />
                    <InputGroup.Addon>
                        <Search />
                    </InputGroup.Addon>
                </InputGroup>
            </div>

            <div className={styles.content}>
                {
                    transportsFetched ?
                        <TransportsList transports={searchedTransports} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }
            </div>
        </>
    )
}

export default Transports