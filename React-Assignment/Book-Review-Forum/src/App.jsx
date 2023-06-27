import React, { useState, useEffect } from 'react';
import BookCard from "./bookCard";
import books from "./books";
import Modal from "./ui/Modal";
import './App.css'

function App() {
  // declare a state variable and function to update state
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    return <BookCard book={book} key={i} />;
  });

  const showModal = () => {
    setIsModalVisible(true);
  }

  const hideModal = () => {
    setIsModalVisible(false);
  }


  return (
    <div>
      <h1 style={{ textAlign: 'center', paddingBottom: '1rem', fontSize: '50px' }}>Book Bench</h1>
      <h2 style={{ textAlign: 'center', paddingBottom: '2rem', fontSize: '20px' }}>A Book Review Forum</h2>
      <input
        type="text"
        placeholder="Search by title, author or genre"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border-2 border-gray-300 bg-white rounded-md outline-none focus:border-purple-100"
        style={{ marginBottom: '2rem' }}
      />
      <div className="flex justify-between">
        <div>
          <button
            className="bg-gray-200 px-4 py-2 hover:bg-gray-300 transition m-3" 
            onClick={showModal}
          >
            Add a Book
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {bookCards}
        <Modal
        isVisible={isModalVisible}
        hideModal={hideModal}
        >
        </Modal>
        {/* <form
          onSubmit={handleAddJobFormSubmit}
          className="selection:bg-blue-200 flex flex-col gap-2"
        >
          <fieldset className="flex flex-col">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-white border-4 focus:outline-none p-2"
            />
          </fieldset>
          </form> */}
      </div>
    </div>
  )
}

export default App;
