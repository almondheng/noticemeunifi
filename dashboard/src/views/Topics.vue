<template>
  <v-container fluid>
    <FilterBar :showSentiment="showSentiment" @change-filter="invokeChangeFilter"/>
    <br>
    <iframe
      class="hidden-xs-only"
      v-if="this.langFilter === 'en'"
      id="enChart"
      src="https://bde99f02.ngrok.io/english"
    ></iframe>
    <iframe
      class="hidden-xs-only"
      v-if="this.langFilter === 'bm'"
      id="bmChart"
      src="https://bde99f02.ngrok.io/malay"
    ></iframe>
    <apexchart
      class="hidden-sm-and-up"
      v-if="this.langFilter === 'en'"
      width="100%"
      type="heatmap"
      :options="options"
      :series="series0"
    ></apexchart>
    <apexchart
      class="hidden-sm-and-up"
      v-if="this.langFilter === 'en'"
      width="100%"
      type="heatmap"
      :options="options"
      :series="series1"
    ></apexchart>
    <apexchart
      class="hidden-sm-and-up"
      v-if="this.langFilter === 'en'"
      width="100%"
      type="heatmap"
      :options="options"
      :series="series2"
    ></apexchart>
    <apexchart
      class="hidden-sm-and-up"
      v-if="this.langFilter === 'bm'"
      width="100%"
      type="heatmap"
      :options="options"
      :series="series_bm0"
    ></apexchart>
    <apexchart
      class="hidden-sm-and-up"
      v-if="this.langFilter === 'bm'"
      width="100%"
      type="heatmap"
      :options="options"
      :series="series_bm1"
    ></apexchart>
    <apexchart
      class="hidden-sm-and-up"
      v-if="this.langFilter === 'bm'"
      width="100%"
      type="heatmap"
      :options="options"
      :series="series_bm2"
    ></apexchart>
  </v-container>
</template>

<script>
import FilterBar from "@/components/FilterBar";
import { getEnTopic } from "@/api";
import { getBmTopic } from "@/api";

const options = {
  plotOptions: {
    heatmap: {
      colorScale: {
        ranges: [
          {
            from: 4,
            to: 5,
            color: "#00A100",
            name: "low"
          },
          {
            from: 3,
            to: 3,
            color: "#128FD9",
            name: "medium"
          },
          {
            from: 1,
            to: 2,
            color: "#FFB200",
            name: "high"
          }
        ]
      }
    }
  }
};

export default {
  name: "Topics",
  components: {
    FilterBar
  },
  data() {
    return {
      showSentiment: false,
      langFilter: "en",
      engSentiment: [],
      malaySentiment: [],
      options
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
    },
    init() {
      getEnTopic()
        .then(result => {
          this.engSentiment = result.data;
        })
        .catch(e => {
          //eslint-disable-next-line
          console.log(e);
        });
      getBmTopic()
        .then(result => {
          this.malaySentiment = result.data;
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
      document.getElementById("enChart").src = document.getElementById(
        "enChart"
      ).src;
      document.getElementById("bmChart").src = document.getElementById(
        "bmChart"
      ).src;
      this.$parent.$parent.$parent.updateComplete();
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    series() {
      var returnSeries = [];
      for (var index in this.engSentiment) {
        var i = 1;
        var data = [];
        for (var item of Object.keys(this.engSentiment[index])) {
          data.push({
            x: this.engSentiment[index][item],
            y: i
          });
          i++;
        }
        var obj = {
          name: "Topics",
          data: data
        };
        returnSeries.push(obj);
      }
      return returnSeries;
    },
    series0() {
      return [this.series[0]];
    },
    series1() {
      return [this.series[1]];
    },
    series2() {
      return [this.series[2]];
    },
    series_bm() {
      var returnSeries = [];
      for (var index in this.malaySentiment) {
        var i = 1;
        var data = [];
        for (var item of Object.keys(this.engSentiment[index])) {
          data.push({
            x: this.engSentiment[index][item],
            y: i
          });
          i++;
        }
        var obj = {
          name: "Topics",
          data: data
        };
        returnSeries.push(obj);
      }
      return returnSeries;
    },
    series_bm0() {
      return [this.series_bm[0]]
    },
    series_bm1() {
      return [this.series_bm[1]]
    },
    series_bm2() {
      return [this.series_bm[2]]
    }
  }
};
</script>

<style scoped>
iframe {
  display: block; /* iframes are inline by default */
  border: none; /* Reset default border */
  height: 70vh; /* Viewport-relative units */
  width: 95vw;
}
</style>
