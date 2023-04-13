# CARJAMZ 

## Project Description

This App will allow users generate and save playlists based on the genres they have most in common.

## App Flow

Using the App consists of 5 steps

- Account Creation and Login
- Spotify Authorization
- Group formation
- Genre Reccomendation
- Playlist Generation

 **Account Creation and Login**
 
   Creating an account will allow the app to store a users spotify data to a database. 
   
 **Spotify Authorization**
 
   The user need to grant the app permission to look at their top songs, profile image, and create playlist on their behalf
   Authorizing Spotify invovles Outh authenticaion
   
 **Group formation**

   To generate a playlist for a group a user needs to search for other user and add them to thier group
   
   
 **Genre Reccomendation**
 
   
  - The app will scan each users top song genres and count how many times a genre appears in the top 50 songs
   It will then weight each genre by how often it appears in the groups top genres
  
  - The user is then presented with a list of genres generate a playlist
   

**Playlist Generation**

   After selecting up to 5 genres a user will be taken to a playlist page
   where they can
   
   * Play songs on the playlist
   * Name and Save the Playlist to Spotify
   * Open Spotify to verify that thier playlist has been saved

## Technologies Used
<p float="left">
<img width="54" alt="Screen Shot 2023-04-11 at 11 17 47 PM" src="https://user-images.githubusercontent.com/101782117/231348248-bf4349e5-957f-4378-9c4f-fbb1aeb98dce.png">
<img width="54" alt="Screen Shot 2023-04-11 at 11 15 18 PM" src="https://user-images.githubusercontent.com/101782117/231347914-7b9035a3-4917-4fa2-ba45-63c831022368.png">
<img width="55" alt="Screen Shot 2023-04-11 at 11 37 57 PM" src="https://user-images.githubusercontent.com/101782117/231351326-8e735b38-7744-4137-a7db-c5d7b9a0739a.png">

<img width="74" alt="Screen Shot 2023-04-11 at 11 31 18 PM" src="https://user-images.githubusercontent.com/101782117/231350270-a079dcae-0d0d-4ece-aa66-fe0431e760e4.png">

<img width="54" alt="Screen Shot 2023-04-11 at 11 30 55 PM" src="https://user-images.githubusercontent.com/101782117/231350090-75527e3d-3afa-4c2d-a11e-cf0e8e83f903.png">

<img width="54" alt="Screen Shot 2023-04-11 at 10 30 13 PM" src="https://user-images.githubusercontent.com/101782117/231341722-c302b605-99a7-4ef0-9957-cbab82f32730.png">
<img width="166" alt="Screen Shot 2023-04-11 at 10 32 11 PM" src="https://user-images.githubusercontent.com/101782117/231341868-d5846745-8cc7-4bb1-84cc-5f129d8a2804.png">
<img width="166" alt="Screen Shot 2023-04-11 at 11 08 05 PM" src="https://user-images.githubusercontent.com/101782117/231347008-a66477d8-027e-47aa-9026-a47f7c3d6f8a.png">
<img width="54" alt="Screen Shot 2023-04-11 at 11 09 12 PM" src="https://user-images.githubusercontent.com/101782117/231347164-96873eab-27fd-4555-b2a9-4571ac71d47a.png">
<img width="54" alt="Screen Shot 2023-04-11 at 11 24 00 PM" src="https://user-images.githubusercontent.com/101782117/231349088-ef03926c-0c28-4bca-b44d-06a713f62587.png">


</p>


### Front End
[**React**](https://react.dev/)
  **Libraries**
- [react-hook-forms](https://react-hook-form.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [react-spotify-web-playback](https://www.npmjs.com/package/react-spotify-web-playback)
- [react-icons](https://react-icons.github.io/react-icons)
    
### Back End

[**Django**](https://www.djangoproject.com/) 

 **Libraries** 
- [numpy](https://numpy.org/)
- [aiohttp](https://docs.aiohttp.org/en/stable/)
- [asycio](https://docs.python.org/3/library/asyncio.html)
- [requests](https://requests.readthedocs.io/en/latest/)
   
## Database
DjangoOrm + Postgresql

### Postgresql Diagram

![drawSQL-spotify-export-2023-04-10](https://user-images.githubusercontent.com/101782117/230993348-9b67fc2e-12c1-4627-aeb7-07f434fdad98.png)

### Tables
**Users**

This table stores information about the users of the application. 

Each user has a one-to-one relationship with a Token.

**Fields**


- first_name: the user's first name
- last_name: the user's last name
- email: the user's email address
- password: the user's password
- profile_image_url: a URL for the user's profile image
- token_id: a foreign key to the Token table

**Tokens**
This table stores authentication tokens for users to access the Spotify API. Each Token has a one-to-one relationship with a User.

**Fields**


+ access_token: the access token attached to request headers to the Spotify API
+ refresh_token: the token used to get a new access token when the access token expires
+ token_type: the type of token (currently only "bearer")
+ user_id: a foreign key to the User table

**UserPlaylistCollection**
This table stores the collections of playlists belonging to each user in the system. 
Each UserPlaylistCollection has a one-to-many relationship with the Playlist table and a one-to-one relationship with the User table.

**Fields**

+ collection_id: a unique identifier for the collection
+ user_id: a foreign key to the User table

**Playlist**
This table stores the songs in a playlist. Each Playlist has a many-to-many relationship with the Song table.

**Fields**

+ name: the name of the playlist
+ collection_id: a foreign key to the UserPlaylistCollection table

**Song**
This table stores song names, artists, and playlists the song is in. Each Song has a many-to-many relationship with the Playlist and Artist tables.

Fields:

+ name: the name of the song

**Artist**
This table stores artist names, Spotify URIs, related songs, and associated genres. Each Artist has a many-to-many relationship with the Song and Genre tables.

**Fields**


+ name: the name of the artist
+ spotify_uri: the Spotify URI for the artist

**Genre**
This table stores genre names. Each Genre has a many-to-many relationship with the Artist table.

Fields:

+ genre_id: a unique identifier for the genre
+ name: the name of the genre


## Design Choices

### Fonts
Brand Font: [Rock Salt](https://fonts.google.com/specimen/Rock+Salt)

Primary Font: [LATO](https://fonts.google.com/specimen/Lato)

Rock Salt is a handwritten script font with a relaxed and casual feel. This font can convey a sense of creativity, friendliness, and approachability.

Lato, on the other hand, is a more traditional and professional-looking sans-serif font. This font is clean and modern and creates a sense of professionalism and clarity.

The combination of Rock Salt and Lato create a sense of balance between a relaxed and casual brand image and a professional and modern website design. This combination conveys a sense of approachability while still maintaining a professional image.

 

### Color Pallete:

<img width="999" alt="colorPallete" src="https://user-images.githubusercontent.com/101782117/231358950-80b3597c-7e43-4d33-ba92-7c2cf9ceb5ae.png">


Design Goal: Modern, Sophisticated, and Energetic

The use of dark purple as a background color creates a sense of depth and adds a touch of sophistication to the design. Using white for text and input backgrounds helps to create a clean and legible look, while the use of aquamarine for borders, buttons, and text adds a pop of bright color and creates a sense of energy and vitality.


Color Contrast

While Im still learning about web accessability standerds I'm Proud to state that the color design suprasses WCAG level AAA for contrast

White and Dark Purple contrast ratio 15.09:1

Aquamarine and Dark Purple contrast ratio 12.33:1

### UI/UX

+ Form Inputs are clearly focused 
+ Form Validation is unobtrusive 


## Encountered Problems


**Problem:** Spotify only has a small list of seed genres availible for reccomendation. i.e 50 reccomendation genres for the 1000+ genres associated with artists

Solution Filter Genres on backend and when user selects genres on frontend get random artists from local db that are associated with selcted genre



**Problem:** Slow saving of user data due to the multiple API requests needed to fetch and save artists information

Solution make requests asynchronously this dropped the avg load time from 8 seconds to 1.5 seconds
