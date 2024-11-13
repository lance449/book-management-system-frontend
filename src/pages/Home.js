// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Container, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../styles.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showManageBooks, setShowManageBooks] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    year: '',
    genre: ''
  });

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:8000/api/books');
      setBooks(response.data);
      setFilteredBooks(response.data);
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await axios.delete(`http://localhost:8000/api/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      setFilteredBooks(filteredBooks.filter((book) => book.id !== id));
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterBooks(e.target.value, filters.year, filters.genre);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value };
      filterBooks(search, updatedFilters.year, updatedFilters.genre);
      return updatedFilters;
    });
  };

  const filterBooks = (searchTerm, year, genre) => {
    let filtered = books.filter((book) => {
      const isTitleOrAuthorMatch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const isYearMatch = year ? book.published_year.toString().includes(year) : true;
      const isGenreMatch = genre ? book.genre.toLowerCase().includes(genre.toLowerCase()) : true;
      return isTitleOrAuthorMatch && isYearMatch && isGenreMatch;
    });
    setFilteredBooks(filtered);
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col md={2} className="bg-light sidebar p-4">
          <h4 className="text-center py-3">Book Management System</h4>
          <Link
            to="/"
            className="d-block py-2"
            onClick={() => setShowManageBooks(false)}
          >
            Home
          </Link>
          <Link
            to="#"
            className="d-block py-2"
            onClick={() => setShowManageBooks(!showManageBooks)}
          >
            Manage Books
          </Link>
        </Col>

        <Col md={10} className="p-4">
          <div className="mb-4">
            <Form>
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Search by title or author"
                  value={search}
                  onChange={handleSearch}
                  className="mb-3"
                />
              </Form.Group>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="filterYear">
                    <Form.Control
                      as="select"
                      name="year"
                      value={filters.year}
                      onChange={handleFilterChange}
                    >
                      <option value="">Select Year</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="filterGenre">
                    <Form.Control
                      as="select"
                      name="genre"
                      value={filters.genre}
                      onChange={handleFilterChange}
                    >
                      <option value="">Select Genre</option>
                      <option value="fiction">Fiction</option>
                      <option value="non-fiction">Non-fiction</option>
                      <option value="mystery">Mystery</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>

          {showManageBooks ? (
            <div>
              <h2>Manage Books</h2>
              <Button
                as={Link}
                to="/add"
                className="mb-3 custom-btn"
              >
                Add New Book
              </Button>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published Year</th>
                    <th>Genre</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.published_year}</td>
                      <td>{book.genre}</td>
                      <td>{book.description}</td>
                      <td>
                        <Link to={`/edit/${book.id}`} className="btn custom-edit-btn me-2">
                          Edit
                        </Link>
                        <Button
                          onClick={() => handleDelete(book.id)}
                          className="custom-delete-btn"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <Row>
              {filteredBooks.map((book) => (
                <Col md={4} key={book.id} className="mb-4">
                  <Link to={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
                    <Card className="shadow-sm rounded" style={{ cursor: 'pointer' }}>
                      <div
                        style={{
                          backgroundColor: 'orange',
                          height: '150px',
                          width: '100%',
                          borderTopLeftRadius: '.25rem',
                          borderTopRightRadius: '.25rem',
                        }}
                      >
                        <img
                          src="https://via.placeholder.com/150"
                          alt="book cover"
                          style={{ display: 'none' }}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="text-center text-primary">{book.title}</Card.Title>
                        <Card.Text className="text-muted text-center">{book.author}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
