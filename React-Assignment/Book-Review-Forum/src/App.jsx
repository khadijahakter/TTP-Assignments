import React, { useState, useEffect } from 'react';
import BookCard from "./bookCard";
import books from "./books";
import './App.css'
import Modal from './ui/Modal';

function App() {
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookData, setBookData] = useState(books);

  const [bookFormState, setBookFormState] = useState({
    title: "",
    author: "",
    username: "",
    review: "",
  });

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.genres.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, books]);

  const bookCards = filteredBooks.map((book, i) => {
    return <BookCard book={book} key={i} bookData={bookData} />;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBookFormState(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };


  const handleAddBookReview = (e) => {
    e.preventDefault();

    // Find the book in the books data
    const bookToUpdate = bookData.find(book => book.title === bookFormState.title);

    // If the book is found, create a new review and add it to the book's reviews array
    if (bookToUpdate) {
      const newReview = {
        username: bookFormState.username,
        review: bookFormState.review,
      };

      const newBookData = bookData.map(book => {
        if (book.title === bookToUpdate.title) {
          return {
            ...book,
            reviews: [...book.reviews, newReview],
          };
        }

        return book;
      });

      // Set the new book data state, clear the form state, and hide the modal
      setBookData(newBookData);
      setBookFormState({
        title: "",
        author: "",
        username: "",
        review: "",
      });
      setIsModalVisible(false);
      console.log("Updated Reviews:", newBookData.find(book => book.title === bookFormState.title)?.reviews);

    }
  };


  return (
    <div>
      <h1 style={{
        textAlign: 'center',
        paddingBottom: '1rem',
        fontSize: '45px',
        color: 'white',
      }}>Book Bench</h1>
      <h2 style= {{textAlign: 'center', fontSize: '20px', paddingBottom: '1rem' }}>A Book Review Forum</h2>
      <input
        type="text"
        placeholder="Search by title, author or genre"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border-2 border-gray-300 bg-white rounded-md outline-none focus:border-purple-100"
        style={{ marginBottom: '2rem' }}
      />
      <div className="flex justify-between mb-4">
        <div></div>
        <div><button className="bg-purple-300 px-4 py-2" onClick={() => setIsModalVisible(true)}>+ Add Book Review</button></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {bookCards}
        <Modal isVisible={isModalVisible} hideModal={() => setIsModalVisible(false)}
          books={books}
          handleAddBookReview={handleAddBookReview}>
          <form
            onSubmit={handleAddBookReview}
            className="selection:bg-blue-200 flex flex-col gap-2"
          >
            <h1 style={{ color: 'gray', fontWeight: 'bold' }}>Submit a Review</h1>
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={bookFormState.username}
                onChange={handleInputChange}
                className="bg-white border-4 focus:outline-none p-2"
              />
            </fieldset>
            <fieldset className="flex flex-col">
              <label htmlFor="review">Review</label>
              <textarea
                name="review"
                id="review"
                value={bookFormState.review}
                onChange={handleInputChange}
                className="bg-white border-4 focus:outline-none p-2"
              />
            </fieldset>
            <input
              className="mt-4 bg-gray-300 hover:bg-gray-400 transition cursor-pointer py-2 text-white"
              type="submit"
            />
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default App;
