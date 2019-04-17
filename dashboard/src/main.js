import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'vue2-timeago/dist/vue2-timeago.css'
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

Vue.config.productionTip = false
Vue.use(VueFusionCharts, FusionCharts, Charts, FusionTheme)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
