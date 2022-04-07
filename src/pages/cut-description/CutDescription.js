import styles from './CutDescription.module.css';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { List, FlexboxGrid } from 'rsuite';
import { AiOutlineCar } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const data = [
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  },
  {
    hash: '0x1e2A66efB426D148dA4E9B73c18109eb748d74e2',
    nrTrees: 6,
    car: 'CJ77EXH',
    cif: '12345',
    departureTime: '17/03/2022 17:30:21',
    startLocation: 'Cluj-Napoca, Faget',
    destination: 'Brasov'
  }
]

const CutDescription = () => {

  let { hash } = useParams();
  let navigate = useNavigate();

  return (
    <div className={styles.content}>
      <div className={styles.center}>
        <QRCodeCanvas value={window.location.href} className={styles.qrcode} />
        <div className={styles.titleText}>{hash}</div>
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
            <List.Item key={item['hash']} index={index + 1} onClick={() => { navigate("/transport/" + item['hash']) }}>
              {/* hash, departure time, car */}
              <FlexboxGrid className={styles.flex}>
                <FlexboxGrid.Item colspan={6} className={styles.centerList} style={{ flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
                  <div className={styles.titleText}>{item['hash'].substring(0, 6) + '...' + item['hash'].substring(20, 31)}</div>
                  <div className={styles.slimText}>
                    <div>
                      <BsCalendarDate />
                      {' ' + item['departureTime']}
                    </div>
                    <div>
                      <AiOutlineCar />
                      {' ' + item['car']}
                    </div>
                  </div>
                </FlexboxGrid.Item>

                {/* company */}
                <FlexboxGrid.Item colspan={4} className={styles.centerList}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Cutter CIF</div>
                    <div className={styles.dataText}>{item['cif']}</div>
                  </div>
                </FlexboxGrid.Item>

                {/* transported trees */}
                <FlexboxGrid.Item colspan={4} className={styles.centerList}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Transported trees</div>
                    <div className={styles.dataText}>{item['nrTrees']}</div>
                  </div>
                </FlexboxGrid.Item>

                {/* start location */}
                <FlexboxGrid.Item colspan={5} className={styles.centerList}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Start location</div>
                    <div className={styles.dataText}>{item['startLocation']}</div>
                  </div>
                </FlexboxGrid.Item>

                {/* destination */}
                <FlexboxGrid.Item colspan={5} className={styles.centerList}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Destination</div>
                    <div className={styles.dataText}>{item['destination']}</div>
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

export default CutDescription