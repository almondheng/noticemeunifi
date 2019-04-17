<template>
  <v-container fluid>
    <FilterBar :showSentiment="showSentiment" @change-filter="invokeChangeFilter"/>
    <br>
    <iframe src="http://bde99f02.ngrok.io/chart"></iframe>
  </v-container>
</template>

<script>
import FilterBar from "@/components/FilterBar";

export default {
  name: "Topics",
  components: {
    FilterBar
  },
  data() {
    return {
      showSentiment: false,
      langFilter: "en"
    };
  },
  methods: {
    invokeChangeFilter(filter) {
      switch (filter) {
        case "en":
          this.langFilter = "en";
          break;
        case "bm":
          this.langFilter = "bm";
          break;
        default:
      }
    }
  }
};
</script>

<style scoped>
iframe {
  display: block; /* iframes are inline by default */
  border: none; /* Reset default border */
  height: 70vh; /* Viewport-relative units */
  width: 95vw;
}
</style>
