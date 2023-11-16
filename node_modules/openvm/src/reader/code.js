// Reader for OBC (Oxygen Byte Code)
// https://github.com/kad1rr/openvm/blob/master/docs/code.md

import chalk from 'chalk'
import COMMANDS from '../compiler/commands.js'
import { CompileToOBC } from '../openvm.js'

class Reader {
  /**
   * @param {string[] | string[][]} source
   * @param {LongMemory} memory
   */
  constructor(source, memory) {
    this.memory = memory
    this.stdout = []
  }

  /**
   * @param {Array<string> | Array<string>[]} source
   */
  run(source) {
    let cursor = [0, 0]

    if (!source) {
      this.stdout.push(
        chalk.red(
          'No source specified or founded. Please make sure you have a valid source file and format',
        ),
      )
      this.run(['aa 1'])
      return
    }

    source.forEach(command => {
      const [action, argument] = command
      switch (action.toLowerCase()) {
        case COMMANDS.jmp:
          cursor = argument.toLowerCase().split('x').map(Number)
          break
        case COMMANDS.set:
          this.memory.set(cursor[0], cursor[1], argument)
          break
        case COMMANDS.put:
          this.stdout.push(this.memory.get(cursor[0], cursor[1]))
          break
        case COMMANDS.add:
          this.memory.set(
            cursor[0],
            cursor[1],
            this.memory.get(cursor[0], cursor[1]) + Number(argument),
          )
          break
        case COMMANDS.mov:
          this.memory.set(
            cursor[0],
            cursor[1],
            this.memory.get(
              argument.toLowerCase().split('x').map(Number)[0],
              argument.toLowerCase().split('x').map(Number)[0],
            ),
          )
          break
        case COMMANDS.sub:
          this.memory.set(
            cursor[0],
            cursor[1],
            this.memory.get(cursor[0], cursor[1]) - Number(argument),
          )
          break
        case COMMANDS.mul:
          this.memory.set(
            cursor[0],
            cursor[1],
            this.memory.get(cursor[0], cursor[1]) * Number(argument),
          )
          break
        case COMMANDS.div:
          this.memory.set(
            cursor[0],
            cursor[1],
            this.memory.get(cursor[0], cursor[1]) / Number(argument),
          )
          break
        case COMMANDS.mod:
          this.memory.set(
            cursor[0],
            cursor[1],
            this.memory.get(cursor[0], cursor[1]) % Number(argument),
          )
          break
        case COMMANDS.exit:
          this.stdout.push(`Process exited with code: ${argument}`)
          break
        case COMMANDS.put:
          this.stdout.push(this.memory.get(cursor[0], cursor[1]))
          break
        case COMMANDS.movs:
          this.memory.set(
            cursor[0],
            cursor[1],
            String.fromCharCode(this.memory.get(cursor[0], cursor[1])),
          )
          break
        case COMMANDS.cmp:
          this.memory.set(cursor[0], cursor[1], this.memory.get(cursor[0], cursor[1]) == argument)
          break
        case COMMANDS.run:
          const source = this.memory
            .get(argument.split('x')[0], argument.split('x')[1])
            .replace('%20', ' ')
          this.run(CompileToOBC(source))
          break
        case COMMANDS.comment:
          break
        default:
          this.stdout.push('error: unexpected command code ---> ' + action)
          break
      }
    })
  }
}

export default Reader
