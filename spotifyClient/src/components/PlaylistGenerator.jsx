import styles from './PlaylistGenerator.module.css'
import GenresSelectionForm from './GenresSelectionForm';
import PlaylistGeneratorInstructions from './PlaylistGeneratorInstructions';
import GroupUsers from './GroupUsers';
export default function PlaylistGenerator({addedUsers,setFoundUser,commonGenres}){
  

    return(<>
        <div className={styles.playlistGenerator}>
            <h1>Playlist Generator</h1>
        <div className={styles.playlistGeneratorBody}>
        <GroupUsers addedUsers={addedUsers} setFoundUser={setFoundUser}/>
        {addedUsers.length > 1 && <GenresSelectionForm addedUsers={addedUsers} commonGenres={commonGenres}/>}
        {addedUsers.length < 2 && <PlaylistGeneratorInstructions/>}
        </div>
        
      </div>
      </>
    )
}