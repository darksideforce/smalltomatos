<template>
  <div v-if="visible" class="dialog-wrapper" :style="computedStyle">
    <slot></slot>
    <div class="dialog-close" @click="handleClickToClose">
      <SvgIcon name="closes"  size="3em"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps({
  visible: Boolean,
  content: String,
  onClose: Function,
  width: String,
  height: String
});
const computedStyle = computed(() => {
  return {
    height: props.height,
    width: props.width,
  }
})
const handleClickToClose = () => {
  if(props.onClose){
    props.onClose()
  }
}
</script>

<style scoped lang="less">
.dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .dialog-close{
    position: fixed;
    top: 0;
    right:0;
  }
}
</style>