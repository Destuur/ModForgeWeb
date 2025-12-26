use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct DdsResult {
    width: u32,
    height: u32,
    data: Vec<u8>,
}

#[wasm_bindgen]
impl DdsResult {
    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn data(&self) -> Vec<u8> {
        self.data.clone()
    }
}

#[wasm_bindgen]
pub fn decode_dds(_input: &[u8]) -> DdsResult {
    let width = 128;
    let height = 128;

    let mut data = vec![0u8; (width * height * 4) as usize];

    for i in (0..data.len()).step_by(4) {
        data[i] = 180;     // R
        data[i + 1] = 80;  // G
        data[i + 2] = 200; // B
        data[i + 3] = 255; // A
    }

    DdsResult { width, height, data }
}
