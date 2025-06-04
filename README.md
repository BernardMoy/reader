# Reader that gradually increases reading speed

An interesting idea that display a paragraph of words in increasing reading speeds. The average reader can read 238 words per minute (wpm) but when it gradually increases, you can read words at a much faster pace. 

# Features 
- Set the initial wpm and final wpm
- Set the duration for the increase in reading speed
- Display words one by one to read words fast

# Deployment

This react project can be deployed using npm (`npm install`):

```
npm run dev
```

Alternatively using docker compose: 
```
docker build -t reader .
docker run -p 5173:5173 reader
```
