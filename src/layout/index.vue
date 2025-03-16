<template>
  <div class="layout-root">
    <easyspring 
      :routeConfig="routeConfig">
    </easyspring>
  </div>
</template>

<script setup lang="ts">
import easyspring from '@/components/easy-spring/index.vue';
import { RouteConfig } from '@/components/easy-spring/type';
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
const routeConfig: Record<string, RouteConfig> = {
  '/clock': {
    right: '/calendar',
    left: '/setting',
    top: '/sample',
    bottom: '/overview'
  },
  '/setting': {
    right: '/clock',
    left: null,
    top: null,
    bottom: null
  },
  '/calendar': {
    right: null,
    left: '/clock',
    top: null,
    bottom: null
  },
  '/overview': {
    right: null,
    left: null,
    top: '/clock',
    bottom: null
  },
  '/sample': {
    right: null,
    left: null,
    top: '',
    bottom: '/clock'
  },
}

</script>
<style scoped lang='less'>
.layout-root{
  width: 100vw;
  display: flex;
  height: 100vh;
}</style>