import React, { Component } from "react";
import { Input, TextArea, FormBtn } from "../Form";
import { Col, Row, Container } from "../Grid";
import Jumbotron from "../Jumbotron";
import { List, ListItem } from "../List";
import DeleteBtn from "../DeleteBtn";
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
      .then(
        res => this.setState({ result: res.data.items })
        //the data you want! res.data.items[0].volumeInfo.title
      );
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
          <FormBtn onClick={this.apiSearch}>Submit Book</FormBtn>
          <Row>
            <Col size="md-6" />
            <Col size="md-12 md-12">
              {this.state.result.length ? (
                <List>
                  {this.state.result.map(book => {
                    return (
                      <ListItem key={book.id}>
                        <a>
                          {/* <a href={"/books/" + book.id}> */}
                          <h3>{book.volumeInfo.title}</h3>
                          <h6>{book.volumeInfo.subtitle}</h6>
                          Written by {book.volumeInfo.authors[0]}
                          <br />
                          <div className="card">
                            <div className="img-container">
                              <img
                                alt={book.volumeInfo.title}
                                src={book.volumeInfo.imageLinks.thumbnail}
                              />
                            </div>
                          </div>
                          <p>{book.volumeInfo.description}</p>
                        </a>
                        <DeleteBtn />
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
