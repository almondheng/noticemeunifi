<template>
  <v-container fluid>
    <FilterBar :showSentiment="showSentiment" @change-filter="invokeChangeFilter"/>
    <br>
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
