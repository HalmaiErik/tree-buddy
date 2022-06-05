import styles from './TransportDescription.module.css';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import web3, { actorContract, cuttingContract, transportContract } from '../../web3'
import { useEffect, useState } from 'react';
import { Loader} from 'rsuite';
import TransportOverview from '../../components/overviews/transport-overview/TransportOverview';
import CutsList from '../../components/lists/cuts/CutsList';

const TransportDescription = () => {

    const [transportInfo, setTransportInfo] = useState({
        nrTrees: 0,
        car: '',
        cutHash: '',
        departureTime: '',
        hash: ''
    });

    const [cut, setCut] = useState([]);

    const [transportInfoFetched, setTransportInfoFetched] = useState(false);
    const [cutFetched, setCutFetched] = useState(false);

    let { hash } = useParams();

    useEffect(() => {
        getTransportInfo();
    }, []);

    const getTransportInfo = () => {
        transportContract.methods.contractInfo(hash).call()
            .then(transport => {
                setTransportInfo({
                    nrTrees: transport[0],
                    car: transport[1],
                    cutHash: transport[2],
                    departureTime: transport[3],
                    hash: hash
                });
                setTransportInfoFetched(true);
                getCut(transport[2]);
            });
    };

    const getCut = (cutHash) => {
        cuttingContract.methods.contractInfo(cutHash).call()
            .then(cut => {
                actorContract.methods.companyInfo(cut[0]).call()
                    .then(info => {
                        setCut(cuts => cuts.concat({
                            hash: cutHash,
                            company: info.name,
                            agreedNrTrees: cut[1],
                            location: cut[2],
                            startTime: cut[3],
                            nrCutTrees: cut[4]
                        }));
                        setCutFetched(true);
                    });
            });
    };

    return (
        <div className={styles.content}>
            <div className={styles.center}>
                <QRCodeCanvas value={window.location.href} className={styles.qrcode} />
            </div>

            <div className={styles.descriptionContent}>
                {
                    cutFetched ?
                        <TransportOverview transportInfo={transportInfo} company={cut[0].company} location={cut[0].location} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }
            </div>

            <div className={styles.transportsContent}>
                <div className={styles.descriptionTitle}>Associated cutting contract</div>

                {
                    cutFetched ?
                        <CutsList cuts={cut} />
                        :
                        <Loader size='lg' backdrop content="loading..." vertical />
                }
            </div>
        </div>
    )
}

export default TransportDescription