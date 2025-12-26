<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { decodeDds } from '../../packages/dds-converter/src'

const props = defineProps<{ file: File }>()
const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(async () => {
    const buffer = await props.file.arrayBuffer()
    const result = await decodeDds(buffer)

    const ctx = canvasRef.value!.getContext('2d')!
    const imageData = new ImageData(
        new Uint8ClampedArray(result.data),
        result.width,
        result.height
    )

    ctx.canvas.width = result.width
    ctx.canvas.height = result.height
    ctx.putImageData(imageData, 0, 0)
})
</script>

<template>
    <div>
        <h3>{{ file.name }}</h3>
        <canvas ref="canvasRef" />
    </div>
</template>
