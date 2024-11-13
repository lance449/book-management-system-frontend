import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const response = await axios.get(`http://localhost:8000/api/books/${id}`);
      setBook(response.data);
    };
    fetchBookDetails();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <Container>
      <Row>
        <Col md={2} className="bg-light sidebar">
          <h4 className="text-center py-3">Book Management System</h4>
          <Link to="/" className="d-block py-2">Home</Link>
          <Link to="#" className="d-block py-2">Manage Books</Link>
        </Col>

        <Col md={10}>
          <h1>{book.title}</h1>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Published Year:</strong> {book.published_year}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Description:</strong> {book.description}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetails;
