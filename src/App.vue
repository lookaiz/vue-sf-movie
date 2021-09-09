<style scoped>
  @import './assets/styles.css';
</style>

<template>
  <div id="app" :class="isG == true ? 'g' : ''">
    <main>
      <label class="title-label">
        If you love movies, and you love San Francisco, you're bound to love this.<br>
        A listing of filming locations of movies shot in San Francisco starting from 1924.<br>
        You'll find the titles, locations, fun facts, names of the director, writer, actors, and studio for most of these films.
      </label>

      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search for a movie..."
          v-model='queryTitle'
          v-on:keypress='fetchMoviesByKeyPress'
          >
          <label>{{nbMovies}} movies available</label>
      </div>
      
  <!--     <div class="checkbox-box" v-for="(count, year) in movie.metadata" v-bind:key="year"> -->
  <!--       <input type="checkbox" v-model="movie.metadata[year]"> -->
  <!--       <label>{{ year }}'s ({{ count }})</label> -->
  <!--     </div> -->

      <div>
        <button
          class="search-button"
          v-on:click='fetchMovies'
          :disabled='disableSearchButton'
          >
            Search
        </button>
        <label
          class="search-label"
          :visibility='disableSearchLabel'
        >
        The keyword must be at least 3 characters long</label>
      </div>

      <!-- Display search result -->

      <!-- <div class="movie-wrap" v-if="typeof movie != 'undefined'"> -->
      <!--  <div class="movie-box"> -->
      <!--    <div class="movie-name">{{ movie.title }} => {{ movie.releaseYear }}</div> -->
      <!-- <div class="movie-name">{{ movie.metadata }}</div> -->
      <!-- <div class="release-year">{{ movie.releaseYear }}</div> -->
      <!-- </div> -->
      <!-- </div> -->

<!-- <div class="block_container"> -->
  
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
        <!-- <div class="selected-movie-info" v-else> -->
          <!-- <p><strong class="movie-detail">No movie selected</strong></p> -->
        <!-- </div> -->

        <div class="selected-movie-info">
          <img
            class="movie-image"
            v-bind:src='selectedMovie.posterUrl'
            />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',

  data() {
    return {
      url_base: 'http://localhost:8081/movies',
      queryTitle: '',
      queryYear: '',
      isG: false,
      nbMovies: {},
      movie: {},
      selectedMovie: null
    }
  },

  methods: {
    initMetadatas() {
      // Fetch metadatas
      fetch(`${this.url_base}/count`)
          .then(response => response.json())
          .then(this.setCount);
    },

    fetchMovies() {
      if (this.queryTitle.length >= 3) {
        fetch(`${this.url_base}/${this.queryTitle}`)
          .then(response => response.json())
          .then(this.setResult);
      }
    },

    fetchMoviesByKeyPress(e) {
      if (e.key == "Enter") {
        this.fetchMovies();
      }
    },

    setResult (result) {
      this.movie = result;
      if (this.movie.length == 0) {
        this.selectedMovie = null;
        this.isG = false;
      }
      else {
        this.isG = this.movie[0].title == 'Godzilla'

        if (this.movie.length == 1) {
          this.selectedMovie = this.movie[0];
        }
        else {
          this.selectedMovie = null;
        }
      }
    },

    setCount (count) {
      this.nbMovies = count;
    },

    selectMovie(m) {
      this.selectedMovie = m;
    }
  },

  mounted() {
    this.initMetadatas();
  },

  computed: {
    disableSearchButton() {
      return this.queryTitle.length < 3;
    },
    disableSearchLabel() {
      return 'hidden';
      /*if (this.queryTitle.length < 3) {
        return '';
      }
      else {
        return 'none';
      }
      */
    }

    // hasSelectedMovie() {
      // var selected = this.selectedMovie != null;
      // return selected;
    // }
  }
}
</script>
