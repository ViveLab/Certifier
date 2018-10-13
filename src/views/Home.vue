<template>
  <div class="home">
    <h1>Certifier</h1>
    <form @submit.prevent="save" v-if="isOwner">
      <div class="form-group">
        <label for="courseCode">Codigo curso</label>
        <input type="text" class="form-control" id="courseCode" placeholder="Codigo curso" v-model="form.courseCode">
      </div>
      <div class="form-group">
        <label for="courseName">Nombre curso</label>
        <input type="text" class="form-control" id="courseName" placeholder="Nombre curso" v-model="form.courseName">
      </div>
      <div class="form-group">
        <label for="courseCost">Costo curso</label>
        <input type="number" class="form-control" id="courseCost" placeholder="Costo curso" v-model="form.courseCost">
      </div>
      <div class="form-group">
        <label for="courseDuration">Duracion curso</label>
        <input type="number" class="form-control" id="courseDuration" placeholder="Duracion curso" v-model="form.courseDuration">
      </div>
      <div class="form-group">
        <label for="courseThreshold">Umbral curso</label>
        <input type="number" class="form-control" id="courseThreshold" placeholder="Umbral curso" v-model="form.courseThreshold">
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-success" @click="sessions++">Agregar sesion</button>
        &nbsp;
        <button type="button" class="btn btn-success" @click="sessions--">Borrar sesion</button>
      </div>
      <div class="form-group" v-for="(code, idx) in sessions" v-if="sessions">
        <input type="text" class="form-control" :placeholder="`Session ${code}`" v-model="form.codes[idx]">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div class="alert alert-danger" role="alert" v-else>
      No eres el dueno o no has iniciado sesion o no tienes metamask
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import * as constants from '@/store/constants'

export default {
  name: 'home',
  data () {
    return {
      sessions: 0,
      form: {
        courseCode: null,
        courseName: null,
        courseCost: null,
        courseDuration: null,
        courseThreshold: null,
        codes: []
      }
    }
  },
  computed: {
    ...mapState({
      isOwner: state => state.Course.isOwner
    })
  },
  methods: {
    ...mapActions({
      init: constants.COURSE_INIT,
      addCourse: constants.COURSE_ADD_COURSE
    }),
    save () {
      this.addCourse(this.form)
    }
  },
  created () {
    this.init()
  }
}
</script>
