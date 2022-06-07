import styles from './CuttersList.module.css';
import { List, FlexboxGrid } from 'rsuite';
import { useNavigate } from 'react-router-dom';

const CuttersList = (props) => {

  let navigate = useNavigate();

  return (
    <List hover bordered className={styles.list}>
      {props.cutters.map((item, index) => (
        <List.Item className={styles.listItem} key={item['cif']} index={index + 1} onClick={() => { navigate("/cutter/" + item['cif']) }}>
          {/* name, cif */}
          <FlexboxGrid className={styles.flex}>
            <FlexboxGrid.Item colspan={8} className={styles.center} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className={styles.titleText}>{item['name']}</div>
              <div className={styles.slimText}>
                <div>
                  {'CIF: ' + item['cif']}
                </div>
              </div>
            </FlexboxGrid.Item>

            {/* address */}
            <FlexboxGrid.Item colspan={8} className={styles.center}>
              <div style={{ textAlign: 'right' }}>
                <div className={styles.slimText}>Wallet address</div>
                <div className={styles.dataText}>{item['address'].substring(0, 5) + '...' + item['address'].substring(item['address'].length - 4)}</div>
              </div>
            </FlexboxGrid.Item>

            {/* phone */}
            <FlexboxGrid.Item colspan={8} className={styles.center}>
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