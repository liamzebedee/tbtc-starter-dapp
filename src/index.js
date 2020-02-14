import React, { useEffect, useState } from 'react'
import { render, hydrate } from 'react-dom'
import Web3 from 'web3'

import TBTC from 'tbtc.js'
// const TBTC = require('./tbtc.js/lib/TBTC').default

let web3
let tbtc

const ConnectWallet = ({ onConnected }) => {
    let [ethereumEnabled, setEthereumEnabled] = useState(false)
    let [state, setState] = useState()

    async function enableEthereum() {
        const address = await window.ethereum.enable()
        setState({
            address,
        })
        web3 = new Web3(window.ethereum)
        web3.eth.defaultAccount = window.ethereum.selectedAddress
        setEthereumEnabled(true)
        onConnected()
    }

    useEffect((ethereumEnabled) => {
        if(!ethereumEnabled) {
            enableEthereum()
        }
    }, [ethereumEnabled])

    return <div>
        {
            ethereumEnabled
            ? <span>Connected to {state.address}</span>
            : <button onClick={enableEthereum}>Enable ethereum</button>
        }
    </div>
}

const FundADepositExample = () => {
    let [state, setState] = useState({
        step: ''
    })

    let [btnState, setBtnState] = useState({
        text: 'Begin',
        disabled: false
    })
    
    async function begin() {
        const DepositFactory = await tbtc.DepositFactory
        const lotSizes = await DepositFactory.availableSatoshiLotSizes()
        setBtnState({ text: 'Begin', disabled: true })

        setState({ step: `1/3 Creating a deposit with lot size ${lotSizes[0]}` })
        const deposit = await DepositFactory.withSatoshiLotSize(lotSizes[0])

        setState({ step: `2/3 Getting the deposit's bitcoin address for funding` })
        const fundingAddress = await deposit.getBitcoinAddress()

        setState({ step: `3/3 Send ${lotSizes[0]} BTC to ${fundingAddress}` })
    }

    return <div>
        <h2>Create a deposit and fund it</h2>
        <button onClick={begin} disabled={btnState.disabled}>
            {btnState.text}
        </button>
        <p>
        {state.step}
        </p>
    </div>
}

const Examples = () => {
    let [tbtcLoaded, setTBTCLoaded] = useState(false)

    useEffect(async () => {
        console.log(`tbtc.js loaded: `, TBTC)
        
        tbtc = TBTC.configure({
            web3: web3,
            bitcoinNetwork: "testnet",
        })
        
        setTBTCLoaded(true)
    }, [])

    return <div>
        {
            tbtcLoaded === true
            ? <FundADepositExample/>
            : 'Loading tBTC.js'
        }
    </div>
}

const App = () => {
    const [ethereumEnabled, setEthereumEnabled] = useState(false)
    
    return <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
        </head>
        
        <body className='container'>
            <h1>tBTC.js Starter dApp</h1>

            <ConnectWallet onConnected={() => setEthereumEnabled(true)}/>
            { ethereumEnabled && <Examples/> }
        </body>
    </html>
}


// Render to DOM
window.addEventListener('load', () => {
    const rootElement = document.getElementById("root");
    render(<App />, rootElement)
})
  