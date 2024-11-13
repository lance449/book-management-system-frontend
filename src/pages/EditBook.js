// src/pages/EditBook.js

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    published_year: '',
    genre: '',
    description: ''
  });
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`http://localhost:8000/api/books/${id}`);
      setBook(response.data);
    };
    fetchBook();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    await axios.put(`http://localhost:8000/api/books/${id}`, book);
    alert('Book updated successfully!');
    navigate('/'); // Redirect to Home after save
  };

  return (
    <Container>
      <Row>
        <Col md={2} className="bg-light sidebar">
          <h4 className="text-center py-3">Book Management System</h4>
          <Link to="/" className="d-block py-2">Home</Link>
          <Link to="#" className="d-block py-2">Manage Books</Link>
        </Col>

        <Col md={10}>
          <h1>Edit Book</h1>
          <Form onSubmit={handleSave}>
            {/* Title Input */}
            <Form.Group controlId="formBookTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={book.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Author Input */}
            <Form.Group controlId="formBookAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={book.author}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Published Year Input */}
            <Form.Group controlId="formBookPublishedYear">
              <Form.Label>Published Year</Form.Label>
              <Form.Control
                type="number"
                name="published_year"
                value={book.published_year}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Genre Input */}
            <Form.Group controlId="formBookGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                value={book.genre}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Description Input */}
            <Form.Group controlId="formBookDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={book.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditBook;
