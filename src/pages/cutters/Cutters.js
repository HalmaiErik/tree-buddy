import styles from './Cutters.module.css';
import { List, FlexboxGrid, Content } from 'rsuite';
import { IoLocationOutline } from 'react-icons/io5';
import { AutoComplete,  InputGroup } from 'rsuite';
import Search from '@rsuite/icons/Search';
import { useNavigate } from 'react-router-dom';

const data = [
  {
    id: 0,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 1,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 2,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 3,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 4,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 5,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 6,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 7,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
  {
    id: 8,
    cif: '12345',
    name: 'ABC SRL',
    registrationTime: '03/05/2021',
    description: 'ABC SRL is a nice company',
    location: 'Bdul. Muncii 18 Jud. CLUJ, Loc. CLUJ NAPOCA',
    phone: '0746103795',
    email: 'contact@abc.ro'
  },
];

const Cutters = () => {

  let navigate = useNavigate();

  return (
    <>
      <h2 className={styles.pageTitle}>Cutting companies</h2>

      <div className={styles.search}>
        <InputGroup inside>
          <AutoComplete data={data} placeholder='Search for cutting company name or CIF' />
          <InputGroup.Addon>
            <Search />
          </InputGroup.Addon>
        </InputGroup>
      </div>

      <Content className={styles.content}>
        <List hover bordered className={styles.list}>
          {data.map((item, index) => (
            <List.Item key={item['cif']} index={index + 1} onClick={() => {navigate("/cutter/" + item['cif'])}}>
              {/* name, location */}
              <FlexboxGrid className={styles.flex}>
                <FlexboxGrid.Item colspan={6} className={styles.center} style={{ flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
                  <div className={styles.titleText}>{item['name']}</div>
                  <div className={styles.slimText}>
                    <div>
                      <IoLocationOutline />
                      {' ' + item['location']}
                    </div>
                  </div>
                </FlexboxGrid.Item>

                {/* cif */}
                <FlexboxGrid.Item colspan={6} className={styles.center}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>CIF</div>
                    <div className={styles.dataText}>{item['cif']}</div>
                  </div>
                </FlexboxGrid.Item>

                {/* email */}
                <FlexboxGrid.Item colspan={6} className={styles.center}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Email</div>
                    <div className={styles.dataText}>{item['email']}</div>
                  </div>
                </FlexboxGrid.Item>

                {/* phone */}
                <FlexboxGrid.Item colspan={6} className={styles.center}>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.slimText}>Phone</div>
                    <div className={styles.dataText}>{item['phone']}</div>
                  </div>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          ))}
        </List>
      </Content>
    </>
  )
}

export default Cutters