export interface DdsDecodeResult {
  width: number
  height: number
  data: Uint8Array
}

const worker = new Worker(
  new URL('../worker/ddsWorker.ts', import.meta.url),
  { type: 'module' }
)

export function decodeDds(buffer: ArrayBuffer): Promise<DdsDecodeResult> {
  return new Promise((resolve) => {
    worker.onmessage = (e) => resolve(e.data)
    worker.postMessage(buffer)
  })
}
