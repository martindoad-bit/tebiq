declare module 'heic-convert' {
  export default function convert(input: {
    buffer: ArrayBuffer | Buffer
    format: 'JPEG' | 'PNG'
    quality?: number
  }): Promise<ArrayBuffer>
}
