import React, { Component } from "react";
import shuffle from "shuffle-array";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import CounterDisplay from "./CounterDisplay";
import API from "../utils/API";

class SearchResultContainer extends Component {
  state = {
    search: "",
    results: [],
    count: 0
  };

  // When this component mounts, search the Giphy API for pictures of kittens
  componentDidMount() {
    this.searchGiphy("broad city");
    console.log("component mount");
  }

  searchGiphy = query => {
    API.search(query)
      .then(res => { this.createBeginningArrays(res.data.data) })
      .catch(err => console.log(err));
  };

  createBeginningArrays = resultsArray => {
    const clickedArray = []

    for (var i = 0; i < resultsArray.length; i ++ ) {
        var newObject = {
          id: resultsArray[i].id, 
          title: resultsArray[i].title,
          image: resultsArray[i].images.original.url,
          clicked: false}
        clickedArray.push(newObject)
    }

    this.setState({results: clickedArray});
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchGiphy(this.state.search);
  };

  handleClickEvent = event => {
    event.preventDefault();
    const idClicked = event.target.id;
    const newClickedArray = this.state.results;
    const newArray = [];

    for (var i = 0; i < newClickedArray.length; i ++ ){
      if (newClickedArray[i].id === idClicked) {

        if (newClickedArray[i].clicked) {
          console.log("already been clicked!");
          let newObjectTrue = this.createObjectItem(newClickedArray[i], true);
          newArray.push(newObjectTrue);
          this.handleFail();
        }

        else {
          let newObjectTrue = this.createObjectItem(newClickedArray[i], true);
          newArray.push(newObjectTrue);
          this.handleIncrement();
        }

      }

      else {
        let newObjectFalse = this.createObjectItem(newClickedArray[i], false);
        newArray.push(newObjectFalse)
      }
    }

    this.shuffleArray(newArray);
  }

  createObjectItem = (objectItem, clicked) => {
    var newObject = {
      id: objectItem.id,
      title: objectItem.title,
      image: objectItem.image,
      clicked: clicked
    };

    return newObject
  }

  shuffleArray = (array) => {
    this.setState({results: shuffle(array)})
  }

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1})
  };

  handleFail = () => {
    this.setState({ count: 0});
    this.searchGiphy("broad city");
    console.log(this.state.results)
  };

  render() {
    return (
      <div className="reactDiv">
        <div className="jumbotron text-white text-center">
          <h1 className="display-4 titleDisplay">Broad Giffy</h1>
          <p className="lead titleSub">
          Click on the Broad City images to increase your score, but don't click on the same one twice, or else you lose! 
            <br/>
          Feel free to play with your own gif category!
          </p>
        </div>
        <div className="row cardRow">
          <div className="col-1">
          </div>
          <div className="col-md-7 col-sm-10 col-10">
            <SearchForm
              search={this.state.search}
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
            />
          </div>
          <div className="col-md-2 col-sm-12 col-12">
            <CounterDisplay count={this.state.count} />
          </div>
          <div className="col-md-2 col-sm-1 col-1">
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center resultDisplay">
            <ResultList results={this.state.results} handleClickEvent={this.handleClickEvent}/>
          </div>
        </div> 
      </div>
    );
  }
}

export default SearchResultContainer;
