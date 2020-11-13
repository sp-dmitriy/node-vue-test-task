<template>
   <tr>
    <td class="align-middle">{{ row_data.id }}</td>
    <td class="align-middle">{{ row_data.imei }}</td>
    <td class="align-middle">{{ row_data.imsi }}</td>
    <td class="align-middle">{{ row_data.msisdn }}</td>
    <td class="align-middle">{{ row_data.created }}</td>
    <td class="align-middle">{{ row_data.updated }}</td>
    <td>
      <router-link :to="{ name: 'vUpdate', params: {id: row_data.id }}">
        <button type="button" class="btn btn-warning mr-3"><img src="../assets/edit.svg" /></button>
      </router-link>
      <button type="button" class="btn btn-danger" @click="showModal"><img src="../assets/delete.svg" /></button>
    </td>
     <vModal 
        v-if="isModalVisible"  
        @closeModal="closeModal"
        @removeItem="onDelete"
      >
        <p> Удалить эленмент  # {{row_data.id}}</p>
     </vModal>   
  </tr>
</template>

<script>
import vModal from './v-modal'
import {mapActions} from 'vuex'

export default {
  name: 'vTableItem',
  components: {
    vModal
  },
  data() {
    return {
      isModalVisible : false
    }
  },
  props: {
      row_data: {
          type: Object,
          default: () =>{
              return {}
          }
      }
  },
  methods: {
    onDelete() {
      this.isModalVisible = false
      this.$emit('deleteHandler', this.row_data.id)
    },
    showModal() {
       this.isModalVisible =  true
    },
    closeModal() {
       this.isModalVisible = false
    }
  }
}
</script>