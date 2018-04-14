import React from "react";

const SearchForm = props => (

<div className="card text-black searchDisplay">
  <div className="card-body">
    <form>
      <div className="form-group">
        <label htmlFor="search" className="searchDisplayTitle">Search:</label>
        <input
          onChange={props.handleInputChange}
          value={props.search}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search for a Gif"
          id="search"
        />
        <button
          onClick={props.handleFormSubmit}
          className="btn searchButton"
        >
          Search
        </button>
      </div>
    </form>
  </div>
</div>
);

export default SearchForm;
