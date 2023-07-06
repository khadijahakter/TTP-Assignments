import React, { useState, useEffect } from 'react';
import BookCard from "./bookCard";
import './App.css';
import Modal from './ui/Modal';
import BookForm from './AddBookForm';
import BookDetails from './bookDetails';

function App() {
  const [search, setSearch] = useState('');
  const [bookData, setBookData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState(bookData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch('http://localhost:3000/books');
      const books = await response.json();
      setBookData(books);
    }

    fetchBooks();
  }, []);

  useEffect(() => {
    setFilteredBooks(
      bookData.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.genres.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, bookData]);

  const handleAddBookReview = async (newBook) => {
    try {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
  
      if (response.ok) {
        // Book added successfully, you can update the local state if needed
        const addedBook = await response.json();
        setBookData((prevBookData) => [...prevBookData, addedBook]);
        setIsModalVisible(false);
      } else {
        console.error('Failed to add book.');
        // Handle error case if needed
      }
    } catch (error) {
      console.error('Error occurred while adding book:', error);
      // Handle error case if needed
    }
  };
  
  
  const displayReviews = () => {
    setIsModalVisible(true);
  };

  const bookCards = filteredBooks.map((book, i) => (
    <BookCard book={book} key={i} bookData={bookData} />
  ));

  return (
    <div>
      <h1 style={{
        textAlign: 'center',
        paddingBottom: '1rem',
        fontSize: '45px',
        color: 'white',
      }}>Book Bench</h1>
      <h2 style={{ textAlign: 'center', fontSize: '20px', paddingBottom: '1rem' }}>A Book Review Forum</h2>
      <input
        type="text"
        placeholder="Search by title, author or genre"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border-2 border-gray-300 bg-white rounded-md outline-none focus:border-purple-100"
        style={{ marginBottom: '2rem' }}
      />
      <div className="flex justify-between mb-4">
        <div></div>
        <div><button className="bg-purple-300 px-4 py-2" onClick={() => setIsModalVisible(true)}>+ Add a Book</button></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {bookCards}
        <Modal isVisible={isModalVisible} hideModal={() => setIsModalVisible(false)}>
          <BookForm handleAddBookReview={handleAddBookReview} />
        </Modal>
      </div>
    </div>
  );
}

export default App;
