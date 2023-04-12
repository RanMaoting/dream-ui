export const COMPONENT_NAME = 'uploader' as const;
export const FILE_ADDED_EVENT = 'fileAdded' as const;
export const FILES_ADDED_EVENT = 'filesAdded' as const;
export const UPLOAD_START_EVENT = 'uploadStart' as const;

export const ALL_EVENTS = [
  'change',
  'dragover',
  'dragenter',
  'dragleave',
  'file-success',
  'file-complete',
  'file-progress',
  'file-added',
  'files-added',
  'files-submitted',
  'file-removed',
  'file-retry',
  'file-error',
  'upload-start',
  'complete'
];
