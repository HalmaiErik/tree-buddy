import styles from './CutterDescription.module.css';
import { useParams } from 'react-router-dom';
import { List, FlexboxGrid } from 'rsuite';
import { IoLocationOutline } from 'react-icons/io5';
import { BsCalendarDate } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';


const data = [
    {
        hash: '0x1e2A66efB426D148dA4E9B73c11119eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 245,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c77779eb748d9999',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 400,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d7777',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 400,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 100,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 400,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 245,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 125,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 245,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 245,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 245,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 245,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 245,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 245,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 245,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    },
    {
        hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
        company: 'ABC SRL',
        cif: '12345',
        agreedNrTrees: 400,
        cutTrees: 245,
        location: 'Cluj-Napoca, Faget',
        parcel: 6,
        date: '2017.10.13 14:50',
    }
];

const CutterDescription = () => {

    let { cif } = useParams();
    let navigate = useNavigate();

    return (
        <div className={styles.content}>
            <div className={styles.center}>
                <h2 className={styles.companyName}>ABCDEFGHIJKL SRL IMPEX</h2>
            </div>

            <div className={styles.descriptionContent}>
                <div className={styles.descriptionTitle}>Cutting contract description</div>

                <div className={styles.descriptionTable}>
                    <table style={{ 'marginLeft': 'auto', 'marginRight': 'auto' }}>
                        <tr>
                            <td width='600' className={styles.descriptionRowUp}>
                                <div className={styles.slimText}>Company</div>
                                <div className={styles.dataText}>ABCDEFGHIJ IMPEX SRL</div>
                            </td>
                            <td width='600' className={styles.descriptionRowUp}>
                                <div className={styles.slimText}>Company CIF</div>
                                <div className={styles.dataText}>12345</div>
                            </td>
                            <td width='100' className={styles.descriptionRowUp}>
                                <div className={styles.slimText}>Date created</div>
                                <div className={styles.dataText}>31/03/2022</div>
                            </td>
                        </tr>

                        <tr>
                            <td width='600'>
                                <div className={styles.slimText}>Location</div>
                                <div className={styles.dataText}>Hello</div>
                            </td>
                            <td width='600'>
                                <div className={styles.slimText}>Agreed nr. trees</div>
                                <div className={styles.dataText}>450</div>
                            </td>
                            <td>
                                <div className={styles.slimText}>Nr. cut trees</div>
                                <div className={styles.dataText}>364</div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div className={styles.transportsContent}>
                <div className={styles.descriptionTitle}>Transports of contract</div>

                <List hover bordered className={styles.list}>
                    {data.map((item, index) => (
                        <List.Item key={item['hash']} index={index + 1} onClick={() => { navigate("/cut/" + item['hash']) }}>
                            {/* hash, location & date */}
                            <FlexboxGrid className={styles.flex}>
                                <FlexboxGrid.Item colspan={6} className={styles.centerList} style={{ flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
                                    <div className={styles.titleText}>{item['hash'].substring(0, 6) + '...' + item['hash'].substring(20, 31)}</div>
                                    <div className={styles.slimText}>
                                        <div>
                                            <IoLocationOutline />
                                            {' ' + item['location']}
                                            {', Par: ' + item['parcel']}
                                        </div>
                                        <div>
                                            <BsCalendarDate />
                                            {' ' + item['date']}
                                        </div>
                                    </div>
                                </FlexboxGrid.Item>

                                {/* company */}
                                <FlexboxGrid.Item colspan={6} className={styles.centerList}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div className={styles.slimText}>Company</div>
                                        <div className={styles.dataText}>{item['company']}</div>
                                    </div>
                                </FlexboxGrid.Item>

                                {/* agreed trees */}
                                <FlexboxGrid.Item colspan={6} className={styles.centerList}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div className={styles.slimText}>Agreed nr. trees</div>
                                        <div className={styles.dataText}>{item['agreedNrTrees']}</div>
                                    </div>
                                </FlexboxGrid.Item>

                                {/* cut trees */}
                                <FlexboxGrid.Item colspan={6} className={styles.centerList}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div className={styles.slimText}>Cut nr. trees</div>
                                        <div className={styles.dataText}>
                                            {item['cutTrees'] < item['agreedNrTrees'] ? <span style={{ color: '#429321' }}>{item['cutTrees']}</span> : <span>{item['cutTrees']}</span>}
                                        </div>
                                    </div>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </List.Item>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default CutterDescription