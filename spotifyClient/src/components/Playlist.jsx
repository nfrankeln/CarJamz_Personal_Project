import './Playlist.css'
export default function topTenSongs(props){
    return(
        <div id="playlist-container">
        {props.songs.map((song) => 
          <div id="playlist-item">
            <div><img className="playlist-item-image" src={song['album']['images'][1]['url']} /></div>
            <div className='playlist-item-text'>
                <div><p className='primary-font'>{song['name']}</p></div>
                <div><p className='secondary-font'>{song['artists'][0]['name']}</p></div>
            </div>
          </div>
        )}
      </div> 
    )
}