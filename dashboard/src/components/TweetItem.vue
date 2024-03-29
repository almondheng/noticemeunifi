<template>
  <div>
    <v-card>
      <v-card-title>
        <a :href="src" target="_blank"><v-icon color="primary" large left>link</v-icon></a>
        <span class="title font-weight-light">{{ nameFromJSON(username) }}</span>
        <span v-bind:style="{color: 'gray', fontsize: '12px'}">&nbsp;@{{ screenFromJSON(username) }}</span>
        <v-spacer/>
        <v-chip selected :class="sentimentClass">{{ sentimentType.toUpperCase() }}</v-chip>
        <v-chip selected :class="subjectClass">{{ subjectType.toUpperCase() }}</v-chip>
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
            <v-btn v-if="showAction" flat color="primary" @click="messageTweet(username)">Message</v-btn>
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
import { postIsDone } from "@/api"
import { postDismiss } from "@/api"

export default {
  name: "TweetItem",
  props: {
    id: String,
    username: String,
    tweetText: String,
    sentimentType: String,
    subjectType: String,
    createdAt: String,
    showAction: Boolean,
    src: String
  },
  methods: {
    jsonify(username) {
      var t1 = username.replace(new RegExp("'", 'g'), '"')
      var t2 = t1.replace(new RegExp('None', 'g'), '"None"')
      var t3 = t2.replace(new RegExp('False', 'g'), '"False"')
      var t4 = t3.replace(new RegExp('True', 'g'), '"True"')
      var json = JSON.stringify(eval('(' + t4 + ')'));
      var obj = JSON.parse(json)
      return obj
    },
    idFromJSON(username) {
      const obj = this.jsonify(username)
      return obj.id_str
    },
    nameFromJSON(username) {
      const obj = this.jsonify(username)
      return obj.name
    },
    screenFromJSON(username) {
      const obj = this.jsonify(username)
      return obj.screen_name
    },
    replyTweet(id) {
      this.$emit("reply-dialog", id);
    },
    messageTweet(username) {
      const id = this.idFromJSON(username)
      this.$emit("message-dialog", id);
    },
    dismissTweet() {
      let param = {"id": this.id}
      postDismiss(param).then(() => {
        this.$parent.$parent.$parent.$parent.openAlert(
            "success",
            "Tweet dismissed."
          );
          this.$emit("recompute-data")
      }).catch(() => {
          this.$parent.$parent.$parent.$parent.openAlert(
            "error",
            "Request failed, please try again."
          );
        });
    },
    markAsDoneTweet() {
      let param = {"id": this.id}
      postIsDone(param).then(() => {
        this.$parent.$parent.$parent.$parent.openAlert(
            "success",
            "Tweet is marked as done."
          );
          this.$emit("recompute-data")
      }).catch(() => {
          this.$parent.$parent.$parent.$parent.openAlert(
            "error",
            "Request failed, please try again."
          );
        });
    }
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
      switch (this.subjectType.toLowerCase()) {
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
  color: rgba(0, 128, 0, 1);
  background-color: white;
}

.subjectiveStyle {
  color: rgba(102, 0, 255, 1);
  background-color: white;
}

.objectiveStyle {
  color: rgba(0, 102, 255, 1);
  background-color: white;
}


</style>
