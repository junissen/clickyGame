import React from "react";

const CounterDisplay = props => (

    <div className="card text-black counterDisplay text-center">
        <div className="card-body">
            <h5 className="card-title counterDisplayTitle">Your Score</h5>
            <p className="card-text">{props.count}</p>
        </div>

    </div>
);

export default CounterDisplay;