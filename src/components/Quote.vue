<template>
  <div class="row d-flex flex-wrap justify-content-center align-items-center">
    <div class="quote col-sm-12 col-md-8">
      <div>
        <div class="quote__text">{{ quote.text }}</div>
        <div class="quote__author">{{ quote.author }}</div>
      </div>
    </div>
    <div class="col-sm-12 col-md-1">
      <div class="quote__btns text-center">
        <i class="icon-refresh fa fa-refresh fa-fw"
          :class="{'fa-spin': loading}"
          @click="getQuote"></i>
        <i class="icon-like fa fa-heart fa-fw animated"
          :class="{'icon-like--active': liked, 'tada': liked}"
          @click="likeQuote"></i>
        <i class="icon-tweet fa fa-twitter fa-fw"
          @click="tweetQuote"></i>
      </div>
    </div>
  </div>
</template>

<script>
import mongoid from 'mongoid-js';

export default {
  data() {
    return {
      quote: null,
      liked: false,
      loading: false,
    }
  },

  methods: {
    getQuote() {
      this.loading = true;
      setTimeout(() => {
        this.$http.get('https://us-central1-twote-c9c93.cloudfunctions.net/generate')
          .then((response) => {
            this.quote = response.data;
            this.quote.id = mongoid();
            this.loading = false;
            this.liked = false;
          }, (error) => {
            console.error(error);
          });
      }, 500);
    },

    likeQuote() {
      const quotesRef = this.$firebase.database().ref('quotes');
      this.liked = !this.liked;
      const quoteRef = quotesRef.child(`${this.quote.id}`);
      if (this.liked) { // if post liked
        quoteRef
          .once('value')
          .then(snapshot => {
            if (snapshot.val()) {
              const likes = snapshot.val().likes;
              quoteRef.update({ likes: likes + 1 });
            } else {
              quoteRef.set({
                id: this.quote.id,
                text: this.quote.text,
                author: this.quote.author,
                likes: 1,
              });
            }
          });
      } else { // if post unliked
        quoteRef
          .once('value')
          .then(snapshot => {
            const likes = snapshot.val().likes;
            if (likes <= 1) {
              quoteRef.remove();
            } else {
              quoteRef.update({ likes: likes - 1 });
            }
          });
      }
    },

    tweetQuote() {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${this.quote.tweet}&hashtags=twote&url=https%3A%2F%2Ftwote.ml`;
      window.open(twitterUrl, '_blank');
    },
  },

  mounted() {
    this.getQuote();
  },
}
</script>

<style>
.quote {
  border-right: 1px solid #ddd;
  padding-right: 1rem;
  letter-spacing: 0.05rem;
  text-align: right;
  min-height: 100px;
}

@media (max-width: 768px) {
  .quote {
    text-align: center;
    border-right: none;
  }
}

.quote__text {
  font-size: 1.7rem;
}

.quote__author {
  font-size: 1rem;
  color: #ccc;
  margin: 1rem 0;
}

.quote__btns {
  font-size: 2rem;
}

.quote__btns>i {
  padding: 0 0.5rem;
}

.icon-refresh {
  transition: color 0.2s;
}

.icon-refresh:hover {
  color: rgb(128, 255, 128);
}

.icon-like {
  transition: color 0.2s;
}

.icon-like--active {
  color: rgb(255, 64, 64);
}

.icon-like:hover {
  color: rgb(255, 128, 128);
}

.icon-tweet {
  transition: color 0.2s;
}

.icon-tweet:hover {
  color: rgb(128, 128, 255);
}
</style>
