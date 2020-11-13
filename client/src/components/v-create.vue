<template>
  <div class="container">
    <h1 class="text-center mt-3">Добавить запись</h1>

    <div style="width: 400px; margin: 0 auto;">
    <form class="mt-3" @submit.prevent="submit">
      <div class="form-group">
        <input  type="text" class="form-control" id="imei" v-model="form.imei" placeholder="IMEI" />
        <div class="small-info">
          <small class="text-danger" v-if="!$v.form.imei.num">Должно быть 15 цифр</small>
          <!-- <small class="text-muted" v-else>Должно быть 15 цифр</small> -->
          <small class="text-muted" v-if="!$v.form.imei.num">[ {{form.imei.length}} ]</small>
        </div>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" id="imsi" v-model="form.imsi" placeholder="IMSI" />
        <div class="small-info">
          <small id="imsi" class="form-text text-danger" v-if="!$v.form.imsi.num">Должно быть 15 цифр</small>
          <small class="text-muted" v-if="!$v.form.imsi.num">[ {{form.imsi.length}} ]</small>
        </div>  
      </div>
      <div class="form-group">
        <input type="text" class="form-control" id="msisdn" v-model="$v.form.msisdn.$model" placeholder="MSISDN" />
        <div class="small-info">
          <small id="msisdn" class="form-text text-danger" v-if="!$v.form.msisdn.num">Должно быть 11 цифр и начинаться с 7</small>
           <small class="text-muted" v-if="!$v.form.msisdn.num">[ {{form.msisdn.length}} ]</small>
        </div>  
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
import {mapActions} from 'vuex'
import {required} from 'vuelidate/lib/validators'

export default {
  name: "vCreate",

  data() {
    return {
       form: {
         imei: '',
         imsi: '',
         msisdn: '' 
       }
    }
  },
  validations: {
    form: {
      imei: {
        required,
        num(imei) {
          return (/[0-9]/.test(imei) && imei.length == 15 )
        }
      },
      imsi: {
        required,
        num(imsi) {
          return (/[0-9]/.test(imsi) && imsi.length == 15 )
        }
      }, 
      msisdn: {
        required,
        num(msisdn) {
          return (/^[7][0-9]/.test(msisdn) &&  msisdn.length == 11 )
        }
      }
    }
  },
  computed: {
    checkForm() {
      return this.form.imei && this.form.imsi && this.form.msisdn
    }
  },
  methods: {
    ...mapActions(['ADD_LIST_TO_API']),
    submit() {
      this.ADD_LIST_TO_API({
        imei : this.form.imei,
        imsi:  this.form.imsi,
        msisdn: this.form.msisdn
      })
      this.form.imei = this.form.imsi = this.form.msisdn = ''
      this.$router.push('/')
    }
  }
}

</script>

<style scoped>
.small-info{
  display: flex;
  justify-content: space-between;
}
</style>