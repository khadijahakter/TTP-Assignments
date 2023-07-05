import React, { useState } from 'react';

export default function BookForm({ handleAddBookReview }) {
  const [bookFormState, setBookFormState] = useState({
    title: "",
    author: "",
    pages: null,
    genres: "",
    publishDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBookFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      ...bookFormState,
      image: {
        src: "",
        alt: "",
      },
      reviews: [],
    };

    handleAddBookReview(newBook);
    setBookFormState({
      title: "",
      author: "",
      pages: null,
      genres: "",
      publishDate: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="selection:bg-blue-200 flex flex-col gap-2">
      <h1 style={{ color: 'rgba(76, 0, 130, 0.708)', fontWeight: 'bold' }}>New Book Submission</h1>
      <fieldset className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={bookFormState.title}
          onChange={handleInputChange}
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="username">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          value={bookFormState.author}
          onChange={handleInputChange}
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="review">Pages</label>
        <input
          name="pages"
          id="pages"
          type="number"
          value={bookFormState.pages}
          onChange={handleInputChange}
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="review">Genres</label>
        <input
          name="genres"
          id="genres"
          value={bookFormState.genres}
          onChange={handleInputChange}
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="review">Publish Date</label>
        <input
          name="publishDate"
          id="publishDate"
          value={bookFormState.publishDate}
          onChange={handleInputChange}
          className="bg-white border-4 focus:outline-none p-2"
        />
      </fieldset>
      <input
        className="mt-4 bg-gray-300 hover:bg-gray-400 transition cursor-pointer py-2 text-white"
        type="submit"
      />
    </form>
  );
}
