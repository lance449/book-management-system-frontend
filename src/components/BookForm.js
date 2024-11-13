// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BookForm = ({ isEditMode }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    published_year: '',
    genre: '',
    description: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode && id) {
      axios.get(`http://localhost:8000/api/books/${id}`)
        .then((response) => setBook(response.data))
        .catch((error) => console.log(error));
    }
  }, [isEditMode, id]);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await axios.put(`http://localhost:8000/api/books/${id}`, book);
    } else {
      await axios.post('http://localhost:8000/api/books', book);
    }
    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="author">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="published_year">
        <Form.Label>Published Year</Form.Label>
        <Form.Control
          type="number"
          name="published_year"
          value={book.published_year}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="genre">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={book.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        {isEditMode ? 'Update Book' : 'Add Book'}
      </Button>
    </Form>
  );
};

export default BookForm;
