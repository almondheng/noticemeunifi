import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#8b1e3f',
    primary_alt: '#3c153b',
    secondary: '#ee6c4d',
    secondary_alt: '#cc3146',
    special: '#f0c987',
    accent: '#8c9eff',
    error: '#b71c1c',
    positive: '#008000',
    negative: '#ff6347',
    neutral: '#696969',
    objective: '#0066ff',
    subjective: '#6600ff'
  }
})
