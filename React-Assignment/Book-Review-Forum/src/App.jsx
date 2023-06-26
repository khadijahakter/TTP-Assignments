import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import BookCard from "./bookCard";
import books from "./books";
import './App.css'


function App() {
  // const [count, setCount] = useState(0)
  const bookCards = books.map((book, i) => {
    return <BookCard book = {book} key={i} />;
  });

  return (
  <div>
    <h1 style = {{ textAlign: 'center', marginBottom: '20px'}}>Top Rated Books</h1>
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        paddingTop: '20px'
      }}>
        {bookCards}
      </div>
    </div>
  )
}

export default App
