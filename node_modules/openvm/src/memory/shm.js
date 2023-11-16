// Short-term- memory
// https://github.com/kad1rr/openvm/blob/master/docs/SHM.md
class SHM {
  /**
   * @param {number} size - Size of memory bases
   * @param {number} length - Length of memory cells
   */
  constructor(size = 10, length = 25, delay = 100) {
    this._size = size
    this._length = length
    this.memory = new Array(this._size).fill(0).map(() => new Array(this._length).fill(0))
    setInterval(() => {
      this.memory = new Array(this._size).fill(0).map(() => new Array(this._length).fill(0))
    }, delay)
    this.type = 'SHM'
  }

  /**
   * @param {number} index - Index of memory cell
   * @param {number} value - Value of memory cell
   */
  set(stack, cell, value) {
    this.memory[stack][cell] = value
  }

  /**
   * @param {Array<number>} index - [0, 0] -> 0x0 | [0, 1] -> 0x1 ...
   */
  get(stack, cell) {
    return this.memory[stack][cell]
  }
}

export default SHM
