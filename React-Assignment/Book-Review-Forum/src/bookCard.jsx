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
        alert(`Reviews for ${title}: \n\n${reviews.join('\n\n')}`);
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
                <div className = "btn__review">
                    <button
                        className="bg-gray-200 px-4 py-2 hover:bg-gray-300 transition m-3"
                        onClick={() => {
                          showModal();
                          setSelectedBook(book);
                        }}
                    >Submit Review
                    </button>
                    <button
                        className="bg-gray-200 px-4 py-2 hover:bg-gray-300 transition m-3"
                        onClick={displayReviews}
                    >Reviews
                    </button>
                </div>
            </div>
        </div>
    );
}
