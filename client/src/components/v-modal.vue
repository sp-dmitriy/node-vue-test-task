<template>
<div class="vModal__wrapper position-absolute">
 <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Внимание!</h5>
        <button type="button" class="close" aria-label="Close" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">Нет</button>
        <button type="button" class="btn btn-danger" @click="removeItem">Да</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
 name: "vModal",
 methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    removeItem(){
      this.$emit('removeItem')
    }
  }
};
</script>

<style>
.vModal__wrapper{
    left: 0;
    right: 0;
    top:0;
    bottom:0;
    background-color: rgba(64,64,64, .4);
    z-index: 100;
}
</style>