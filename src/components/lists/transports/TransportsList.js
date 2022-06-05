import styles from './TransportsList.module.css';
import { List, FlexboxGrid } from 'rsuite';
import { BsCalendarDate } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import web3 from '../../../web3';
import { convertEpochToDate } from '../../../common/util-funcs/epoch-convert';

const TransportsList = (props) => {

    let navigate = useNavigate();

    return (
        <List hover bordered className={styles.list}>
            {props.transports.map((item, index) => (
                <List.Item key={item['hash']} index={index + 1} onClick={() => { navigate("/transport/" + item['hash']) }}>
                    {/* hash, departure time, car */}
                    <FlexboxGrid>
                        <FlexboxGrid.Item colspan={6} className={styles.centerList} style={{ flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
                            <div className={styles.titleText}>{item['hash'].substring(0, 6) + '...' + item['hash'].substring(item['hash'].length - 10)}</div>
                            <div className={styles.slimText}>
                                <div>
                                    <BsCalendarDate />
                                    {' ' + convertEpochToDate(item['departureTime'])}
                                </div>
                            </div>
                        </FlexboxGrid.Item>

                        {/* car */}
                        <FlexboxGrid.Item colspan={6} className={styles.centerList}>
                            <div style={{ textAlign: 'right' }}>
                                <div className={styles.slimText}>Vehicle nr. plate</div>
                                <div className={styles.dataText}>{web3.utils.hexToAscii(item['car'])}</div>
                            </div>
                        </FlexboxGrid.Item>

                        {/* transported trees */}
                        <FlexboxGrid.Item colspan={6} className={styles.centerList}>
                            <div style={{ textAlign: 'right' }}>
                                <div className={styles.slimText}>Transported trees</div>
                                <div className={styles.dataText}>{item['nrTrees']}</div>
                            </div>
                        </FlexboxGrid.Item>

                        {/* cut hash */}
                        <FlexboxGrid.Item colspan={6} className={styles.centerList}>
                            <div style={{ textAlign: 'right' }}>
                                <div className={styles.slimText}>Associated cutting contract</div>
                                <div className={styles.dataText}>{item['cutHash'].substring(0, 6) + '...' + item['cutHash'].substring(item['cutHash'].length - 10)}</div>
                            </div>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </List.Item>
            ))}
        </List>
    )
}

export default TransportsList