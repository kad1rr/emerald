// Non-reset accessable memory
// https://github.com/kad1rr/openvm/blob/master/docs/memory.md
import fs from 'node:fs'

class LongMemory {
  constructor(size = 10, length = 25, interval = 100, filePath = './.mem') {
    this._size = size
    this._length = length
    this.memory = new Array(this._size).fill(0).map(() => new Array(this._length).fill(0))
    fs.writeFileSync(filePath, JSON.stringify(this.memory))
    setInterval(() => fs.writeFileSync(filePath, JSON.stringify(this.memory)), interval)
    this.type = 'long-memory'
  }

  /**
   * @param {number} index - Index of memory cell
   * @param {number} value - Value of memory cell
   */
  set(stack, cell, value) {
    return (this.memory[stack][cell] = value)
  }

  /**
   * @param {Array<number>} index - [0, 0] -> 0x0 | [0, 1] -> 0x1 ...
   */
  get(stack, cell) {
    return this.memory[stack][cell]
  }

  read() {
    return JSON.parse(
      fs.readFileSync('./.mem', {
        encoding: 'utf8',
      }),
    )
  }
}

export default LongMemory
