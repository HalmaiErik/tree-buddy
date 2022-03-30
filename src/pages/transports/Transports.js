import styles from './Transports.module.css'
import { List, FlexboxGrid } from 'rsuite';
import { AiOutlineCar } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { AutoComplete,  InputGroup } from 'rsuite';
import Search from '@rsuite/icons/Search';
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

const Transports = () => {

  let navigate = useNavigate();

  return (
    <>
      <h2 className={styles.pageTitle}>Transportation contracts</h2>
      
      <div className={styles.search}>
            <InputGroup inside>
              <AutoComplete data={data} placeholder='Search for transport contract hash, car number plate or cutting company CIF' />
              <InputGroup.Addon>
                <Search />
              </InputGroup.Addon>
            </InputGroup>
      </div>

      <div className={styles.content}>
        <List hover bordered className={styles.list}>
          {data.map((item, index) => (
            <List.Item key={item['hash']} index={index + 1} onClick={() => {navigate("/transport/" + item['hash'])}}>
              {/* hash, departure time, car */}
              <FlexboxGrid className={styles.flex}>
                <FlexboxGrid.Item colspan={6} className={styles.center} style={{ flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
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
                <FlexboxGrid.Item colspan={4} className={styles.center}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Cutter CIF</div>
                    <div className={styles.dataText}>{item['cif']}</div>
                  </div>
                </FlexboxGrid.Item>

                {/* transported trees */}
                <FlexboxGrid.Item colspan={4} className={styles.center}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Transported trees</div>
                    <div className={styles.dataText}>{item['nrTrees']}</div>
                  </div>
                </FlexboxGrid.Item>

                {/* start location */}
                <FlexboxGrid.Item colspan={5} className={styles.center}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Start location</div>
                    <div className={styles.dataText}>{item['startLocation']}</div>
                  </div>
                </FlexboxGrid.Item>

                {/* destination */}
                <FlexboxGrid.Item colspan={5} className={styles.center}>
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
    </>
  )
}

export default Transports