import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Link } from 'react-router-dom';

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/all-books").then(res=>res.json()).then(data=> setAllBooks(data))
  },[])

  //delete a books 

  const handleDelete = (id) =>{
    console.log(id);
    fetch(`http://localhost:5000/book/${id}`,{
      method: "DELETE"
    }).then(res => res.json()).then(data =>{
      alert("Book is deleted successfully");
      // setAllBooks(data);
    })
  }
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Your Books</h2>


      {/* table for book data */}
      <Table className='lg:w-[1180px]' >
        <TableHead>
          <TableRow>
            <TableHeadCell>No. </TableHeadCell>
            <TableHeadCell>Book name</TableHeadCell>
            <TableHeadCell>Author Name</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Prices</TableHeadCell>
            <TableHeadCell>
              <span>Edit or Manage</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        {
          allBooks.map((book, index) => <TableBody className="divide-y" key={book._id}>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
             {index + 1}
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {book.bookTitle}
            </TableCell>
            <TableCell>{book.authorName}</TableCell>
            <TableCell>{book.category}</TableCell>
            <TableCell>$10</TableCell>
            <TableCell>
              
              <Link 
               className="font-medium text-primary-600 hover:underline dark:text-primary-500 mr-6"
               to={`/admin/dashboard/edit-books/${book._id}`}
               >
                Edit
              </Link>
              <button onClick={() => handleDelete(book._id)} className='bg-red-900  px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'>Delete</button>
            </TableCell>
          </TableRow>
          </TableBody>)
        }
      </Table>

    </div>
  )
}

export default ManageBooks
