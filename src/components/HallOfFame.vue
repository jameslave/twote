<template>
  <div class="hof-container row d-flex flex-wrap justify-content-center align-items-center">
    <div v-for="quote in firstTenQuotes"
      :key="quote.id"
      class="quote-card col-sm-12 col-md-4">
      <div class="quote-card__content">
        <div class="quote-card__quote">
          <h5>{{ quote.text }}</h5>
          <h6 class="quote-card__author">— {{ quote.author }}</h6>
        </div>
        <div class="quote-card__likes">
          <span>{{ quote.likes }}</span>
        </div>
      </div>
      <div class="quote-card__footer">
        <i class="quote-card__icon fa fa-heart fa-fw fa-lg"
          @click="likeQuote(quote)"></i>
        <i class="quote-card__icon fa fa-twitter fa-fw fa-lg"
          @click="tweetQuote(quote)"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quotes: null,
    }
  },

  computed: {
    firstTenQuotes() {
      const unsortedQuotes = this.quotes ? this.quotes.slice(0, 10) : [];
      const sortedQuotes = unsortedQuotes.sort((q1, q2) => q2.likes - q1.likes);
      return sortedQuotes;
    }
  },

  methods: {
    likeQuote(quote) {
      const quoteRef = this.$firebase.database().ref('quotes').child(`${quote.id}`);
      quoteRef
        .once('value', (snapshot) => {
          const likes = snapshot.val().likes;
          quoteRef.update({ likes: likes + 1 });
          quote.likes += 1;
        });
    },

    tweetQuote(quote) {
      const tweetText = `"${quote.text}" - ${quote.author}`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&hashtags=twote&url=https%3A%2F%2Ftwote.ml`;
      window.open(twitterUrl, '_blank');
    },
  },

  mounted() {
    const quotesRef = this.$firebase.database().ref('quotes');
    quotesRef.on('value', (snapshot) => {
      this.quotes = Object.values(snapshot.val());
    });
  },
}
</script>

<style>
.hof-container {
  max-height: 400px;
  overflow-y: scroll;
}

.quote-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
}

.quote-card__content {
  display: flex;
}

.quote-card__likes {
  margin-left: 1rem;
  width: 64px;
  height: 64px;
  background: url(../assets/like.png) no-repeat center center;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.quote-card__quote {
  text-align: right;
  flex: 3;
}

.quote-card__author {
  color: #ccc;
}

.quote-card__footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.quote-card__icon {}

.quote-card__icon {
  transition: color 0.2s;
}

.fa-heart:hover {
  color: rgb(255, 128, 128);
}

.fa-twitter:hover {
  color: #5bb0e5;
}
</style>
