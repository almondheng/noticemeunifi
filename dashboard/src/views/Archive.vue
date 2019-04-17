<template>
  <v-container fluid>
    <FilterBar :showSentiment="showSentiment" @change-filter="invokeChangeFilter"/>
    <br>
    <TweetItem
      class="tweetItem"
      v-for="tweet in filteredTweetObj.slice(itemPerPage * (page - 1) , itemPerPage + itemPerPage * (page - 1))"
      :key="tweet.id_str"
      :id="tweet.id_str"
      :username="tweet.user"
      :tweetText="tweet.full_text"
      :sentimentType="tweet.sentiment"
      :subjectType="tweet.subjectivity"
      :createdAt="tweet.created_at"
      :src="'https://twitter.com/user/status/'.concat(tweet.id_str)"
      :showAction="showAction"
      @recompute-data="recomputeFilteredObj"
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
import { getTweets } from "@/api";
import { getIsDone } from "@/api";
import { getDismiss } from "@/api";

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
      tweetObj: [],
      page: 1,
      itemPerPage: 10,
      langFilter: "en",
      sentimentFilter: "",
      subjectFilter: ""
    };
  },
  computed: {
    filteredTweetObj() {
      let filtered = [];
      for (var tweet of this.tweetObj) {
        tweet.lang === "ENGLISH" ? (tweet._lang = "en") : (tweet._lang = "bm");
        if (
          tweet._lang === this.langFilter &&
          (tweet.sentiment.toLowerCase() === this.sentimentFilter ||
            this.sentimentFilter === "") &&
          (tweet.subjectivity.toLowerCase() === this.subjectFilter ||
            this.subjectFilter === "") &&
          this.doneId.includes(tweet.id_str) &&
          !this.dismissedId.includes(tweet.id_str)
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
          this.sentimentFilter = "neutral";
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
    recomputeFilteredObj() {
      this.init();
    },
    init() {
      this.getBlacklist();
      getTweets()
        .then(result => {
          this.tweetObj = result.data;
          this.$parent.$parent.$parent.openAlert(
            "success",
            "Updated successfully."
          );
          this.$parent.$parent.$parent.updateComplete();
        })
        .catch(e => {
          //eslint-disable-next-line
          console.log(e);
          this.$parent.$parent.$parent.openAlert(
            "error",
            "Request failed, please try again."
          );
          this.$parent.$parent.$parent.updateComplete();
        });
    },
    getBlacklist() {
      getIsDone()
        .then(result => {
          this.doneId = result.data;
        })
        .catch(e => {
          //eslint-disable-next-line
          console.log(e);
        });
      getDismiss()
        .then(result => {
          this.dismissedId = result.data;
        })
        .catch(e => {
          //eslint-disable-next-line
          console.log(e);
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
