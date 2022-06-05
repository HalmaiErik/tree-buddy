import React from 'react'
import styles from './Home.module.css'
import Typical from 'react-typical'
import { Input, InputGroup } from 'rsuite'
import Search from '@rsuite/icons/Search'
import { useNavigate } from 'react-router-dom'
import web3, { cuttingContract, transportContract } from '../../web3';

const Home = () => {
    const data = [
        'HYPER Advertiser',
        'HYPER Web Analytics',
        'HYPER Video Analytics',
        'HYPER DMP',
        'HYPER Ad Serving',
        'HYPER Data Discovery'
    ];

    let navigate = useNavigate();

    const submitSearch = (e) => {
        if (e.key == 'Enter') {
            const searchVal = e.target.value;
            if (searchVal.length == 7) {
                navigate("/car/" + searchVal.toUpperCase());
            }
            else if (searchVal.length == 8) {
                navigate("/cutter/" + searchVal);
            }
            else if (searchVal.length == 66) {
                cuttingContract.methods.contractInfo(searchVal).call()
                    .then(contract => {
                        if (contract[0] != 0) {
                            navigate("/cut/" + searchVal);
                            return;
                        }
                    });
                transportContract.methods.contractInfo(searchVal).call()
                    .then(contract => {
                        if (contract[2] != 0) {
                            navigate("/transport/" + searchVal);
                        }
                    });
            }
        }
    }

    return (
        <div className={styles.content}>
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
                        <Input placeholder='Search for cutter CIF, transport vehicle number plate, cutting or transport contract hash' onKeyDown={submitSearch} />
                        <InputGroup.Addon>
                            <Search />
                        </InputGroup.Addon>
                    </InputGroup>
                </div>
            </div>
        </div>
    )
}

export default Home