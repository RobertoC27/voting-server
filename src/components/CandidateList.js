import React from 'react';
import v4 from 'uuid-v4';
import Candidate from './Candidate';

const candidateList = (props) => {

    const style ={width: "75%"};

    let candidates = <div className="progress">
    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={style}>Obteniendo los candidatos</div>
  </div>;

    if(props.voting_instance !== undefined) {
        candidates = props.candidates.map((candidate, index) => {
            return (
                <Candidate
                    key={v4()}
                    name={candidate.name}
                    votes={candidate.votes}
                    voteHandler={() => props.voteHandler(props.account, props.voting_instance, candidate.name)} />
            )
        });
    }

    return (
        <div> {candidates} </div>
    );
}

export default candidateList;