import styles from './CuttersList.module.css';
import { List, FlexboxGrid } from 'rsuite';
import { IoLocationOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const CuttersList = (props) => {

  let navigate = useNavigate();

  return (
    <List hover bordered className={styles.list}>
      {props.cutters.map((item, index) => (
        <List.Item key={item['cif']} index={index + 1} onClick={() => { navigate("/cutter/" + item['cif']) }}>
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
  )
}

export default CuttersList