<template>
  <label class="uploader-btn" ref="btn" v-show="support">
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
import { inject, nextTick, ref, onMounted, computed, ComputedRef } from 'vue';
defineOptions({
  name: 'ea-uploader-btn'
});
const props = defineProps({
  directory: {
    type: Boolean,
    default: false
  },
  single: {
    type: Boolean,
    default: false
  },
  attrs: {
    type: Object,
    default() {
      return {};
    }
  }
});
const btn = ref(null);
const uploader = inject<ComputedRef<any>>('uploader');
const support = computed(() => uploader.value?.support);
onMounted(() => {
  nextTick(() => {
    console.log(uploader);
    uploader.value?.assignBrowse(
      btn.value,
      props.directory,
      props.single,
      props.attrs
    );
  });
});
</script>

<style scoped>
.uploader-btn {
  display: inline-block;
  position: relative;
  padding: 4px 8px;
  font-size: 100%;
  line-height: 1.4;
  color: #666;
  border: 1px solid #666;
  cursor: pointer;
  border-radius: 2px;
  background: none;
  outline: none;
}
.uploader-btn:hover {
  background-color: rgba(0, 0, 0, 0.08);
}
</style>
