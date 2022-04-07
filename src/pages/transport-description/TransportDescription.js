import styles from './TransportDescription.module.css';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { List, FlexboxGrid, Divider } from 'rsuite';
import { AiOutlineCar } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';

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
      }
]

const TransportDescription = () => {

    let { hash } = useParams();
    let navigate = useNavigate();

    return (
        <div className={styles.content}>
            <div className={styles.center}>
                <QRCodeCanvas value={window.location.href} className={styles.qrcode} />
                <div className={styles.titleText}>{hash}</div>
            </div>

            <div className={styles.descriptionContent}>
                <div className={styles.descriptionTitle}>Transport contract description</div>

                <div className={styles.descriptionTable}>
                    <table style={{ 'marginLeft': 'auto', 'marginRight': 'auto' }}>
                        <tr>
                            <td width='600' className={styles.descriptionRowUp}>
                                <div className={styles.slimText}>Cutting Company</div>
                                <div className={styles.dataText}>ABCDEFGHIJ IMPEX SRL</div>
                            </td>
                            <td width='600' className={styles.descriptionRowUp}>
                                <div className={styles.slimText}>Company CIF</div>
                                <div className={styles.dataText}>12345</div>
                            </td>
                            <td className={styles.descriptionRowUp}>
                                <div className={styles.slimText}>Car</div>
                                <div className={styles.dataText}>CJ77EXH</div>
                            </td>
                        </tr>

                        <tr>
                            <td width='600' className={styles.descriptionRowUp}>
                                <div className={styles.slimText}>Departure Time</div>
                                <div className={styles.dataText}>31/03/2022 15:32:00</div>
                            </td>
                            <td width='600' className={styles.descriptionRowUp}>
                                <div className={styles.slimText}>From</div>
                                <div className={styles.dataText}>Cluj-Napoca, Faget</div>
                            </td>
                            <td className={styles.descriptionRowUp}>
                                <div className={styles.slimText}>To</div>
                                <div className={styles.dataText}>Brasov, Depozit</div>
                            </td>
                        </tr>

                        <tr>
                            <td width='600'>
                                <div className={styles.slimText}>Nr. transported trees</div>
                                <div className={styles.dataText}>60</div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div className={styles.cuttingContract}>
                <div className={styles.descriptionTitle}>Associated cutting contract</div>

                <div className={styles.contractInfo}>
                    {data.map((item, index) => (
                        <div onClick={() => { navigate("/cut/" + item['hash']) }}>
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TransportDescription