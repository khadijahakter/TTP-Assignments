export default function BookCard({ book, showModal }) {
    const {
        image: { src, alt },
        title,
        author,
        pages,
        genres,
        publishDate
    } = book;

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
                <div className="flex justify-between">
                    <div>
                        <button
                            className="bg-gray-200 px-4 py-2 hover:bg-gray-300 transition m-3"
                            onClick={showModal}
                        >Submit Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}