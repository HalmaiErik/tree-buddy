import CutsList from '../../components/lists/cuts/CutsList'
import styles from './CutterDashboard.module.css'
import { actorContract, cuttingContract, transportContract } from '../../web3';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'rsuite';
import TransportsList from '../../components/lists/transports/TransportsList';

const CutterDashboard = () => {

    const [cuts, setCuts] = useState([]);
    const [transports, setTransports] = useState([]);

    const [contractsFetched, setContractsFetched] = useState(false);

    useEffect(() => {
        getAssociatedContracts();
    }, []);

    let { address } = useParams();

    const getAssociatedContracts = () => {
        actorContract.methods.addressCompany(address).call()
            .then(cifHex => {
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
                                                    getCutTransports(contractHash);
                                                })
                                        });
                                });
                        }
                        if (count == 0) {
                            setContractsFetched(true);
                        }
                    });
            })
            .catch(() => {
                setContractsFetched(true);
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

    return (
        <div className={styles.content}>

            <div className={styles.transportsContent}>
                <div className={styles.descriptionTitle}>Cutting contracts</div>
                {
                    contractsFetched ?
                        <CutsList cuts={cuts} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }
            </div>

            <div className={styles.transportsContent}>
                <div className={styles.descriptionTitle}>Transport contracts</div>
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

export default CutterDashboard