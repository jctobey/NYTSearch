import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import axios from "axios";

class Books extends Component {
  state = {
    books: [],
    title: "",
    authors: "",
    description: "",
    image: "test",
    link: "test"
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", authors: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  postBooks = event => {
    let bookData = {
      title: this.state.title,
      authors: this.state.authors,
      description: this.state.description,
      image: "fake",
      link: "fake"
    };
    console.log(bookData);
    API.saveBook(bookData).then(API.getBooks());
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
        res => this.setState({ books: res.data.items })
        //the data you want! res.data.items[0].volumeInfo.title
      );
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6" />
          <Col size="md-6 sm-12">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.authors}
                        </strong>
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
      </Container>
    );
  }
}

export default Books;
