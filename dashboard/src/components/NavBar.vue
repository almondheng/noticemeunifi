<template>
  <div>
    <v-toolbar color="grey" app>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="toggleDrawer"></v-toolbar-side-icon>
      <v-avatar class="logo" tile :size="avatarSize">
        <img src="@/assets/logo.png" alt="avatar">
      </v-avatar>
      <v-toolbar-title class="hidden-sm-and-up">{{ toolbarTitle }}</v-toolbar-title>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="navigation in navigationData"
          :key="navigation.key"
          :to="navigation.path"
          flat
        >{{ navigation.name }}</v-btn>
      </v-toolbar-items>
      <v-spacer/>
      <div class="hidden-xs-only">
        <v-layout row>
          <v-flex>
            <v-layout column style="margin-top: 5px;">
              <v-flex>
                <span>Last update:</span>
              </v-flex>
              <v-flex>
                <span><time-ago :datetime="updateTimestamp" refresh long style="color:black;"></time-ago></span>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-btn fab dark small color="primary" :loading="loading" :disabled="loading" @click="updateClicked">
              <v-icon>cached</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list subheader>
        <v-subheader>Navigation</v-subheader>
        <v-list-tile v-for="navigation in navigationData" :key="navigation.key">
          <v-list-tile-content>
            <v-btn :to="navigation.path" flat block>{{ navigation.name }}</v-btn>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader>Action</v-subheader>
        <v-list-tile>
          <v-list-tile-sub-title>Last update: <time-ago :datetime="updateTimestamp" refresh long style="color:black;"></time-ago></v-list-tile-sub-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-btn flat block :loading="loading" :disabled="loading" @click="updateClicked">Update</v-btn>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-btn flat block @click="toggleDrawer">Close</v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import TimeAgo from 'vue2-timeago'

export default {
  name: "Navbar",
  components: {
    TimeAgo,
  },
  data() {
    return {
      avatarSize: 40,
      toolbarTitle: "Notice Me",
      updateTimestamp: "",
      drawer: false,
      loading: false,
      navigationData: [
        {
          name: "Tweets",
          key: "tweets",
          path: "/home"
        },
        {
          name: "Topics",
          key: "topics",
          path: "/topics"
        },
        {
          name: "Archive",
          key: "archive",
          path: "/archive"
        }
      ]
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    updateClicked() {
      this.loading = true
      this.$emit("update-clicked")
    },
    stopLoading() {
      this.loading = false
      this.updateTimestamp = Date.now()
    }
  }
};
</script>

<style scoped>
.logo {
  margin: 0px 30px;
}
</style>
