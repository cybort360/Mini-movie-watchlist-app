'use strict';

const movieApp = {
  movies: [],

  addMovie() {
    const askTitle = prompt('What movie do you want to add to your watchlist');
    const askGenre = prompt('What is the genre of the movie');
    const askYear = Number(prompt('What year was the movie released'));
    let watched = false;

    if (!askTitle || askTitle.trim() === '') {
      console.warn('You need to input a movie name');
      return;
    }

    if (!askGenre || askGenre.trim() === '') {
      console.warn('You need to input the genre of the movie');
      return;
    }

    if (!askYear || !Number.isFinite(askYear)) {
      console.warn('You need to input the year the movie was released');
      return;
    }

    const title = askTitle[0].toUpperCase() + askTitle.slice(1).toLowerCase();
    const genre = askGenre[0].toUpperCase() + askGenre.slice(1).toLowerCase();

    const movieObj = { title: title, genre: genre, year: askYear, watched: watched };
    const status = movieObj.watched ? 'Watched' : 'Not watched';
    this.movies.push(movieObj);
    console.log(
      `Movie added!\nTitle - ${movieObj.title}\nGenre - ${movieObj.genre}\nYear of release - ${movieObj.year}\nWatch status - ${status}`
    );
    console.log(this.movies);
  },

  viewWatchlist() {
    if (this.movies.length === 0) {
      console.log('Watchlist is empty');
      return;
    }

    for (const [index, movie] of this.movies.entries()) {
      const status = movie.watched ? 'Watched' : 'Not watched';
      console.log(
        `${index + 1} - Title: ${movie.title} | Genre: ${movie.genre} | Year: ${movie.year} | Status: ${status}`
      );
    }
  },

  markAsWatched() {
    if (this.movies.length === 0) {
      console.log('Watchlist is empty');
      return;
    }

    const movieTitle = prompt('Movie title');
    if (!movieTitle || movieTitle.trim() === '') {
      console.warn('Input cannot be empty');
      return;
    }

    const watchedTitle = movieTitle[0].toUpperCase() + movieTitle.slice(1).toLowerCase();
    let isWatched = false;

    for (const movie of this.movies) {
      if (movie.title === watchedTitle) {
        isWatched = true;
        if (movie.watched) {
          console.log(`${movie.title} already been watched ✅`);
        } else {
          movie.watched = true;
          console.log(`${movie.title} marked as watched ✅`);
        }
        break;
      }
    }

    if (!isWatched) {
      console.log('Movie not found');
    }
  },

  deleteMovie() {
    if (this.movies.length === 0) {
      console.log('Watchlist is empty');
      return;
    }

    const movieToDelete = prompt('Movie title');
    if (!movieToDelete || movieToDelete.trim() === '') {
      console.warn('Input cannot be empty');
      return;
    }

    const toDelete = movieToDelete[0].toUpperCase() + movieToDelete.slice(1).toLowerCase();
    let index = -1;

    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].title === toDelete) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      const confirmDelete = confirm(`Are you sure you want to delete ${this.movies[index].title}?`);
      if (confirmDelete) {
        this.movies.splice(index, 1);
        console.log(`${toDelete} removed from watchlist`);
      } else {
        console.log('Deletion canceled');
      }
    } else {
      console.log('Movie not found');
    }
  },

  clearWatchlist() {
    if (this.movies.length === 0) {
      console.log('Watchlist is already empty');
      return;
    }

    const confirmClearWatchlist = confirm('Are you sure you want to clear your entire watchlist?');
    if (confirmClearWatchlist) {
      this.movies = [];
      console.log('Watchlist cleared');
    } else {
      console.log('Action cancelled');
    }
  },
};

document.querySelector('.add-movie').addEventListener('click', movieApp.addMovie.bind(movieApp));
document.querySelector('.view-watchlist').addEventListener('click', movieApp.viewWatchlist.bind(movieApp));
document.querySelector('.mark-as-watched').addEventListener('click', movieApp.markAsWatched.bind(movieApp));
document.querySelector('.delete-movie').addEventListener('click', movieApp.deleteMovie.bind(movieApp));
document.querySelector('.clear-watchlist').addEventListener('click', movieApp.clearWatchlist.bind(movieApp));
