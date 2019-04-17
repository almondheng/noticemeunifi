<template>
  <div>
    <v-card>
      <v-card-title>
        <v-icon color="primary" large left>link</v-icon>
        <span class="title font-weight-light">{{ username }}</span>
        <v-spacer/>
        <v-chip selected :class="sentimentClass">{{ sentimentType }}</v-chip>
      </v-card-title>

      <v-card-text>{{ tweetText }}</v-card-text>

      <v-card-actions>
        <v-list-tile class="grow">
          <v-list-tile-content>
            <v-list-tile-sub-title>{{ createdAt }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-spacer/>
          <div class="hidden-xs-only">
            <v-btn v-if="showAction" flat color="primary" @click="replyTweet(id)">Reply</v-btn>
            <v-btn v-if="showAction" flat color="primary" @click="messageTweet(id)">Message</v-btn>
          </div>

          <v-layout align-center justify-end v-if="showAction" style="max-width: 40px;">
            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-tile class="hidden-sm-and-up">
                  <v-list-tile-title @click="replyTweet(id)">Reply</v-list-tile-title>
                </v-list-tile>
                <v-list-tile class="hidden-sm-and-up">
                  <v-list-tile-title @click="messageTweet(id)">Message</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="dismissTweet">
                  <v-list-tile-title>Dismiss</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="markAsDoneTweet">
                  <v-list-tile-title>Mark as done</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-layout>
        </v-list-tile>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TweetItem",
  props: {
    id: String,
    username: String,
    tweetText: String,
    sentimentType: String,
    createdAt: String,
    showAction: Boolean
  },
  methods: {
    replyTweet(id) {
      this.$emit("reply-dialog", id);
    },
    messageTweet(id) {
      this.$emit("message-dialog", id);
    },
    dismissTweet() {},
    markAsDoneTweet() {}
  },
  computed: {
    sentimentClass() {
      switch (this.sentimentType) {
        case "Negative":
          return { negativeStyle: true };
        case "Positive":
          return { positiveStyle: true };
        default:
          return {};
      }
    }
  }
};
</script>

<style scoped>
.negativeStyle {
  color: rgba(204, 49, 70, 1);
  background-color: white
}

.positiveStyle {
  color: rgba(60, 21, 59, 1);
  background-color: white;
}
</style>