<template>
  <v-container grid-list-md text-xs-left fluid>
    <v-layout v-resize="onResize" :row="row" :column="column" wrap>
      <v-flex xs6>
        <p>Language</p>
        <v-btn-toggle v-model="langFilter" mandatory>
          <v-btn color="primary" flat value="en">English</v-btn>
          <v-btn color="secondary" flat value="bm">Malay</v-btn>
        </v-btn-toggle>
      </v-flex>
      <br>
      <v-flex xs6 v-if="showSentiment">
        <p>Latest</p>
        <v-btn-toggle v-model="latestFilter">
          <v-btn color="special" flat value="latest">Latest</v-btn>
        </v-btn-toggle>
      </v-flex>
    </v-layout>
    <br>
    <v-layout  v-if="showSentiment" v-resize="onResize" :row="row" :column="column" wrap>
      <v-flex xs6>
        <p>Sentiment Type</p>
        <v-btn-toggle v-model="sentimentFilter">
          <v-btn color="positive" flat value="positive">Positive</v-btn>
          <v-btn color="negative" flat value="negative">Negative</v-btn>
          <v-btn color="neutral" flat value="neutral">Neutral</v-btn>
        </v-btn-toggle>
      </v-flex>
      <br>
      <v-flex xs6>
        <p>Subjectivity</p>
        <v-btn-toggle v-model="subjectFilter">
          <v-btn color="subjective" flat value="subjective">Subjective</v-btn>
          <v-btn color="objective" flat value="objective">Objective</v-btn>
          <v-btn color="neutral" flat value="mixed">Mixed</v-btn>
        </v-btn-toggle>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "FilterBar",
  props: {
    showSentiment: Boolean
  },
  data() {
    return {
      langFilter: "en",
      sentimentFilter: "",
      subjectFilter: "",
      latestFilter: "latest",
      row: true,
      column: false
    };
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      if (window.innerWidth < 600) {
        this.row = false;
        this.column = true;
      } else {
        this.row = true;
        this.column = false;
      }
    },
    changeFilter() {}
  },
  watch: {
    langFilter() {
      this.$emit("change-filter", this.langFilter);
    },
    sentimentFilter() {
      this.latestFilter = undefined
      this.$emit("change-filter", this.sentimentFilter);
    },
    subjectFilter() {
      this.latestFilter = undefined
      this.$emit("change-filter", this.subjectFilter);
    },
    latestFilter() {
      if (this.latestFilter === "latest") {
        this.sentimentFilter = undefined
        this.subjectFilter = undefined
      }
      this.$emit("change-filter", this.latestFilter)
    }
  }
};
</script>
