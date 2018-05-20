//import web3 from './web3latest';
// import votingArtifacts from './contracts/Voting.json';
// import contract from 'truffle-contract';

// const voting = contract(votingArtifacts);
// voting.setProvider(web3.currentProvider);

// export default voting;

import web3 from './web3latest';
import votingArtifacts from './contracts/Voting.json';
import contract from 'truffle-contract';

export default function buildVoting() {
    const voting = contract(votingArtifacts);
    voting.setProvider(web3.currentProvider);
    return fixTruffleContractCompatibilityIssue(voting);
}
// Workaround for a compatibility issue between web3@1.0.0-beta.29 and truffle-contract@3.0.3
// https://github.com/trufflesuite/truffle-contract/issues/57#issuecomment-331300494
function fixTruffleContractCompatibilityIssue(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function() {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
    return contract;
}