import styles from './CutterDescription.module.css';
import { useParams } from 'react-router-dom';

const CutterDescription = () => {

    let { cif } = useParams();

    return (
        <div>CutterDescription</div>
    )
}

export default CutterDescription