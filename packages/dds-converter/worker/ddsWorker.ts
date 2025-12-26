import init, { decode_dds } from '../wasm/dds_converter_wasm.js'

// Vite-kompatible WASM URL
const wasmUrl = new URL(
  '../wasm/dds_converter_wasm_bg.wasm',
  import.meta.url
)

let initialized = false

self.onmessage = async (e) => {
  if (!initialized) {
    await init(wasmUrl)
    initialized = true
  }

  const buffer: ArrayBuffer = e.data
  const result = decode_dds(new Uint8Array(buffer))

  self.postMessage({
    width: result.width(),
    height: result.height(),
    data: result.data()
  })
}
