<style scoped>
  @import './assets/styles.css';
</style>

<script src="./sf-app.js"></script>

<template>
  <div id="app" :class="isG == true ? 'g' : ''">
    <main>
      <label class="title-label">
        If you love movies, and you love San Francisco, you're bound to love this.<br>
        A listing of filming locations of movies shot in San Francisco starting from 1924.<br>
        You'll find the titles, locations, fun facts, names of the director, writer, actors,<br>
        and studio for most of these films.
      </label>

      <!-- Search parameter -->
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search for a movie..."
          v-model='queryTitle'
          v-on:keypress='fetchMoviesByKeyPress'
          >
          <div style="text-align: right;">
            <label>{{nbMovies}} movies available</label>
          </div>
      </div>
      
      <div>
        <button
          class="search-button"
          v-on:click='fetchMovies'
          :disabled='disableSearchButton'
          >
            Search
        </button>
        <label class="search-label">The keyword must be at least 3 characters long</label>
      </div>

      <!-- Display search result -->
      <div class="list-movie-box" v-for="m in movie" v-bind:key="m.id">
        <button class="list-movie-item" v-on:click='selectMovie(m)'>
          {{m.title}}  ({{m.releaseYear}})
        </button>
      </div>
      <div class="selected-movie-box" v-if="this.selectedMovie != null">
        <div class="selected-movie-info">
          <button class="selected-movie-item">
            <p><strong class="movie-detail">Title : </strong><label class="movie-detail-title">{{selectedMovie.title}}</label></p>
            <p><strong class="movie-detail">Year : </strong>{{selectedMovie.releaseYear}}</p>
            <p><strong class="movie-detail">Director : </strong>{{selectedMovie.director}}</p>
            <p><strong class="movie-detail">Actor 1 : </strong>{{selectedMovie.actor1}}</p>
            <p><strong class="movie-detail">Actor 2 : </strong>{{selectedMovie.actor2}}</p>
            <p><strong class="movie-detail">Actor 3 : </strong>{{selectedMovie.actor3}}</p>
            <p><strong class="movie-detail">Writer : </strong>{{selectedMovie.writer}}</p>
            <p><strong class="movie-detail">Production company : </strong>{{selectedMovie.productionCompany}}</p>
            <p><strong class="movie-detail">Distributor : </strong>{{selectedMovie.distributor}}</p>
            <p><strong class="movie-detail">Locations : </strong>{{selectedMovie.locations}}</p>
            <p><strong class="movie-detail">Fun facts : </strong>{{selectedMovie.funFacts}}</p>
          </button>
        </div>

        <div class="selected-movie-info">
          <img
            class="movie-image"
            v-bind:src='selectedMovie.posterUrl'
            />
        </div>
      </div>
      <div class="unselected-movie-box" v-else>
          <p><strong class="unselected-movie">No movie selected</strong></p>
      </div>
    </main>
  </div>
</template>
