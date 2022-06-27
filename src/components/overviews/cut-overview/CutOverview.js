import styles from './CutOverview.module.css'
import { Grid, Row, Col, Panel } from 'rsuite'
import { convertEpochToDate } from '../../../common/util-funcs/epoch-convert'

const CutOverview = ({ cutInfo }) => {
    return (
        <Panel header='Cut overview' bordered bodyFill className={styles.panel}>
            <Grid fluid>
                <Row className={styles.addressRow}>
                    <Col md={24}>
                        <div className={styles.slimText}>Cut hash</div>
                        <div style={{ wordBreak: 'break-word' }}>{cutInfo.hash}</div>
                    </Col>
                </Row>

                <Row className={styles.addressRow}>
                    <Col md={24}>
                        <div className={styles.slimText}>Company</div>
                        <div>{cutInfo.company}</div>
                    </Col>
                </Row>

                <Row className={styles.infoRow}>
                    <Col md={6}>
                        <div className={styles.slimText}>Location</div>
                        <div>{cutInfo.location}</div>
                    </Col>
                    <Col md={6}>
                        <div className={styles.slimText}>Creation time</div>
                        <div>{convertEpochToDate(cutInfo.startTime)}</div>
                    </Col>
                    <Col md={6} style={{ textAlign: 'right' }}>
                        <div className={styles.slimText}>Agreed nr. trees</div>
                        <div>{cutInfo.agreedNrTrees}</div>
                    </Col>
                    <Col md={6} style={{ textAlign: 'right' }}>
                        <div className={styles.slimText}>Cut nr. trees</div>
                        <div >{cutInfo.nrCutTrees}</div>
                    </Col>
                </Row>
            </Grid>
        </Panel>
    )
}

export default CutOverview