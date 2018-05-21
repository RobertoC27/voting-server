import React, { Component } from 'react';
import voting_contract from './utils/voting_contract';
import web3 from './utils/web3latest';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {voting_instance: {}, 
      candidates: [],
      votes: [] }
  }
  
  async componentDidMount() {
    const voting_instance = await voting_contract(web3.currentProvider).deployed();

    const account = await this.getVotingAccount();

    const candidates = await this.getCandidates(account, voting_instance);

    const votes = await this.getVotes(account, voting_instance, candidates);

    this.setState({voting_instance, candidates, votes});
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
    return votes;
  }

  render() {
    return (
      <div className="App">
        <p>jeje salu2</p>
        <p>{web3.version}</p>
        <p>{this.state.votes}</p>
        <p>{this.state.candidates}</p>
      </div>
    );
  }
}

export default App;
