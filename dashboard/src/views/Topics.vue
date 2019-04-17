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
    <apexchart class="hidden-sm-and-above" v-if="this.langFilter === 'en'" width="100%" type="heatmap" :options="options" :series="series"></apexchart>
    <apexchart class="hidden-sm-and-above" v-if="this.langFilter === 'bm'" width="100%" type="heatmap" :options="options" :series="series_bm"></apexchart>
  </v-container>
</template>

<script>
import FilterBar from "@/components/FilterBar";
import { getEnTopic } from "@/api"
import { getBmTopic } from "@/api"

const options = {
  plotOptions: {
    heatmap: {
      colorScale: {
        ranges: [{
            from: 4,
            to: 5,
            color: '#00A100',
            name: 'low',
          },
          {
            from: 3,
            to: 3,
            color: '#128FD9',
            name: 'medium',
          },
          {
            from: 1,
            to: 2,
            color: '#FFB200',
            name: 'high',
          }
        ]
      }
    }
  }
}

// const series = [
//   {
//     name: "Series 1",
//     data: [{
//         x: 'Topic 1',
//         y: '1'
//       }, {
//         x: 'Topic 2',
//         y: '2'
//       }, {
//         x: 'Topic 3',
//         y: '3'
//       }, {
//         x: 'Topic 4',
//         y: '4'
//       }, {
//         x: 'Topic 5',
//         y: '5'
//       }]
//   }
// ]


// const dataSource = {
//   chart: {
//     caption: "Top 5 Topics",
//     subcaption: "2002-2017",
//     theme: "fusion",
//     valuefontsize: "12",
//     showlabels: "1",
//     showvalues: "1",
//     showplotborder: "1",
//     placexaxislabelsontop: "1",
//     mapbycategory: "0",
//     showlegend: "0",
//     plottooltext:
//       "<b>$displayValue</b> was <b>$columnlabel</b> in <b>$rowlabel</b>",
//     valuefontcolor: "#262A44"
//   },
//   rows: {
//     row: [
//       {
//         id: "0",
//         label: "1"
//       },
//       {
//         id: "1",
//         label: "2"
//       },
//       {
//         id: "2",
//         label: "3"
//       },
//       {
//         id: "3",
//         label: "4"
//       },
//       {
//         id: "4",
//         label: "5"
//       },
//       {
//         id: "5",
//         label: "6"
//       },
//       {
//         id: "6",
//         label: "7"
//       },
//       {
//         id: "7",
//         label: "8"
//       },
//       {
//         id: "8",
//         label: "9"
//       }
//     ]
//   },
//   columns: {
//     column: [
//       {
//         id: "topic 0",
//         label: "#1"
//       },
//       {
//         id: "topic 1",
//         label: "#2"
//       },
//       {
//         id: "topic 2",
//         label: "#3"
//       },
//       {
//         id: "topic 3",
//         label: "#4"
//       },
//       {
//         id: "topic 4",
//         label: "#5"
//       }
//     ]
//   },
//   dataset: [
//     {
//       data: [
//         {
//           rowid: "2002",
//           columnid: "1",
//           value: "0",
//           displayvalue: "Riley"
//         },
//         {
//           rowid: "2003",
//           columnid: "1",
//           value: "24",
//           displayvalue: "Riley"
//         }
//       ]
//     }
//   ],
//   colorrange: {
//     gradient: "1",
//     minvalue: "0",
//     code: "#FCFBFF",
//     color: [
//       {
//         code: "#FBE1EA",
//         minvalue: "0",
//         maxvalue: "10"
//       },
//       {
//         code: "#FEB0BA",
//         minvalue: "10",
//         maxvalue: "20"
//       },
//       {
//         code: "#f7f8fd",
//         minvalue: "20",
//         maxvalue: "30"
//       },
//       {
//         code: "#DCE8F4",
//         minvalue: "30",
//         maxvalue: "40"
//       },
//       {
//         code: "#6B96CB",
//         minvalue: "40",
//         maxvalue: "50"
//       }
//     ]
//   }
// };

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
      var returnSeries = []
      var i = 1
      for (var index in this.engSentiment) {
        var data = []
        for (var item of Object.keys(this.engSentiment[index])){
          data.push({
            "x": this.engSentiment[index][item],
            "y": i
          })
          i++
        }
        var obj = {
          "name": "Topics",
          "data": data
        }
        if(index == '0') {
          returnSeries.push(obj)
        }
      }
      return returnSeries
    },
    series_bm() {
      var returnSeries = []
      var i = 1
      for (var index in this.malaySentiment) {
        var data = []
        for (var item of Object.keys(this.engSentiment[index])){
          data.push({
            "x": this.engSentiment[index][item],
            "y": i
          })
          i++
        }
        var obj = {
          "name": "Topics",
          "data": data
        }
        if(index == '0') {
          returnSeries.push(obj)
        }
      }
      return returnSeries
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
