import React, { Component } from 'react';
import voting_contract from './utils/voting_contract';
import web3 from './utils/web3latest';
import CandidateList from './components/CandidateList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {voting_instance: undefined, 
      candidates: [],
      account : '',
      allow_votes: true,
      show_results: false}
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
    this.setState({voting_instance, candidates:candidateVotes, account});
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

  async getCandidateVotes(account, contract_instance, candidate) {
    const votes = await contract_instance.totalVotesFor.call(candidate, {from: account});
    return votes.toNumber();
  }

  voteHandler = async (account, contract_instance, candidate) => {
    await contract_instance.voteForCandidate(candidate, {from: account});
    
    const updatedVotes = await this.getCandidateVotes(account, contract_instance, candidate);
    
    const candidates = [...this.state.candidates];
    
    const updatedCandidates = candidates.map(cand => {
      if (cand.name === candidate) {
        cand.votes = updatedVotes;
      }
      return cand
    });

    this.setState({
      ...this.state,
      candidates: updatedCandidates,
      allow_votes: false
    });
  }

  modalHandler() {
    const candidates = [...this.state.candidates];
    this.setState({
      ...this.state,
      candidates,
      allow_votes: true
    });
  }

  render() {
    const barStyle = {
      width: "80%",
      
    };
    const parentStyle = {
      position: 'absolute',
      width: '100%',
      top: '50%'
    }
    let candidates = <div className="progress" style={parentStyle}>
      <div className="progress-bar bg-success progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow="60"
        aria-valuemin="0"
        aria-valuemax="100"
        style={barStyle}>Conectando con el Blockchain</div>
    </div>;
    
    if(this.state.voting_instance !== undefined) {
      candidates = <CandidateList 
          voting_instance={this.state.voting_instance}
          account={this.state.account}
          candidates={this.state.candidates}
          voteHandler={this.voteHandler}
          allowVotes={this.state.allow_votes}
          modalHandler={this.modalHandler}/>
    }

    let resuls = null;
    let progressBar = null;
    return (
      <div className="App">{progressBar}{candidates}{resuls}</div>
    );
  }
}

export default App;
