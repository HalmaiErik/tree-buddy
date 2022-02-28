import React from 'react'
import styles from './Home.module.css'
import Typical from 'react-typical'
import { AutoComplete, InputGroup, Input, Footer, Content } from 'rsuite'
import Search from '@rsuite/icons/Search'
import Trees from '../../trees2.png'

const Home = () => {
  const data = [
    'HYPER Advertiser',
    'HYPER Web Analytics',
    'HYPER Video Analytics',
    'HYPER DMP',
    'HYPER Ad Serving',
    'HYPER Data Discovery'
  ];

  return (
    <div>
      <Content className={styles.content}>
      <div className={styles.center}>
        <h1>The Forests' Dapp</h1>
        <h3 className={styles.inline}>
          <Typical
            loop={Infinity}
            steps={[
              'Examine the validity of each transport', 2000,
              'Check all the cutting & transport contracts', 2000,
              'Inspect all the cutting firms', 2000
            ]} />
        </h3>
        <p>All of this in a trustworthy, immutable & decentralized form, using Ethereum blockchain</p>

        <div className={styles.search}>
          <InputGroup inside>
            <AutoComplete data={data} placeholder='Search for transport car number plate, contract id, cutting firm cif, cutter or forester address' />
            <InputGroup.Addon>
              <Search />
            </InputGroup.Addon>
          </InputGroup>
        </div>
      </div>
      </Content>
      <Footer>
        <p style={{'textAlign': 'center'}}>© Erik Halmai 2022</p>
      </Footer>
    </div>
  )
}

export default Home