<template>
  <div class="container quote-container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="quote col-sm-12 col-md-6">
        <transition enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut">
          <div v-if="quote">
            <div class="quote__text">{{ quote.text }}</div>
            <div class="quote__author">{{ quote.author }}</div>
          </div>
        </transition>
        <div class="quote__btns">
          <i class="icon-refresh fa fa-refresh fa-fw"
            :class="{'fa-spin': !quote}"
            @click="getQuote"></i>
          <i class="icon-like fa fa-heart fa-fw"
            @click="likeQuote"></i>
          <i class="icon-tweet fa fa-twitter fa-fw"
            @click="tweetQuote"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      quote: null,
    }
  },

  methods: {
    getQuote() {
      this.quote = null;
      setTimeout(() => {
        this.$http.get('https://us-central1-twote-c9c93.cloudfunctions.net/generate')
          .then((response) => {
            this.quote = response.data;
          }, (error) => {
            console.error(error);
          });
      }, 500);
    },

    likeQuote() {

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

.icon-like:hover {
  color: rgb(255, 64, 128);
}

.icon-tweet {
  transition: color 0.2s;
}

.icon-tweet:hover {
  color: rgb(64, 128, 255);
}
</style>
