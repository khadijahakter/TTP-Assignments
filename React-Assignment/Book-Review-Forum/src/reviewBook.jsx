import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.css'; // Import the CSS file for BookReviews component

function BookReviews() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3000/books/${id}`);
        if (response.ok) {
          const bookData = await response.json();
          setBook(bookData);
        } else {
          throw new Error('Failed to fetch book');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  const {
    title,
    author,
    pages,
    genres,
    publishDate,
    reviews,
  } = book;

  return (
    <div>
      <h2 className="title">{title}</h2>
      <p>Author: {author}</p>
      <p>Pages: {pages}</p>
      <p>Genres: {genres}</p>
      <p>Publish Date: {publishDate}</p>
      <p>Reviews:</p>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>{review}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookReviews;

