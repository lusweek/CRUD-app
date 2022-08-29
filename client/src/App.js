import React, {useState, useEffect} from 'react'
import './App.css';
import Axios from 'axios'

function App() {
  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')
  const [movieReviewList, setMovieReviewList] = useState([])

  const [newReview, setNewReview] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((responce) => {
      setMovieReviewList(responce.data)
    })
  }, [])

  const sumbitReveiw = () => {

    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: review
    })
    
      setMovieReviewList([
        ...movieReviewList, 
        {movieName: movieName, movieReview: review }, 
      ]);
  };

    const deleteReview = (movie) => {
      Axios.delete(`http://localhost:3001/api/delete/${movie}`)
    }

    const updateReview = (movie) => {
      Axios.put("http://localhost:3001/api/update", {
        movieName: movie, 
        movieReview: newReview
      });
      setNewReview("")
    }

  return (
    <>
    <section className='headder'>
      <h1>CRUD APPLICATION</h1>

      <label>Movie Name:</label>
      <input type="text" name="movieName" onChange={(e) => {
        setMovieName(e.target.value)
      }}/>
      <label>Review:</label>
      <input type="text" name="review" onChange={(e) => {
        setReview(e.target.value)
      }} />    

      <button onClick={sumbitReveiw}>Submit</button>

      {movieReviewList.map((val) => {
        return  (
          <div className='card'>
            <h1>{val.movieName}</h1>
            <p>{val.movieReview}</p>

            <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
            <input type="text" id='updateInput' onChange={(e) => {
              setNewReview(e.target.value)
            }}  />
            <button onClick={() => {updateReview(val.movieName)}}>Update</button>
          </div>
        )
      })}

    </section>
        
    </>
  );
}

export default App;
