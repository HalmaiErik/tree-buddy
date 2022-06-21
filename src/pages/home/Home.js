import React from 'react'
import styles from './Home.module.css'
import Typical from 'react-typical'
import { Input, InputGroup } from 'rsuite'
import Search from '@rsuite/icons/Search'
import { useNavigate } from 'react-router-dom'
import { cuttingContract, transportContract } from '../../web3';

const Home = () => {
    
    let navigate = useNavigate();

    const submitSearch = (e) => {
        if (e.key === 'Enter') {
            const searchVal = e.target.value;
            if (searchVal.length === 7) {
                navigate("/car/" + searchVal.toUpperCase());
                return;
            }
            else if (searchVal.length === 8) {
                navigate("/cutter/" + searchVal);
                return;
            }
            else if (searchVal.length === 66) {
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
                            return;
                        }
                    });
            }
            
            navigate("/notfound");
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.center}>
                <h1>The Forests' Dapp</h1>
                <h4 className={styles.inline}>
                    <Typical
                        loop={Infinity}
                        steps={[
                            'Validate transports', 2000,
                            'Check cutting & transport contracts', 2000,
                            'Inspect cutting firms', 2000
                        ]} />
                </h4>
                <p>In a trustworthy, immutable & decentralized form, using Ethereum blockchain</p>

                <div className={styles.search}>
                    <InputGroup inside>
                        <Input placeholder='Search for cutter TIN, transport vehicle number plate, cutting or transport contract hash' onKeyDown={submitSearch} />
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