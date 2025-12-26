export async function selectKcd2Folder(): Promise<FileSystemDirectoryHandle> {
  if (!('showDirectoryPicker' in window)) {
    throw new Error('File System Access API not supported');
  }

  return await (window as any).showDirectoryPicker({
    id: 'kcd2-root',
    mode: 'read'
  });
}