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
      @reply-dialog="invokeReplyDialog"
      @message-dialog="invokeMessageDialog"
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
// import { generateFile } from "@/api";
import { getTweets } from "@/api";

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
      tweetObj: [
        {
          username: "@lmao",
          id: "1231234124",
          full_text: "Lorum Ipsum bla bla bla...",
          lang: "en",
          sentiment_type: "Negative",
          subject_type: "Subjective",
          created_at: "30 minutes ago",
          is_done: false
        },
        {
          username: "@lmao",
          id: "123123424",
          full_text: "Lorum Ipsum bla bla bla...",
          lang: "en",
          sentiment_type: "Positive",
          subject_type: "Subjective",
          created_at: "30 minutes ago",
          is_done: false
        },
        {
          username: "@lmao",
          id: "12312342444",
          full_text: "Lorum Ipsum bla bla bla...",
          lang: "en",
          sentiment_type: "Positive",
          subject_type: "Subjective",
          created_at: "30 minutes ago",
          is_done: false
        },
        {
          username: "@lmao",
          id: "1231231242444",
          full_text: "Lorum Ipsum bla bla bla...",
          lang: "bm",
          sentiment_type: "Positive",
          subject_type: "Objective",
          created_at: "30 minutes ago",
          is_done: false
        },
        {
          username: "@lmao",
          id: "1231234542444",
          full_text: "Lorum Ipsum bla bla bla...",
          lang: "bm",
          sentiment_type: "Negative",
          subject_type: "Objective",
          created_at: "30 minutes ago",
          is_done: false
        }
      ],
      dialog: false,
      dialogLabel: "",
      dialogTweetText: "",
      dialogSendLabel: "",
      replyToId: "",
      messageToId: "",
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
          !tweet.is_done &&
          (tweet.sentiment_type.toLowerCase() === this.sentimentFilter ||
            this.sentimentFilter === "latest") &&
          tweet.subject_type.toLowerCase() === this.subjectFilter
        ) {
          filtered.push(tweet);
        }
      }
      return filtered;
    },
    calculateLength() {
      return Math.ceil(this.filteredTweetObj.length / this.itemPerPage) >= 1 ? Math.ceil(this.filteredTweetObj.length / this.itemPerPage) : 1;
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
        case "latest":
          this.sentimentFilter = "latest";
          break;
        case "subjective":
          this.subjectFilter = "subjective";
          break;
        case "objective":
          this.subjectFilter = "objective";
          break;
        default:
      }
    },
    init() {
      getTweets()
        .then(result => {
          //eslint-disable-next-line
          console.log(result);
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
