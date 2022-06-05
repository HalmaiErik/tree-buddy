import styles from './Car.module.css';
import { useParams } from 'react-router-dom';
import web3, { actorContract, transportContract } from '../../web3'
import { useEffect, useState } from 'react';
import TransportsList from '../../components/lists/transports/TransportsList';
import { Button, Loader, Modal } from 'rsuite';
import TransportForm from '../../components/forms/TransportForm';
import { getAccount } from '../../components/header/MetamaskConnection/MetamaskConnection';

const Car = () => {

    const [transports, setTransports] = useState([]);
    const [transportsFetched, setTransportsFetched] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isForester, setIsForester] = useState(false);

    let { car } = useParams();
    const carHex = web3.utils.asciiToHex(car);

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

    const reload = () => {
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
    };

    const getTransports = () => {
        transportContract.methods.getCarTransportHashesCount(carHex).call()
            .then(count => {
                for (let i = 0; i < count; i++) {
                    transportContract.methods.carTransports(carHex, i).call()
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

    return (
        <div className={styles.content}>
            <div className={styles.center}>
                <h2 className={styles.carNumberPlate}>{car}</h2>
            </div>

            <div className={styles.transportsContent}>
                <div className={styles.descriptionTitle}>Associated transport contracts</div>
                
                { isForester && <Button className={styles.addBtn} appearance='ghost' onClick={openModal}>+ Create transport contract</Button> }
                <Modal overflow={false} size='md' open={isModalOpen} onClose={closeModal}>
                    <Modal.Header>
                        <Modal.Title>Create transport contract</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TransportForm closeModal={closeModal} reload={reload} givenCif=''
                            givenCuts={[]} givenCar={car} />
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

export default Car