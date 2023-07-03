
import React from 'react';

function Modal({ children, isVisible, hideModal, books, handleInputChange }) {
    if (!isVisible) return null;
    
    const titleOptions = books.map((book, index) => 
      <option key={index} value={book.title}>{book.title}</option>
    );

    return (
      <div onClick={hideModal} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-items-center items-center">
        <div onClick={e => e.stopPropagation()} className="max-w-xl w-144 mx-auto flex flex-col h-2/3">
          <button onClick={hideModal} className="text-white text-xl place-self-end">X</button>
          <div className="bg-white text-gray-800 p-8">
            <form
              onSubmit={e => {
                e.preventDefault();
                hideModal();
              }}
              className="selection:bg-blue-200 flex flex-col gap-2"
            >
              <h1 style={{ color: 'purple', fontWeight: 'bold' }}>Submit a Review</h1>
              <fieldset className="flex flex-col">
                <label htmlFor="title">Title</label>
                <select
                  name="title"
                  id="title"
                  className="bg-white border-4 focus:outline-none p-2"
                  onChange={handleInputChange}
                >
                  {titleOptions}
                </select>
              </fieldset>
              <fieldset className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-white border-4 focus:outline-none p-2"
                  onChange={handleInputChange}
                />
              </fieldset>
              <fieldset className="flex flex-col">
                <label htmlFor="review">Review</label>
                <textarea
                  name="review"
                  id="review"
                  className="bg-white border-4 focus:outline-none p-2"
                  onChange={handleInputChange}
                />
              </fieldset>
              <input
                className="mt-4 bg-blue-500 hover:bg-blue-600 transition cursor-pointer py-2 text-white"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    );
}

export default Modal;
