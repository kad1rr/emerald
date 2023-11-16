import COMMANDS from './compiler/commands.js'
import { CompileToOBC, CompileToORC } from './compiler/compiler.js'
import LongMemory from './memory/mem.js'
import SHM from './memory/shm.js'
import Reader from './reader/code.js'

class VM {
  constructor() {
    this.memory = new LongMemory()
    this.shm = new SHM()
    this.reader = new Reader([], this.shm)
    this.stdout = []
  }

  run(data) {
    if (typeof data === 'string') {
      const command = CompileToOBC(data)
      this.reader.run(command)
      this.reader.stdout.forEach(line => console.log(line.replace(/%20/gi, ' ')))
    } else {
      this.reader.run(data)
      this.reader.stdout.forEach(line => console.log(line.replace(/%20/gi, ' ')))
    }
  }
}
export { COMMANDS, CompileToOBC, CompileToORC, LongMemory, SHM, Reader, VM }
