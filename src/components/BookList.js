// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:8000/api/books');
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await axios.delete(`http://localhost:8000/api/books/${id}`);
      setBooks(books.filter(book => book.id !== id));
    }
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Published Year</th>
          <th>Genre</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.published_year}</td>
            <td>{book.genre}</td>
            <td>{book.description}</td>
            <td>
              <Button as={Link} to={`/view/${book.id}`} variant="info">View</Button>
              <Button as={Link} to={`/edit/${book.id}`} variant="warning" className="ms-2">Edit</Button>
              <Button variant="danger" className="ms-2" onClick={() => handleDelete(book.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BookList;
