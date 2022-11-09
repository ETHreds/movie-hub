const movieListContainer = document.getElementById('movie-list-container');
const moviePoster = document.getElementById('movie-poster');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let moviesArray = [];

// Movie API
const apiUrl = 'https://yts.mx/api/v2/list_movies.json?quality=3D';

function imageLoaded(){
  imagesLoaded++;
  if (imagesLoaded === totalImages){
    ready = true;

  }
}
// Create elements forlinks and add to DOM
function displayPosters() {
  imagesLoaded = 0;
  totalImages = moviesArray.length;
  moviesArray.forEach( movie => {
    // create anchor element to link  description page
    const item = document.createElement('a');
    item.setAttribute('href','./description.html');
    item.setAttribute('target','_blank');


    // create <img> for poster
    const img = document.createElement('img');
    img.setAttribute('src', movie.medium_cover_image);
    img.setAttribute('title', movie.title);
    img.setAttribute('alt', movie.title);

    // Card text 
    const cardText = document.createElement('div');
    cardText.setAttribute('class', 'text_container');

    const movieTitle =document.createElement('h3');
    movieTitle.setAttribute('class', 'movie_title');
    movieTitle.textContent=movie.title;

    const movieRating =document.createElement('p');
    movieRating.setAttribute('class', 'movie_rating');
    movieRating.textContent=`${movie.rating}`+'☆';

    // different class list dependig on rating
    if (movie.rating >= 8){
      movieRating.setAttribute('class', 'movie_rating high_rating');
    }else if(movie.rating < 8 && movie.rating  >= 6){
      movieRating.setAttribute('class', 'movie_rating moderate_rating'); 
    }


    // Load event
    img.addEventListener('load',imageLoaded())
    // Put image inside <a> the both to DOM

    cardText.appendChild(movieTitle);
    cardText.appendChild(movieRating);

    item.appendChild(cardText);
    item.appendChild(img);
    movieListContainer.appendChild(item);

  });
  
}


  // Get movie information from API
async function getMovies() {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    const temp = result.data.movies;

    moviesArray = [...temp];

    console.log(moviesArray)
    console.log(moviesArray.medium_cover_image);

    displayPosters();

  } catch (error) {
    // CAtch Error
  }
  
}
// Scroll 
window.addEventListener('scroll',()=>{
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getMovies();
   
  }
});

getMovies();
