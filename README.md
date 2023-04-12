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

## Postgresql Diagram

![drawSQL-spotify-export-2023-04-10](https://user-images.githubusercontent.com/101782117/230993348-9b67fc2e-12c1-4627-aeb7-07f434fdad98.png)

[Spotify song data diagram](https://drawsql.app/teams/codeplatoon/diagrams/spotify)

GitHub README - Schema for an Application
This repository contains the schema for an application's database, which consists of the following tables:

Users
This table stores information about the users of the application. Each user has a one-to-one relationship with a Token.

Fields:

user_id: a unique identifier for the user
first_name: the user's first name
last_name: the user's last name
email: the user's email address
password: the user's password
profile_image_url: a URL for the user's profile image
token_id: a foreign key to the Token table
Tokens
This table stores authentication tokens for users to access the Spotify API. Each Token has a one-to-one relationship with a User.

Fields:

token_id: a unique identifier for the token
access_token: the access token attached to request headers to the Spotify API
refresh_token: the token used to get a new access token when the access token expires
token_type: the type of token (currently only "bearer")
user_id: a foreign key to the User table
UserPlaylistCollection
This table stores the collections of playlists belonging to each user in the system. Each UserPlaylistCollection has a one-to-many relationship with the Playlist table and a one-to-one relationship with the User table.

Fields:

collection_id: a unique identifier for the collection
user_id: a foreign key to the User table
Playlist
This table stores the songs in a playlist. Each Playlist has a many-to-many relationship with the Song table.

Fields:

playlist_id: a unique identifier for the playlist
name: the name of the playlist
collection_id: a foreign key to the UserPlaylistCollection table
Song
This table stores song names, artists, and playlists the song is in. Each Song has a many-to-many relationship with the Playlist and Artist tables.

Fields:

song_id: a unique identifier for the song
name: the name of the song
Artist
This table stores artist names, Spotify URIs, related songs, and associated genres. Each Artist has a many-to-many relationship with the Song and Genre tables.

Fields:

artist_id: a unique identifier for the artist
name: the name of the artist
spotify_uri: the Spotify URI for the artist
Genre
This table stores genre names. Each Genre has a many-to-many relationship with the Artist table.

Fields:

genre_id: a unique identifier for the genre
name: the name of the genre


##Encountered Problems
1) spotify only has a small list of seed genres availible but can take in any artist id solution: get random artists assoicated with selected genres
2) slow saving of user data due to multiple API requests solution: asycronous requests
