import React from 'react';
import v4 from 'uuid-v4';
import Candidate from './Candidate';

const candidateList = (props) => {

    let candidates = null;
    let loading = 
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden={props.loading}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Conectando con el Blockchain</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">Emitiendo voto...</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-dismiss="modal">Lo entiendo</button>
                    </div>
                </div>
            </div>
        </div>;
    if(props.voting_instance !== undefined) {
        candidates = props.candidates.map((candidate, index) => {
            return (
                <Candidate
                    key={v4()}
                    name={candidate.name}
                    votes={candidate.votes}
                    voteHandler={() => props.voteHandler(props.account, props.voting_instance, candidate.name)}
                    allowVotes={props.allowVotes}
                    loading={props.loading} />
            )
        });
    }

    return (
        <div> {loading}{candidates} </div>
    );
}

export default candidateList;