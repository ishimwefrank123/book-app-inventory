import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Select, Textarea } from "flowbite-react";

const UploadBook = () => {

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

   const handleBookSubmission = (event) => {
    event.preventDefault();
    const form = event.target

    const bookTitle = form.bookTitle.value
    const authorName = form.authorName.value
    const imageURL = form.imageURL.value
    const category = form.categoryName.value
    const bookDescription = form.bookDescription.value
    const bookPdfURL = form.bookPdfURL.value
    
    const bookObj = {
      bookTitle, authorName, imageURL, category, bookDescription, bookPdfURL
    }

    console.log(bookObj)
    
    //send data to database

    fetch("http://localhost:5000/upload-book",{
      method: "POST",
      headers: {
        "Content-type":"application/json"
      },
      body: JSON.stringify(bookObj)
    }).then(res => res.json()).then(data =>{
      // console.log(data)
      alert("Book Uploaded successfully!!!")  
      form.reset();
    })

  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload a book</h2>

      <form onSubmit={handleBookSubmission} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
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
          rows={4} />
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
        />
      </div>

      <Button type="submit" className='mt-5 bg-gray-800'>
        Upload Book
      </Button>
      </form>
      
    </div>
  );
}

export default UploadBook;
