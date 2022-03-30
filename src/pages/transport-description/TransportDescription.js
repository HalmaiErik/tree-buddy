import styles from './TransportDescription.module.css';
import { useParams } from 'react-router-dom';

const TransportDescription = () => {

    let { hash } = useParams();

    return (
        <div>TransportDescription</div>
    )
}

export default TransportDescription