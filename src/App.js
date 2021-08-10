import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Info from './components/Info/Info';
import Modal from './components/Modal/Modal';
import { getData, getNetwork, getBalance } from './utils/helpers';


function App() {
    const { ethereum } = window;

    const [state, setState] = useState({
        modal: false,
        address: '',
        balance: '',
        network: '',
        symbol: '',
        isMetaMaskInstall: false,
        isConnected: false
    });


    useEffect(() => {
        initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (state.address !== '') {
            getBalance(ethereum, state.address).then(
                result => {
                    setState(state => ({
                        ...state,
                        balance: result
                    }));
                }
            );
        } else {
            setState(state => ({
                ...state,
                balance: ''
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.address, state.network]);


    const initialize = () => {
        if (ethereum && ethereum.isMetaMask) {
            console.info('Metamask installed!');

            setState(state => ({
                ...state,
                isMetaMaskInstall: true
            }));

            getData(ethereum).then(result => {
                if (result) {
                    const [account, network, symbol] = result;

                    setState(state => ({
                        ...state,
                        address: account,
                        network,
                        symbol,
                        isConnected: true
                    }));

                } else {
                    setState(state => ({
                        ...state,
                        isConnected: false
                    }));
                }
            }).catch((error) => {
                console.log(error);
            });

            ethereum.on('chainChanged', (_chainId) => {
                getNetwork(ethereum, _chainId).then(result => {
                    const [network, symbol] = result;

                    setState(state => ({
                        ...state,
                        network,
                        symbol
                    }));
                });
            });
            
            ethereum.on('accountsChanged', (accounts) => {
                if (accounts[0]) {
                    setState(state => ({
                        ...state,
                        address: accounts[0]
                    }));
                } else {
                    setState(state => ({
                        ...state,
                        address: '',
                        network: '',
                        isConnected: false
                    }));
                }
            });

        } else {
            console.warn('Metamask not installed!');

            setState(state => ({
                ...state,
                isMetaMaskInstall: false
            }));
        }
    }


    const connectClickHandler = () => {
        if (state.isMetaMaskInstall) {

            ethereum.request({method: 'eth_requestAccounts'})
                .then(result => getData(ethereum, result))
                .then(result => {
                    const [account, network, symbol] = result;

                    setState(state => ({
                        ...state,
                        address: account,
                        network,
                        symbol,
                        isConnected: true
                    }));

                }).catch((error) => {
                    console.log(error);
                });

        } else {
            console.warn('Please install MetaMask!');
            setState(state => ({...state, modal: true}));
        }
    }


    const modalToogleHandler = () => {
        setState(state => ({...state, modal: !state.modal}));
    }


    return (
        <Fragment>
            <Header
                address={state.address}
                connected={state.isConnected}
                onClick={connectClickHandler}
            />
            <div className="container">
                <Info
                    data = {{
                        address: state.address,
                        balance: state.balance,
                        network: state.network,
                        symbol: state.symbol,
                        connected: state.isConnected
                    }}
                />
            </div>
            {state.modal && <Modal onClick={modalToogleHandler} />}
        </Fragment>
    );
}

export default App;
