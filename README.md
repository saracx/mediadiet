# mediadiet 💿

Media Diet is a mixed media mixtape generator. After registration, users can create themed mixtapes (consisting of books, music and movies) and share them with friends. The project was made as final graduation demo for Spiced Academy Bootcamp, and is built on React with Redux and Node with Express.

Live demo on http://mediadiet.herokuapp.com

##Preview

![image](https://user-images.githubusercontent.com/77721622/116528613-565ae100-a8dc-11eb-80a8-81b8dcd86116.mp4)


# Features

- Auto-generate title, description, images and links for user mixtapes
- Edit drafted mixtapes, publish final mixtapes
- Share with friends who are not logged in
- Upvote mixtapes by "hearting" them
- Authenticate with Twitter

# APIs

Media Diet connects to Spotify (Music), rapidAPI (Movies) and Google (Books) for the mixtape search and generation. Users can optionally authenticate via Twitter API.

# Challenges / things I've learned from this project

## Spotify search API
Spotify search requests cannot be made client-side, or rather, the request cannot be authenticated client-side. The client has to phony a request to the server, which in turn gets the session tokens and provides them to the client. If you get a bad response about  

      {grant_type: 'client_credentials'}

this will most likely be the culprit. 

## Social Widget packages
It sounds trivial, but tweeting an URL from React surprisingly needs a bit of work. However that work is much, much better than using a package, of which most come loaded up with Twitters trackers and lots of bloat. 

## Google Books Search depends on user's location
You can't preset which language you want to search for on Google Books API. The search results will always depend on the user's location, which means that you could look for an English language title and still only get the German version (if you're based in Germany). This is annoying, but I couldn't find a better (read: easier to use) API, so I went with it.

# Things I wanted to do but then didn't
- Clean up CSS
- Refactor React into more reusable components instead of coordinating via global state
- Set up React without create-react-app
- Clean up my console logs 🤷
