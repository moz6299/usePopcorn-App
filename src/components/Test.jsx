import React, { useState } from 'react'
import StarRating from './StarRating'

const Test = () => {
    const [movieRated, setMovieRated] = useState(0)
  return (
    <div>
      <StarRating maxRating={10} color='blue' setMovieRated={setMovieRated} />
      <p>This Movie was rated {movieRated} stars </p>
    </div>
  )
}

export default Test
