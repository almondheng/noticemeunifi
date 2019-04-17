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
      @reply-dialog="invokeReplyDialog"
      @message-dialog="invokeMessageDialog"
      @recompute-data="recomputeFilteredObj"
    />

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>{{ dialogLabel }}</v-card-title>
        <v-card-text>
          <v-textarea solo v-model="dialogTweetText"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="closeDialog">Close</v-btn>
          <v-btn color="primary" flat @click="sendTweet">{{ dialogSendLabel }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div style="margin:40px 0px;"></div>
    <div class="text-xs-center sticky-bottom">
      <v-pagination v-model="page" :length="calculateLength"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import FilterBar from "@/components/FilterBar";
import TweetItem from "@/components/TweetItem";
//import { generateFile } from "@/api";
import { getTweets } from "@/api";
import { getIsDone } from "@/api";
import { getDismiss } from "@/api";

export default {
  name: "Home",
  components: {
    FilterBar,
    TweetItem
  },
  data() {
    return {
      showAction: true,
      showSentiment: true,
      tweetObj: [],
      dismissedId: [],
      doneId: [],
      dialog: false,
      dialogLabel: "",
      dialogTweetText: "",
      dialogSendLabel: "",
      replyToId: "",
      messageToId: "",
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
          !this.doneId.includes(tweet.id_str) &&
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
    invokeReplyDialog(id) {
      this.dialogLabel = "Reply";
      this.dialogSendLabel = "Reply";
      this.dialog = true;
      this.replyToId = id;
    },
    invokeMessageDialog(id) {
      this.dialogLabel = "Message";
      this.dialogSendLabel = "Message";
      this.dialog = true;
      this.messageToId = id;
    },
    closeDialog() {
      this.dialog = false;
      this.dialogTweetText = "";
    },
    sendTweet() {
      if (this.dialogLabel === "Reply") {
        // eslint-disable-next-line
        console.log("Reply to " + this.replyToId + ": " + this.dialogTweetText);
      } else if (this.dialogLabel === "Message") {
        // eslint-disable-next-line
        console.log(
          "Message to " + this.messageToId + ": " + this.dialogTweetText
        );
      }
      this.closeDialog();
    },
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

<style>
.tweetItem {
  margin-bottom: 15px;
}

.sticky-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 15px 0px;
}
</style>
