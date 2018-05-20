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
    const algo = await voting_contract().deployed();
    this.setState({votes: algo.address.toString()})
    //const voting_instance = await voting_contract.deployed();
    //console.log(voting_instance);
    // const account = await this.getVotingAccount();
    // const candidates = await voting_instance.candidateListLength.call({from: account});
    // this.setState({candidates: candidates.toNumber()})
  }
  
  async initContract() {
    const my_instance = await voting_contract.deployed();
    return my_instance;
  }

  async getVotingAccount() {
    let accounts = await web3.eth.getAccounts();
    return accounts[0];
  }

  async getCandidates(account, contract_instance) {
    let candidates = []
    const raw_candidates = contract_instance.getCandidateList.call({from: account});
    return raw_candidates.map(candidate => web3.utils.hexToUtf8(candidate))
  }

  render() {
    return (
      <div className="App">
        <p>jeje salu2</p>
        <p>{web3.version}</p>
        <p>{this.state.votes}</p>
      </div>
    );
  }
}

export default App;
