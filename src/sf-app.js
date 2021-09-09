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
      }
    }
  }