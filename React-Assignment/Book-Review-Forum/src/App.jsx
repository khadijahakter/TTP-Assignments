import React, { useState, useEffect } from 'react';
import BookCard from "./bookCard";
import books from "./books";
import Modal from "./ui/Modal";
import './App.css'

function App() {
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.genres.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const showModal = () => {
    setIsModalVisible(true);
  }

  const hideModal = () => {
    setIsModalVisible(false);
  }

  const handleInputChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleAddBookReviewSubmit = (event) => {
    event.preventDefault();

    if (selectedBook) {
      const updatedBooks = filteredBooks.map((book) => {
        if (book.title === selectedBook.title) {
          return {
            ...book,
            reviews: book.reviews ? [...book.reviews, reviewText] : [reviewText],
          };
        }

        return book;
      });

      setFilteredBooks(updatedBooks);
      setReviewText('');
      hideModal();
    }
  };

  const bookCards = filteredBooks.map((book, i) => {
    return <BookCard book={book} key={i} showModal={showModal} setSelectedBook={setSelectedBook} />;
});

const addReview = (book, reviewText) => {
  const updatedBooks = filteredBooks.map((b) => {
    if (b.title === book.title) {
      return {
        ...b,
        reviews: b.reviews ? [...b.reviews, reviewText] : [reviewText],
      };
    }

    return b;
  });

  setFilteredBooks(updatedBooks);
  hideModal();
};

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
      <div className="grid grid-cols-3 gap-4">
        {bookCards}
        <Modal isVisible={isModalVisible} hideModal={hideModal} book={selectedBook} addReview={addReview}>
          {selectedBook && (
            <form onSubmit={handleAddBookReviewSubmit}>
              <h2>{selectedBook.title} Review</h2>
              <textarea
                value={reviewText}
                onChange={handleInputChange}
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </Modal>

      </div>
    </div>
  );
}

export default App;