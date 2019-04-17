<template>
  <div>
    <v-card>
      <v-card-title>
        <v-icon color="primary" large left>link</v-icon>
        <span class="title font-weight-light">{{ nameFromJSON(username) }}</span>
        <span v-bind:style="{color: 'gray', fontsize: '12px'}">&nbsp;@{{ screenFromJSON(username) }}</span>
        <v-spacer/>
        <v-chip selected :class="sentimentClass">{{ sentimentType.toUpperCase() }}</v-chip>
        <v-chip selected :class="subjectClass">{{ subjectType }}</v-chip>
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
    id: Number,
    username: String,
    tweetText: String,
    sentimentType: String,
    subjectType: String,
    createdAt: String,
    showAction: Boolean
  },
  methods: {
    nameFromJSON(username) {
      var t1 = username.replace(new RegExp("'", 'g'), '"')
      var t2 = t1.replace(new RegExp('None', 'g'), '"None"')
      var t3 = t2.replace(new RegExp('False', 'g'), '"False"')
      var t4 = t3.replace(new RegExp('True', 'g'), '"True"')
      var json = JSON.stringify(eval("(" + t4 + ")"));
      var obj = JSON.parse(json)
      return obj.name
    },
    screenFromJSON(username) {
      var t1 = username.replace(new RegExp("'", 'g'), '"')
      var t2 = t1.replace(new RegExp('None', 'g'), '"None"')
      var t3 = t2.replace(new RegExp('False', 'g'), '"False"')
      var t4 = t3.replace(new RegExp('True', 'g'), '"True"')
      var json = JSON.stringify(eval("(" + t4 + ")"));
      var obj = JSON.parse(json)
      return obj.screen_name
    },
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
      switch (this.sentimentType.toLowerCase()) {
        case "negative":
          return { negativeStyle: true };
        case "positive":
          return { positiveStyle: true };
        default:
          return {};
      }
    },
    subjectClass() {
      // switch (this.subjectType.toLowerCase()) {
      switch (this.subjectType) {
        case "subjective":
          return { subjectiveStyle: true };
        case "objective":
          return { objectiveStyle: true };
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
  background-color: white;
}

.positiveStyle {
  color: rgba(60, 21, 59, 1);
  background-color: white;
}

.subjectiveStyle {
  color: rgba(139, 30, 63, 1);
  background-color: white;
}

.objectiveStyle {
  color: rgba(238, 108, 77, 1);
  background-color: white;
}


</style>
