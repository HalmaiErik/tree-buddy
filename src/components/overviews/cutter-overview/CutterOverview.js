import styles from './CutterOverview.module.css'
import { Grid, Row, Col, Panel } from 'rsuite'

const CutterOverview = ({ cutterInfo, cutterAddress }) => {
    return (
        <Panel header='Cutter overview' bordered bodyFill className={styles.panel}>
            <Grid fluid>
                <Row className={styles.addressRow}>
                    <Col md={24}>
                        <div className={styles.slimText}>Wallet address</div>
                        <div>{cutterAddress}</div>
                    </Col>
                </Row>

                <Row className={styles.descriptionRow}>
                    <Col md={24}>
                        <div className={styles.slimText}>Description</div>
                        <div>{cutterInfo.description}</div>
                    </Col>
                </Row>

                <Row className={styles.infoRow}>
                    <Col md={8}>
                        <div className={styles.slimText}>Location</div>
                        <div>{cutterInfo.location}</div>
                    </Col>
                    <Col md={4}>
                        <div className={styles.slimText}>Phone</div>
                        <div>{cutterInfo.phone}</div>
                    </Col>
                    <Col md={6} style={{ textAlign: 'right' }}>
                        <div className={styles.slimText}>Email</div>
                        <div>{cutterInfo.email}</div>
                    </Col>
                    <Col md={6} style={{ textAlign: 'right' }}>
                        <div className={styles.slimText}>Registration date</div>
                        <div >{cutterInfo.registrationTime}</div>
                    </Col>
                </Row>
            </Grid>
        </Panel>
    )
}

export default CutterOverview