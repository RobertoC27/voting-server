import Web3 from 'web3';

let web3latest;
if (typeof window.web3 !== 'undefined') {
    web3latest = new Web3(window.web3.currentProvider);
    console.log('Metamask');
} else {
    // If no injected web3 instance is detected, fallback to AWS instance (nodo-1).    
    var provider = new Web3.providers.HttpProvider('http://54.71.80.178:8989');
    console.log('AWS');
    web3latest = new Web3(provider)
}

export default web3latest;