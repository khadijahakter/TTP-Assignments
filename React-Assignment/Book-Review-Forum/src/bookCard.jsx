import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ book, bookData, setSelectedBook, showModal }) {
  const {
    image: { src, alt },
    title,
    author,
    pages,
    genres,
    publishDate,
    reviews,
  } = book;

  const displayReviews = () => {
    setSelectedBook(book);
    showModal();
  };

  return (
    <div className="b-desc">
      <img className="b-desc__book-image" src={src} alt={alt} />
      <div className="b-desc__details">
        <h2 className="b-desc__book-title">{title}</h2>
        <p className="b-desc__author">{author}</p>
        <ul className="b-desc__metadata">
          <li className="b-desc__pages">{pages}</li>
          <li className="b-desc__genres">{genres}</li>
          <li className="b-desc__publish-date">{publishDate}</li>
        </ul>
        <br />
        <Link
          to={`/books/${book.id}/reviews`}
          className="bg-purple-300 px-4 py-2 text-white rounded"
          style={{ backgroundColor: 'rgba(76, 0, 130, 0.708)', textDecoration: 'none' }}
        >
          Reviews
        </Link>
      </div>
    </div>
  );
}

export default BookCard;
