import React, { useState } from 'react';

function Form({ book, addReview }) {
  const [reviewText, setReviewText] = useState('');

  const handleInputChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addReview(book, reviewText);
    setReviewText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{book.title} Review</h2>
      <textarea
        value={reviewText}
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
