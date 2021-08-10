import web3Utils from 'web3-utils';


export const getBalance = async (ethereum, address) => {
    const balance = await ethereum.request({
        method: 'eth_getBalance', 
        "params": [address, 'latest']
    });

    const finalBalance = web3Utils.hexToNumberString(balance);

    return web3Utils.fromWei(finalBalance, 'ether');
}


export const getNetwork = async (ethereum, chainIdOut) => {
    let chainIdLocal;

    if (chainIdOut) {
        chainIdLocal = chainIdOut;
        
    } else {
        const chainId = await ethereum.request({
            method: 'eth_chainId'
        });

        chainIdLocal = chainId;
    }

    const result = await new Promise(resolve => {
        switch (chainIdLocal) {
            case '0x1':
                resolve(['Mainnet', 'ETH']);
                break;
            case '0x3':
                resolve(['Ropsten', 'ROP']);
                break;
            case '0x2a':
                resolve(['Kovan', 'KOV']);
                break;
            case '0x4':
                resolve(['Rinkeby', 'RIN']);
                break;
            case '0x5':
                resolve(['Goerli', 'GoETH']);
                break;
            default:
                resolve(['']);
                break;
        }
    });

    return result;
}


export const getData = async (ethereum, accountsOut) => {
    if (accountsOut) {
        const [network, symbol] = await getNetwork(ethereum);
        return [accountsOut[0], network, symbol];

    } else {
        const accounts = await ethereum.request({
            method: 'eth_accounts'
        });

        if (accounts[0]) {
            const [network, symbol] = await getNetwork(ethereum);
            return [accounts[0], network, symbol];

        } else {
            return false;
        }
    }
}