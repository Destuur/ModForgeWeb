<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
    file: File
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(async () => {
    const buffer = await props.file.arrayBuffer()

    // TEMP: Fake RGBA data
    const width = 128
    const height = 128
    const rgba = new Uint8ClampedArray(width * height * 4)

    for (let i = 0; i < rgba.length; i += 4) {
        rgba[i] = 200     // R
        rgba[i + 1] = 100 // G
        rgba[i + 2] = 50  // B
        rgba[i + 3] = 255 // A
    }

    const ctx = canvasRef.value!.getContext('2d')!
    const imageData = new ImageData(rgba, width, height)
    ctx.putImageData(imageData, 0, 0)
})
</script>

<template>
    <div>
        <h3>{{ file.name }}</h3>
        <canvas ref="canvasRef" width="128" height="128" />
    </div>
</template>
