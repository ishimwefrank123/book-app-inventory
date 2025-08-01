import React, { useEffect, useState } from 'react'
import { Card } from "flowbite-react";

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All Books are here</h2>

      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {
          books.map(book => (
            <Card key={book._id} className="shadow-md">
              <div className="bg-white p-4 rounded h-full flex flex-col justify-between">
                <img src={book.imageURL} alt="" className='h-96 w-full object-cover rounded' />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 mt-4">
                  {book.bookTitle}
                </h5>
                <p className="font-normal text-gray-700 my-2">
                  {book.bookDescription}
                </p>
                <button className='bg-blue-700 font-semibold text-white py-2 mt-auto rounded'>
                  Buy Now
                </button>
              </div>
            </Card>
          ))
        }
      </div>
    </div>
  );
};

export default Shop;
