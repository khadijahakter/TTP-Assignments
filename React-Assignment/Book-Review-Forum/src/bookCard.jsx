export default function BookCard({book}) {
    // pull data from argument
    const { 
        image: { src, alt }, 
        title, 
        author, 
        pages, 
        genres, 
        publishDate 
    } = book;

    return (
        <div className = "b-desc">
            <img
                className="b-desc__book-image"
                src = {src}
                alt = {alt}
            />
            <div className="b-desc__details">
                <h2 className="b-desc__book-title">{title}</h2>
                <p className="b-desc__author">{author}</p>
                <ul className="b-desc__metadata">
                <li className="b-desc__pages">{pages}</li>
                <li className="b-desc__genres">{genres}</li>
                <li className="b-desc__publish-date">{publishDate}</li>
                </ul>
            </div>
        </div>
    );
}