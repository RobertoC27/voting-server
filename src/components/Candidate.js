import React from 'react';

const candidate = (props) => {
    return (
        <div className="card w-auto">
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.votes}</p>
                <button type="button" class="btn btn-primary">Votar</button>
            </div>
        </div>
    );
}

export default candidate;


