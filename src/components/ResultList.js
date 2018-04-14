import React from "react";

const ResultList = props => (
  <div className="imageDiv">
    {props.results.map(result => (
      <div className="imageDiv-item" key={result.id}>
        <img
          alt={result.title}
          id={result.id}
          className="img-fluid"
          src={result.image}
          onClick={props.handleClickEvent}
        />
      </div>
    ))}
  </div>
);

export default ResultList;
