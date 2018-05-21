import React from 'react';
import Candidate from './Candidate';

const candidateList = (props) => {
    let candidates = null;

    if(props.candidates) {
        candidates = props.candidates.map(candidate => {
            return <Candidate name={candidate.name} votes={candidate.votes}/>
        });
    }
    
    return (
        <div>{candidates}</div>
    );
}

export default candidateList;