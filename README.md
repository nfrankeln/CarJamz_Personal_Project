# CARJAMZ 
A spotify playlist generator for freinds

This App will allow users to login with thier spotify accounts and have playlists reccomended to them based on genres they have in common.

Using the App consists of 4 steps
1) The user will create an account or login
   Creating an account will allow the app to store a users spotify data. While this could have been accomplished through spotify only this allows the 
   app to have the flexibility to have users search for other users by name, and attach a profile image. 
   
2) The user will search for other users using the App
   For the initial deployment they will search by email. Future iterations will allow for searching by name
   If another app user is found the user will be prompted to confirm thier selection and/or look at the other users profile
   
3) They user will select up to 5 genres that they have in common
   this is a limitation of spotifys reccomendation api
   future iterations: will allow users to select a combination of 5 genres/songs/artists/album and select a range of bmp
   
4) They can save the playlist to spotify.
   future iterations: integrate the spotify web player so users can view the playlist before saving.
   
## Front End
The front end is made with react and is comprised of these components:
a) a nav bar with links
b) a profile page where a user can see information pertaining to thier own spotify account
c) a users page where a user can look up other users 
## Back End
The back end is made with django and postgres

## Postgres Diagram
[Spotify song data diagram](https://drawsql.app/teams/codeplatoon/diagrams/spotify)
