import styles from './TransportOverview.module.css';
import { Grid, Row, Col, Panel } from 'rsuite';
import { convertEpochToDate } from '../../../common/util-funcs/epoch-convert';

const TransportOverview = ({ transportInfo, company, location }) => {
    return (
        <Panel header='Transport overview' bordered bodyFill className={styles.panel}>
            <Grid fluid>
                <Row className={styles.addressRow}>
                    <Col md={24}>
                        <div className={styles.slimText}>Transport hash</div>
                        <div style={{ wordBreak: 'break-word' }}>{transportInfo.hash}</div>
                    </Col>
                </Row>

                <Row className={styles.addressRow}>
                    <Col md={24}>
                        <div className={styles.slimText}>Company</div>
                        <div>{company}</div>
                    </Col>
                </Row>

                <Row className={styles.addressRow}>
                    <Col md={24}>
                        <div className={styles.slimText}>Cut hash</div>
                        <div style={{ wordBreak: 'break-word' }}>{transportInfo.cutHash}</div>
                    </Col>
                </Row>

                <Row className={styles.infoRow}>
                    <Col md={8}>
                        <div className={styles.slimText}>Cut location</div>
                        <div>{location}</div>
                    </Col>
                    <Col md={8} style={{ textAlign: 'left' }}>
                        <div className={styles.slimText}>Departure time</div>
                        <div>{convertEpochToDate(transportInfo.departureTime)}</div>
                    </Col>
                    <Col md={8} style={{ textAlign: 'right' }}>
                        <div className={styles.slimText}>Nr. trees</div>
                        <div>{transportInfo.nrTrees}</div>
                    </Col>
                </Row>
            </Grid>
        </Panel>
    )
}

export default TransportOverview