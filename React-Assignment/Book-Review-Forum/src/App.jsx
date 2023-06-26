import React, { useState, useEffect } from 'react';
import BookCard from "./bookCard";
import books from "./books";
import './App.css'

function App() {
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);

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
    return <BookCard book = {book} key={i} />;
  });

  return (
    <div>
      <h1 style = {{ textAlign: 'center', paddingBottom: '2rem', fontSize: '40px'}}>Top Rated Books</h1>
      <input 
        type="text" 
        placeholder="Search by title, author or genre" 
        onChange={(e) => setSearch(e.target.value)} 
        className="w-full px-3 py-2 border-2 border-gray-300 bg-white rounded-md outline-none focus:border-purple-100"
        style={{marginBottom: '2rem'}}
      />
      <div className="grid grid-cols-3 gap-4">
        {bookCards}
      </div>
    </div>
  )
}

export default App;
