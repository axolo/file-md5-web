import SparkMD5 from 'spark-md5'

/**
 * **Get file md5 in web**
 *
 * @typedef {Object} Config
 * @property {Number} size chunk size, default to 20MB.
 * @property {Boolean} raw output hash as raw, false to hex.
 * @property {Function} onProgress callback total chunks and loaded chunk
 *
 * @author Yueming Fang
 * @version 0.1.0
 * @param {File} file - file for hash
 * @param {Config} config - hash config
 * @returns {String} md5 of file or Error
 */
const fileMd5Web = (file, config = {}) => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      reject(new Error('not a file'))
      return
    }

    const chunkSize = parseInt(config.size) || 20971520 // 20MB
    const rawHash = config.raw // false = hex hash
    const fileSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    const fileReader = new FileReader()
    const spark = new SparkMD5.ArrayBuffer()
    const chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0

    const readNext = () => {
      let start = currentChunk * chunkSize
      let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
      fileReader.readAsArrayBuffer(fileSlice.call(file, start, end))
      if(config.onProgress instanceof Function) {
        config.onProgress({ total: chunks, loaded: currentChunk + 1 })
      }
    }

    fileReader.onerror = e => reject(e)

    fileReader.onload = e => {
      spark.append(e.target.result) // Append array buffer
      currentChunk++
      if (currentChunk < chunks) {
        readNext()
      } else {
        resolve(spark.end(rawHash))
      }
    }

    readNext()
  })
}

export default fileMd5Web
