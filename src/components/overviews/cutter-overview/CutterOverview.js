import styles from './CutterOverview.module.css'
import { Grid, Row, Col, Panel } from 'rsuite'

const CutterOverview = ({ cutterInfo }) => {
    return (
        <Panel header='Cutter overview' bordered bodyFill className={styles.panel}>
            <Grid fluid>
                <Row className={styles.addressRow}>
                    <Col md={24}>
                        <div className={styles.slimText}>Wallet address</div>
                        <div style={{ wordBreak: 'break-word' }}>{cutterInfo.walletAddress}</div>
                    </Col>
                </Row>

                <Row className={styles.addressRow}>
                    <Col md={24}>
                        <div className={styles.slimText}>TIN</div>
                        <div>{cutterInfo.cif}</div>
                    </Col>
                </Row>

                <Row className={styles.infoRow}>
                    <Col md={4}>
                        <div className={styles.slimText}>Phone</div>
                        <div>{cutterInfo.phone}</div>
                    </Col>
                </Row>
            </Grid>
        </Panel>
    )
}

export default CutterOverview