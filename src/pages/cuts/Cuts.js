import styles from './Cuts.module.css'
import { List, FlexboxGrid } from 'rsuite';
import { IoLocationOutline } from 'react-icons/io5';
import { BsCalendarDate } from "react-icons/bs";
import { AutoComplete,  InputGroup } from 'rsuite';
import Search from '@rsuite/icons/Search';
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

const Cuts = () => {

  let navigate = useNavigate();

  return (
    <>
     <h2 className={styles.pageTitle}>Cutting contracts</h2>
      
      <div className={styles.search}>
            <InputGroup inside>
              <AutoComplete data={data} placeholder='Search for cutting contract hash, cutting company name or CIF' />
              <InputGroup.Addon>
                <Search />
              </InputGroup.Addon>
            </InputGroup>
      </div>

      <div className={styles.content}>
        <List hover bordered className={styles.list}>
          {data.map((item, index) => (
            <List.Item key={item['hash']} index={index + 1} onClick={() => {navigate("/cut/" + item['hash'])}}>
              {/* hash, location & date */}
              <FlexboxGrid className={styles.flex}>
                <FlexboxGrid.Item colspan={6} className={styles.center} style={{ flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
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
                <FlexboxGrid.Item colspan={6} className={styles.center}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Company</div>
                    <div className={styles.dataText}>{item['company']}</div>
                  </div>
                </FlexboxGrid.Item>

                {/* agreed trees */}
                <FlexboxGrid.Item colspan={6} className={styles.center}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Agreed nr. trees</div>
                    <div className={styles.dataText}>{item['agreedNrTrees']}</div>
                  </div>
                </FlexboxGrid.Item>

                {/* cut trees */}
                <FlexboxGrid.Item colspan={6} className={styles.center}>
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
    </>
  )
}

export default Cuts