// src/pages/AddBook.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { title, author, published_year: publishedYear, genre, description };
    await axios.post('http://localhost:8000/api/books', newBook);
    navigate('/'); // Redirect to Home after adding
  };

  return (
    <Container>
      <h1>Add New Book</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Published Year</Form.Label>
          <Form.Control type="number" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Form.Group>

        <Button type="submit" variant="primary">Add Book</Button>
      </Form>
    </Container>
  );
};

export default AddBook;
