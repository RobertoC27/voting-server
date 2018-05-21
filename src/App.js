import React, { Component } from 'react';
import voting_contract from './utils/voting_contract';
import web3 from './utils/web3latest';
import CandidateList from './components/CandidateList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {voting_instance: {}, 
      candidates: [],
      account : '' }
  }
  
  async componentDidMount() {
    const voting_instance = await voting_contract(web3.currentProvider).deployed();

    const account = await this.getVotingAccount();

    const candidates = await this.getCandidates(account, voting_instance);

    const votes = await this.getVotes(account, voting_instance, candidates);

    const candidateVotes = candidates.map((candidate, index) => {
      return {name: candidate,
              votes: votes[index]};
    })
    this.setState({voting_instance, candidates:candidateVotes, votes, account});
  }

  async getVotingAccount() {
    let accounts = await web3.eth.getAccounts();
    return accounts[0];
  }

  async getCandidates(account, contract_instance) {
    let cands = await contract_instance.getCandidateList.call({from: account});
    const candidates = cands.map(cand => web3.utils.hexToUtf8(cand));
    return candidates;
  }

  async getVotes(account, contract_instance, candidates) {
    const length =  candidates.length;
    let votes = [];
    
    for (let i = 0; i < length; i++)
      votes.push(await contract_instance.totalVotesFor.call(candidates[i], {from: account}));
    
    return votes.map(vote => vote.toNumber());
  }

  async getCandidateVotes(candidate, contract_instance, account) {
    const votes = await contract_instance.totalVotesFor.call(candidate, {from: account});
    return votes.toNumber();
  }

  render() {
    return (
      <div className="App">
        <CandidateList 
          voting_instace={this.state.voting_instance}
          account={this.state.account}
          candidates={this.state.candidates}/>
      </div>
    );
  }
}

export default App;
