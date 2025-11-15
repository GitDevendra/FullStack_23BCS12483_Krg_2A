import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function BookList() {
    function BookListApi(){
        // call tp get the book list api for now i am created hardcoded array usinf use stase hook
        const [books,setBooks]=useState(["12984","12981","12931"]);
        return books;
    }
  return (
    <>
    {
        BookListApi()?.map((index,value)=>{
              return <div key={index} onClick={handleclick}>
                  {value}
              </div>
        })
    }
    </>
  )
}

export default BookList