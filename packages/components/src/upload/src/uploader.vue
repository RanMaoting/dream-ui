<template>
  <div class="uploader">
    <slot :files="files" :file-list="fileList" :started="started">
      <!--            <uploader-unsupport></uploader-unsupport>-->
      <!--            <uploader-drop>-->
      <!--                <p>Drop files here to upload or</p>-->
      <upload-btn>select files</upload-btn>
      <!--                <uploader-btn :directory="true">select folder</uploader-btn>-->
      <!--            </uploader-drop>-->
      <!--            <uploader-list></uploader-list>-->

      123123
    </slot>
  </div>
</template>

<script setup lang="ts">
import {
  ALL_EVENTS,
  FILE_ADDED_EVENT,
  FILES_ADDED_EVENT,
  UPLOAD_START_EVENT
} from './constant';
import {
  computed,
  getCurrentInstance,
  onUnmounted,
  PropType,
  provide
} from 'vue';
import { ref } from 'vue';
import Uploader from 'simple-uploader.js';
import { kebabCase } from '@easyest/utils/index';
import UploadBtn from './uploadBtn.vue';

defineOptions({
  name: 'ea-uploader'
});

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {};
    }
  },
  autoStart: {
    type: Boolean,
    default: true
  },
  fileStatusText: {
    type: [Object, Function],
    default() {
      return {
        success: 'success',
        error: 'error',
        uploading: 'uploading',
        paused: 'paused',
        waiting: 'waiting'
      };
    }
  },
  onFileAdded: {
    type: Function as PropType<(file: any) => boolean | void>
  },
  onFilesAdded: Function
});

const emit = defineEmits(ALL_EVENTS);

const started = ref(false);
const files = ref([]);
const fileList = ref([]);
const instance: any = getCurrentInstance();
let uploader = new Uploader(props.options);
const uploadStart = () => {
  started.value = true;
};
const fileAdded = (file: any) => {
  const _file = file;
  if (props.onFileAdded) {
    const ignored = props.onFileAdded(_file);
    if (ignored === false || _file.ignored) {
      return false;
    }
  } else {
    emit(kebabCase(FILE_ADDED_EVENT), _file);
    if (_file.ignored) {
      // is ignored, filter it
      return false;
    }
  }
};
const filesAdded = (files, fileList) => {
  if (props.onFilesAdded) {
    const ignored = props.onFilesAdded(files, fileList);
    if (ignored === false || files.ignored || fileList.ignored) {
      return false;
    }
  } else {
    emit(kebabCase(FILES_ADDED_EVENT), files, fileList);
    if (files.ignored || fileList.ignored) {
      // is ignored, filter it
      return false;
    }
  }
};
const fileRemoved = () => {
  files.value = [...uploader.files];
  fileList.value = [...uploader.fileList];
};
const filesSubmitted = () => {
  files.value = [...uploader.files];
  fileList.value = [...uploader.fileList];
  if (props.autoStart) {
    uploader.upload();
  }
};
const allEvent = (...args: any[]) => {
  const name = args[0];
  const EVENTSMAP = {
    [FILE_ADDED_EVENT]: true,
    [FILES_ADDED_EVENT]: true,
    [UPLOAD_START_EVENT]: 'uploadStart'
  };
  const handler = EVENTSMAP[name];
  if (handler) {
    if (handler === true) {
      return;
    }
    instance.setupState[handler](...args.slice(1));
  }
  args[0] = kebabCase(name);
  emit(...args);
};

// eslint-disable-next-line vue/no-mutating-props
props.options.initialPaused = !props.autoStart;
uploader.fileStatusText = props.fileStatusText;
uploader.on('catchAll', allEvent);
uploader.on(FILE_ADDED_EVENT, fileAdded);
uploader.on(FILES_ADDED_EVENT, filesAdded);
uploader.on('fileRemoved', fileRemoved);
uploader.on('filesSubmitted', filesSubmitted);
// uploader[UPLOAD_START_EVENT] = uploadStart

console.log(instance);

onUnmounted(() => {
  uploader.off('catchAll', allEvent);
  uploader.off(FILE_ADDED_EVENT, fileAdded);
  uploader.off(FILES_ADDED_EVENT, filesAdded);
  uploader.off('fileRemoved', fileRemoved);
  uploader.off('filesSubmitted', filesSubmitted);
  uploader = null;
});

provide(
  'uploader',
  computed(() => uploader)
);
</script>

<style scoped>
.uploader {
  position: relative;
}
</style>
