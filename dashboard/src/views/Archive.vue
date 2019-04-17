<template>
  <v-container fluid>
    <FilterBar :showSentiment="showSentiment" @change-filter="invokeChangeFilter"/>
    <br>
    <TweetItem
      class="tweetItem"
      v-for="tweet in filteredTweetObj.slice(itemPerPage * (page - 1) , itemPerPage + itemPerPage * (page - 1))"
      :key="tweet.id"
      :id="tweet.id"
      :username="tweet.username"
      :tweetText="tweet.full_text"
      :sentimentType="tweet.sentiment_type"
      :subjectType="tweet.subject_type"
      :createdAt="tweet.created_at"
      :showAction="showAction"
    />

    <div style="margin:40px 0px;"></div>
    <div class="text-xs-center sticky-bottom">
      <v-pagination v-model="page" :length="calculateLength"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import FilterBar from "@/components/FilterBar";
import TweetItem from "@/components/TweetItem";

export default {
  name: "Archive",
  components: {
    FilterBar,
    TweetItem
  },
  data() {
    return {
      showAction: false,
      showSentiment: true,
      tweetObj: [
        {
          username: "@lmao",
          id: "1231234124",
          lang: "en",
          full_text: "Lorum Ipsum bla bla bla...",
          sentiment_type: "Negative",
          subject_type: "Objective",
          created_at: "30 minutes ago",
          is_done: true
        }
      ],
      page: 1,
      itemPerPage: 10,
      langFilter: "en",
      sentimentFilter: "latest",
      subjectFilter: "subjective"
    };
  },
  computed: {
    filteredTweetObj() {
      let filtered = [];
      for (var tweet of this.tweetObj) {
        if (
          tweet.lang === this.langFilter &&
          tweet.is_done &&
          (tweet.sentiment_type.toLowerCase() === this.sentimentFilter ||
            this.sentimentFilter === "") &&
          (tweet.subject_type.toLowerCase() === this.subjectFilter ||
            this.subjectFilter === "")
        ) {
          filtered.push(tweet);
        }
      }
      return filtered;
    },
    calculateLength() {
      return Math.ceil(this.filteredTweetObj.length / this.itemPerPage) >= 1
        ? Math.ceil(this.filteredTweetObj.length / this.itemPerPage)
        : 1;
    }
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
        case "negative":
          this.sentimentFilter = "negative";
          break;
        case "positive":
          this.sentimentFilter = "positive";
          break;
        case "neutral":
          this.sentimentFilter = "neatral";
          break;
        case "latest":
          this.sentimentFilter = "";
          this.subjectFilter = "";
          break;
        case "subjective":
          this.subjectFilter = "subjective";
          break;
        case "objective":
          this.subjectFilter = "objective";
          break;
        case "mixed":
          this.subjectFilter = "mixed";
          break;
        default:
      }
    },
    init() {
      this.$parent.$parent.$parent.updateComplete();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
