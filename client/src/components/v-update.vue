<template>
  <div class="container">
    <h1 class="text-center mt-3">Редактировать запись #{{this.$route.params.id}}</h1>
    <div style="width: 400px; margin: 0 auto;">
    <form class="mt-3" @submit.prevent="submit">
      <div class="form-group">
        <label for="imei">IMEI</label>
        <input  type="text" class="form-control" id="imei" v-model="form.imei" placeholder="IMEI" />
        <small id="imei" class="form-text text-muted">Должно быть 15 цифр</small>
      </div>
      <div class="form-group">
        <label for="imsi">IMSI</label>
        <input type="text" class="form-control" id="imsi" v-model="form.imsi" placeholder="IMSI" />
        <small id="imsi" class="form-text text-muted">Должно быть 15 цифр</small>
      </div>
      <div class="form-group">
        <label for="msisdn">MSISDN</label>
        <input type="text" class="form-control" id="msisdn" v-model="form.msisdn" placeholder="MSISDN" />
        <small id="msisdn" class="form-text text-muted">Должно быть 11 цифр и начинаться с 7</small>
      </div>
        <div class="text-center">
        <button type="submit" class="btn btn-success mr-1" :disabled="!checkForm">Сохранить</button> 
        <router-link to="/">
          <button type="submit" class="btn btn btn-outline-secondary">Отменить</button>
        </router-link>
      </div>
    </form>
    </div>
  </div>  
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
  name: "vUpdate",
  data() {
    return {
      form: {}
    }
  },
  computed: {
    ...mapGetters(['LISTS']),
    checkForm() {
      return this.form.imei.trim() && this.form.msisdn.trim() && this.form.msisdn.trim()
    } 
  },
  methods: {
    ...mapActions(['EDT_LIST_TO_API']),
    submit() {
      this.EDT_LIST_TO_API({
        id: this.$route.params.id,
        imei : this.form.imei,
        imsi:  this.form.imsi,
        msisdn: this.form.msisdn
      })
      this.form.imei = this.form.imsi = this.form.msisdn = ''
      this.$router.push('/')
    }
  },
  created() {
    this.form = this.LISTS.find(c => c.id == this.$route.params.id)
  }
  
}
</script>