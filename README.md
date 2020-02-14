tbtc-starter-dapp
=================

A (very) basic starter template for using [tbtc.js](https://github.com/keep-network/tbtc.js) in a dApp. Built using React with react-scripts.

## Setup instructions

 1. Clone the repo - `git clone https://github.com/liamzebedee/tbtc-starter-dapp`
 2. Install dependencies.
    ```
    cd tbtc-starter-dapp/
    npm install
    ```
 2. Build tbtc.js. This is a temporary step, while we iron out some creases 😊 
    ```
    git clone https://github.com/liamzebedee/tbtc.js
    cd tbtc.js
    npm install && npm run build
    cd ..
    ln -s tbtc.js/ src/tbtc.js
    ```
 3. Run `npm run start` and visit [http://localhost:3000](http://localhost:3000).

MIT license.