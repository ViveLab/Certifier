import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Course from './modules/course'

export default new Vuex.Store({
  modules: {
    Course
  }
})
