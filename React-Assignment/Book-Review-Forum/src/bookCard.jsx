import React from 'react';

export default function BookCard({ book, showModal, setSelectedBook }) {
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
            <img
                className="b-desc__book-image"
                src={src}
                alt={alt}
            />
            <div className="b-desc__details">
                <h2 className="b-desc__book-title">{title}</h2>
                <p className="b-desc__author">{author}</p>
                <ul className="b-desc__metadata">
                    <li className="b-desc__pages">{pages}</li>
                    <li className="b-desc__genres">{genres}</li>
                    <li className="b-desc__publish-date">{publishDate}</li>
                </ul>
                <br></br>
                <button className ="bg-purple-300 px-4 py-2" onClick={displayReviews}>Reviews</button>
            </div>
        </div>
    );
}

