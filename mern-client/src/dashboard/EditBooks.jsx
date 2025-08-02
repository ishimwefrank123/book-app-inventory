import React, { useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { Button, Checkbox, Label, TextInput, Select, Textarea } from "flowbite-react";

const EditBooks = () => {
  const {id} = useParams();
  const {bookTitle, authorName, imageURL, category, bookDescription,bookPdfURL } = useLoaderData()

   const bookCategories = [
     "Fiction",
     "Non-Fiction",
     "Mistery",
     "Programming",
     "Science Fiction",
     "Fantasy",
     "Horror",
     "Bibliography",
     "Autobiography",
     "History",
     "Self-help",
     "Memoir",
     "Business",
     "Children Books",
     "Travel",
     "Religion",
     "Art and Design"
   ]
 
    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0])
 
    const handleChangeSelectedValue = (event) =>{
     console.log(event.target.value);
     setSelectedBookCategory(event.target.value)
    }
 
    //handle book submission
 
    const handleUpdate = (event) => {
     event.preventDefault();
     const form = event.target
 
     const bookTitle = form.bookTitle.value
     const authorName = form.authorName.value
     const imageURL = form.imageURL.value
     const category = form.categoryName.value
     const bookDescription = form.bookDescription.value
     const bookPdfURL = form.bookPdfURL.value
     
     const updateBookObj = {
       bookTitle, authorName, imageURL, category, bookDescription, bookPdfURL
     }
 
    //  console.log(bookObj)

    // update book data

    fetch(`http://localhost:5000/book/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(updateBookObj)
    }).then(res => res.json()).then(data => {
      alert('Book is updated successfully!!!');
      
    })
     
     
 
   }
 
   return (
     <div className='px-4 my-12'>
       <h2 className='mb-8 text-3xl font-bold'>Update the book data</h2>
 
       <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
       {/* First row */}
       <div className='flex gap-8'>
         {/* Book title */}
         <div className='lg:w-1/2'>
           <div className="mb-2 block">
             <Label
              htmlFor="bookTitle"
              value= "Book Title"
              />Book Title
           </div>
           <TextInput
             id="bookTitle"
             type="text"
             name='bookTitle'
             placeholder="Book name"
             required
             className="bg-transparent"
             defaultValue={bookTitle}
           />
         </div>
 
         {/* authorName */}
         <div className='lg:w-1/2'>
           <div className="mb-2 block">
             <Label
              htmlFor="authorName"
              value= "Author Name"
              />Author Name
           </div>
           <TextInput
             id="authorName"
             type="authorName"
             name='authorName'
             placeholder="Author Name"
             required
             className="bg-transparent"
             defaultValue={authorName}
           />
         </div>
       </div>
       {/* 2nd row */}
       <div className='flex gap-8'>
         {/* Book Image URL */}
         <div className='lg:w-1/2'>
           <div className="mb-2 block">
             <Label
              htmlFor="imageURL"
              value= "Book image URL"
              />Image URL
           </div>
           <TextInput
             id="imageURL"
             type="text"
             name='imageURL'
             placeholder="Book image URL"
             required
             className="bg-transparent"
             defaultValue={imageURL}
           />
         </div>
 
         {/* category */}
         <div className='lg:w-1/2'>
           <div className="mb-2 block">
             <Label
              htmlFor="inputState"
              value= "Book Category"
              />Book Category
           </div>
           <Select 
           id='inputState' 
           name='categoryName' 
           className='w-full rounded' 
           value={selectedBookCategory}
           onChange={handleChangeSelectedValue}
         >
           {
             bookCategories.map((option)=><option key={option} value={option}>{option}</option>)
           }
 
           </Select>
         </div>
       </div>
 
       {/* bookDescription */}
       <div>
         <div className="mb-2 block">
             <Label
              htmlFor="bookDescription"
              value= "Book Description"
              />Book Description
           </div>
           <Textarea
           id="bookDescription"
           name='bookDescription'
           placeholder="Write your book description..." 
           className='w-full'
           required 
           rows={4} 
           defaultValue={bookDescription}
           />
         </div>
 
         {/* book pdf link */}
         <div>
         <div className="mb-2 block">
           <Label 
           htmlFor="bookPdfURL"
           value="Book Pdf URL"
           />
         </div>
         <TextInput 
         id="bookPdfURL" 
         name='bookPdfURL'
         type="text" 
         placeholder="book pdf url" 
         required 
         defaultValue={bookPdfURL}
         />
       </div>
 
       <Button type="submit" className='mt-5 bg-gray-800'>
         Update Book
       </Button>
       </form>
       
     </div>
   );
}

export default EditBooks
