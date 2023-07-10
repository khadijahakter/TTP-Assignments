import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import BookForm from './AddBookForm.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ErrorPage from './ErrorPage.jsx'
import BookDetails from './bookDetails.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/AddBookForm",
    element: <BookForm />,
  },
  {
    path: "/books/:id/details",
    element: <BookDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);