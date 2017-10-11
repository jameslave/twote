<template>
  <div class="row d-flex justify-content-center align-items-center">
    <div class="col-sm-12 col-md-8">
      <table class="quote-table">
        <tr>
          <th class="text-center">Likes</th>
          <th>Quote</th>
          <th>Author</th>
          <th></th>
          <th></th>
        </tr>
        <tr :key="quote.id"
          v-for="quote in quotes">
          <td class="text-center">{{ quote.likes }}</td>
          <td>{{ quote.text }}</td>
          <td>{{ quote.author }}</td>
          <td class="text-center">
            <i class="fa fa-heart fa-fw"
              @click="likeQuote(quote)"></i>
          </td>
          <td class="text-center">
            <i class="fa fa-twitter fa-fw"
              @click="tweetQuote(quote)"></i>
          </td>
        </tr>
      </table>
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
table {
  width: 100%;
}

tr {
  border-bottom: 1px solid #eee;
}

th {
  padding: 0 .5rem 1rem;
}

td {
  padding: .5rem;
}
</style>
