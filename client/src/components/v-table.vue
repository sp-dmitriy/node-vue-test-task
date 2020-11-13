<template>
<div class="container">
  <h1 class="text-center mt-3">Список</h1>
   <table class="table mt-3">
    <thead>
      <tr>
        <th scope="col" @click="sortByID">
          ID
          <img v-if="sort_id" src="../assets/sort_down.svg" />
          <img v-else src="../assets/sort_up.svg" />
        </th>
        <th scope="col">IMEI</th>
        <th scope="col">IMSI</th>
        <th scope="col">MSISDN</th>
        <th scope="col">Дата создания</th>
        <th scope="col">Дата изменения</th>
        <th scope="col">
         <router-link to="/create">
            <button type="button" class="btn btn-primary">
              Добавить
            </button>   
         </router-link>
        </th>
      </tr>
    </thead>
    <tbody>
         <vTableItem 
            v-for="row in paginationLists"
            :key="row.id"
            :row_data="row"
            @deleteHandler="deleteHandler"
         />   
    </tbody>  
  </table>

  <div class="v-table__pagination">
    <nav aria-label="Page navigation example">
      <ul class="pagination text-center">
        <li class="page-item"
          v-for="page in pages"
          :key="page"
          :class="{'active' : page === pageNymber}"
          @click="pageClick(page)"
        ><a class="page-link" href="#">{{page}}</a></li>
      </ul>
    </nav>
  </div>
</div> 
</template>

<script>
import vTableItem from './v-table-item'
import {mapActions,mapGetters} from 'vuex'

export default {
  name: 'vTable',
  components: {
    vTableItem
  },
  data(){
    return {
      listPerPage: 5,
      pageNymber : 1,
      sort_id: true,
      sort_created: true
    }
  },
  computed: {
    ...mapGetters(['LISTS']),
    pages() {
      return Math.ceil(this.LISTS.length / this.listPerPage)
    },
    paginationLists(){
      let from = (this.pageNymber - 1) *  this.listPerPage
      let to = from + this.listPerPage
      return this.LISTS.slice(from,to)
    },
  },
  methods: {
    ...mapActions(['GET_LISTS_FROM_API','DEL_LIST_TO_API']),
    pageClick(page) {
      this.pageNymber = page
    },
    sortByID(){
      this.sort_id = !this.sort_id
      if(!this.sort_id) this.LISTS.sort((a, b) => a.id - b.id)
      else this.LISTS.sort((b, a) => a.id - b.id)
    },
    deleteHandler(id) {
     this.DEL_LIST_TO_API(id)
    }
  },
  mounted() {
    this.GET_LISTS_FROM_API()
  }
}
</script>

<style>
  .v-table__pagination{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  img{
    cursor: pointer;
  }  
</style>