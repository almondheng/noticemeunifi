<template>
  <v-container grid-list-md text-xs-left fluid>
    <v-layout v-resize="onResize" :row="row" :column="column" wrap>
      <v-flex xs4>
        <p>Language</p>
        <v-btn-toggle v-model="langFilter" mandatory>
          <v-btn color="primary" flat value="en">English</v-btn>
          <v-btn color="secondary" flat value="bm">Malay</v-btn>
        </v-btn-toggle>
      </v-flex>
      <br>
      <v-flex xs4 v-if="showSentiment">
        <p>Sentiment Type</p>
        <v-btn-toggle v-model="sentimentFilter" mandatory>
          <v-btn color="primary_alt" flat value="positive">Positive</v-btn>
          <v-btn color="secondary_alt" flat value="negative">Negative</v-btn>
          <v-btn color="special" flat value="latest">Latest</v-btn>
        </v-btn-toggle>
      </v-flex>
      <br>
      <v-flex xs4 v-if="showSentiment">
        <p>Subjectivity</p>
        <v-btn-toggle v-model="subjectFilter" mandatory>
          <v-btn color="primary" flat value="subjective">Subjective</v-btn>
          <v-btn color="secondary" flat value="objective">Objective</v-btn>
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
      sentimentFilter: "latest",
      subjectFilter: "subjective",
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
      this.$emit("change-filter", this.sentimentFilter);
    },
    subjectFilter() {
      this.$emit("change-filter", this.subjectFilter);
    }
  }
};
</script>

<style scoped>
.englishBtn {
  color: rgba(139, 30, 63, 1) !important;
}

.malayBtn {
  color: rgba(238, 108, 77, 1) !important;
}

.positiveBtn {
  color: rgba(60, 21, 59, 1) !important;
}

.negativeBtn {
  color: rgba(204, 49, 70, 1) !important;
}

.latestBtn {
  color: rgba(240, 201, 135, 1) !important;
}
</style>
