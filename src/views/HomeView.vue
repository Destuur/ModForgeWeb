<script setup lang="ts">
import { ref } from 'vue'
import { selectKcd2Folder } from '../composables/useFileSystem'
import DdsViewer from '../components/DdsViewer.vue'

const kcdFolder = ref<FileSystemDirectoryHandle | null>(null)
const ddsFile = ref<File | null>(null)

async function pickFolder() {
    kcdFolder.value = await selectKcd2Folder()
}

async function pickDds() {
    const [fileHandle] = await (window as any).showOpenFilePicker({
        types: [{
            description: 'DDS Image',
            accept: { 'image/dds': ['.dds'] }
        }]
    })

    ddsFile.value = await fileHandle.getFile()
}
</script>

<template>
    <main style="padding: 2rem">
        <h1>ModForgeWeb – DDS Test</h1>

        <button @click="pickFolder">
            Select KCD2 Folder
        </button>

        <p v-if="kcdFolder">✔ Folder selected</p>

        <hr />

        <button @click="pickDds">
            Select DDS File
        </button>

        <DdsViewer v-if="ddsFile" :file="ddsFile" />
    </main>
</template>
