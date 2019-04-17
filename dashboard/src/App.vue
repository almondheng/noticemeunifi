<template>
  <v-app>
    <v-content v-resize="onResize">
      <NavBar @update-clicked="updateVue" ref="navBar"/>
      <router-view ref="childRef"/>
      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
        :color="color"
        @open-alert="openAlert"
      >
        {{ text }}
        <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  },
  data() {
    return {
      snackbar: false,
      text: "",
      color: "",
      y: "top",
      x: null,
      mode: "",
      timeout: 6000
    };
  },
  methods: {
    openAlert(color, statusText) {
      this.color = color
      this.snackbar = true
      this.text = statusText;
    },
    updateVue() {
      this.$refs.childRef.init()
    },
    updateComplete() {
      this.$refs.navBar.stopLoading()
    },
    onResize() {
      if (window.innerWidth < 600) {
        this.mode = "vertical"
      } else {
        this.mode = ""
      }
    }
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  }
};
</script>
