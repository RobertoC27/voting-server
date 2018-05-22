import React from 'react';

const candidate = (props) => {
    return (
        <div className="card w-auto">
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <button type="button" className="btn btn-primary" 
                onClick={props.voteHandler}>Votar </button>
                <p className="card-text">Votos recibidos: {props.votes}</p>
            </div>
        </div>
    );
}

export default candidate;


