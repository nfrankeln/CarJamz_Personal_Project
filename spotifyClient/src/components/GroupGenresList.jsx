import { useState, useReducer, useEffect} from "react";
import './GroupGenresList.css'
export default function GroupGenresList({commonGenres}) {
    return (
      <div>
        <h6>Groups Top Genres (select up to 5)</h6>
        <form>
          <ul>
          <input type="checkbox" id="checkbox" value={"test"} /> Test
        <label htmlFor="checkbox">I agree to Terms of Service </label>
          </ul>
        </form>
      </div>
    );
  }
//   {commonGenres && commonGenres.map(genre => (
//     <li key={genre}>
//       <input type="checkbox" value={genre} />
//       {genre}
//     </li>
//   ))}