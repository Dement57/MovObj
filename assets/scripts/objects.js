const addMovieBtn = document.getElementById("add-movie-btn");
const searchMovieBtn = document.getElementById("search-btn");
const movieList = document.getElementById("movie-list");
const movies = [];

const toggleMovieItem = () => {
  movieList.style = "visible";
};

const renderMovies = (filter = "") => {
  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";

console.log('Before Filter', movies)

const filteredMovies = !filter
? movies
: movies.filter(movie => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement("li");
    if ('info' in movie){

    }

    const { info, ...otherProps } = movie; 
    console.log(otherProps)
    let { getFormattedTitle } = movie;
    // getFormattedTitle = getFormattedTitle.bind(movie)
    let text = getFormattedTitle.apply(movie) + " - ";
    for (const key in info) {
      if (key !== "title" && key !== '_title') {
        text = text + `${key}: ${info[key]}`;
      }
    }

    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      set title (value) {
        if (value.trim() === ''){
          this._title = 'DEFAULT';
          return;
        }
        this._title = value;
      },
      get title() {
        return this._title;
      },
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    getFormattedTitle() {
      console.log(this);
      return this.info.title.toUpperCase();
    }
  };

newMovie.info.title = title;
console.log(newMovie.info.title)

  movies.push(newMovie);
  console.log(newMovie);
  toggleMovieItem();
  renderMovies();
};

const New = () => {
  console.log("click");
};

const searchMovieHandler = function () {
  console.log(this);
  const searchInput = document.getElementById("filter-title").value;
  renderMovies(searchInput);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchMovieBtn.addEventListener("click", searchMovieHandler);