import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3000/reviews?bookId=${id}`);
        if (response.ok) {
          const reviewsData = await response.json();
          setReviews(reviewsData);
        } else {
          throw new Error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [id]);

  const handleAddReview = async (review) => {
    try {
      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: id,
          content: review,
        }),
      });
      if (response.ok) {
        const newReview = await response.json();
        setReviews((prevReviews) => [...prevReviews, newReview]);
      } else {
        throw new Error('Failed to add review');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  const { title, author, pages, genres, publishDate } = book;

  return (
    <div>
      <Link to="/">Home</Link>
      <h2>{title}</h2>
      <p>Author: {author}</p>
      <p>Pages: {pages}</p>
      <p>Genres: {genres}</p>
      <p>Publish Date: {publishDate}</p>
      <h3>Reviews:</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>{review.content}</li>
        ))}
      </ul>
      <ReviewForm onAddReview={handleAddReview} />
    </div>
  );
}

function ReviewForm({ onAddReview }) {
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      onAddReview(review.trim());
      setReview('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Add a review:</label>
      <input
        type="text"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <button type="submit" style={{ backgroundColor: 'purple', padding: '4px 8px', color: 'white' }}>
        Submit
      </button>
    </form>
  );
}

export default BookDetails;
