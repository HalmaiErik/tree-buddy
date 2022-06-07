import styles from './CutsList.module.css';
import { List, FlexboxGrid } from 'rsuite';
import { IoLocationOutline } from 'react-icons/io5';
import { BsCalendarDate } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { convertEpochToDate } from '../../../common/util-funcs/epoch-convert';

const CutsList = (props) => {

    let navigate = useNavigate();

    return (
        <List hover bordered className={styles.list}>
            {props.cuts.map((item, index) => (
                <List.Item className={styles.listItem} key={item['hash']} index={index + 1} onClick={() => { navigate("/cut/" + item['hash']) }}>
                    {/* hash, location & date */}
                    <FlexboxGrid className={styles.flex}>
                        <FlexboxGrid.Item colspan={6} className={styles.centerList} style={{ flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
                            <div className={styles.titleText}>{item['hash'].substring(0, 4) + '...' + item['hash'].substring(item['hash'].length - 4)}</div>
                            <div className={styles.slimText}>
                                <div>
                                    <IoLocationOutline />
                                    {' ' + item['location']}
                                </div>
                                <div>
                                    <BsCalendarDate />
                                    {' ' + convertEpochToDate(item['startTime'])}
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
                                    {item['nrCutTrees'] < item['agreedNrTrees'] ? <span style={{ color: '#429321' }}>{item['nrCutTrees']}</span> : <span>{item['nrCutTrees']}</span>}
                                </div>
                            </div>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </List.Item>
            ))}
        </List>
    )
}

export default CutsList