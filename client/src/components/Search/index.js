import React, { Component } from "react";
import { Input, FormBtn, SaveBtn } from "../Form";
import { Col, Row } from "../Grid";
import Jumbotron from "../Jumbotron";
import { List, ListItem } from "../List";
import API from "../../utils/API";
import axios from "axios";
class Search extends Component {
  state = {
    search: "",
    result: []
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  apiSearch = event => {
    event.preventDefault();
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.search}`)
      .then(res => this.setState({ result: res.data.items }));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let id = event.target.id;
    API.saveBook({
      title: this.state.result[id].volumeInfo.title,
      authors: this.state.result[id].volumeInfo.authors[0],
      description: this.state.result[id].volumeInfo.description,
      image: this.state.result[id].volumeInfo.imageLinks.thumbnail,
      link: this.state.result[id].volumeInfo.infoLink
    })
      .then(res => alert(`${res.data.title} Has Been Saved to Your Book List.`))
      .catch(err => console.log(err));
    event.target.hidden = true;
  };

  render() {
    return (
      <div>
        <form>
          <Jumbotron>
            <h1>(React) Google Books Search</h1>
          </Jumbotron>
          <Input
            name="search"
            value={this.state.search}
            placeholder="Title (required)"
            onChange={this.handleInputChange}
          />
          <FormBtn disabled={!this.state.search} onClick={this.apiSearch}>
            Search Books
          </FormBtn>
          <Row>
            <Col size="md-6" />
            <Col size="md-12 md-12">
              {this.state.result.length ? (
                <List>
                  {this.state.result.map((book, index) => {
                    return (
                      <ListItem key={book.id}>
                        <a>
                          {/* <a href={"/books/" + book.id}> */}
                          <h3 name="title">
                            <a
                              href={book.volumeInfo.infoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {book.volumeInfo.title}
                            </a>
                          </h3>
                          <h6>{book.volumeInfo.subtitle}</h6>
                          <h5 name="authors">
                            Written by {book.volumeInfo.authors[0]}
                          </h5>
                          <br />
                          <div className="card">
                            <div className="img-container">
                              <img
                                name="link"
                                value={this.state.link}
                                alt={book.volumeInfo.title}
                                src={book.volumeInfo.imageLinks.thumbnail}
                                name="image"
                              />
                            </div>
                          </div>
                          <p name="description">
                            {book.volumeInfo.description}
                          </p>
                          <SaveBtn
                            id={index}
                            onClick={this.handleFormSubmit}
                            hidden={false}
                          >
                            Save This Book
                          </SaveBtn>
                        </a>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
export default Search;
