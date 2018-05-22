import React from 'react';

const candidate = (props) => {
    let button = <button type="button" className="btn btn-primary"
                    data-toggle="modal" data-target="#exampleModalCenter" onClick={props.voteHandler}>Votar </button>;
    if(props.loading){
        button = <button type="button" className="btn btn-secondary"
                    onClick={props.voteHandler} disabled>Votar </button>;
    }
    return (
        <div className="card w-auto">
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                {button}
                <p className="card-text">Votos recibidos: {props.votes}</p>
            </div>
        </div>
    );
}

export default candidate;

