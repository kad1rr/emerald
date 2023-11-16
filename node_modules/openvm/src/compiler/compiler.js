// Compiler for OBC (Oxygen Byte Code) and ORC (Oxygen Readable Code)
// https://github.com/kad1rr/openvm/blob/master/docs/compiler.md

import COMMANDS from './commands.js'

/**
 *
 * @param {string} action
 * @param {string} argument
 * @returns
 */
const handleCommandsORC = (action, argument) => {
  return [
    action
      .toLowerCase()
      .replace(COMMANDS.add, 'add')
      .replace(COMMANDS.cmp, 'cmp')
      .replace(COMMANDS.cmps, 'cmps')
      .replace(COMMANDS.div, 'div')
      .replace(COMMANDS.exit, 'exit')
      .replace(COMMANDS.jmp, 'jmp')
      .replace(COMMANDS.mod, 'mod')
      .replace(COMMANDS.mov, 'mov')
      .replace(COMMANDS.movs, 'movs')
      .replace(COMMANDS.mul, 'mul')
      .replace(COMMANDS.put, 'put')
      .replace(COMMANDS.set, 'set')
      .replace(COMMANDS.sub, 'sub')
      .replace(COMMANDS.run, 'run'),
    argument,
  ]
}

/**
 *
 * @param {string} action
 * @param {string} argument
 * @returns
 */
const handleCommandsOBC = (action, argument) => {
  return [
    action
      .toLowerCase()
      .replace('add', COMMANDS.add)
      .replace('cmp', COMMANDS.cmp)
      .replace('cmps', COMMANDS.cmps)
      .replace('div', COMMANDS.div)
      .replace('exit', COMMANDS.exit)
      .replace('jmp', COMMANDS.jmp)
      .replace('mod', COMMANDS.mod)
      .replace('mov', COMMANDS.mov)
      .replace('movs', COMMANDS.movs)
      .replace('mul', COMMANDS.mul)
      .replace('put', COMMANDS.put)
      .replace('set', COMMANDS.set)
      .replace('sub', COMMANDS.sub)
      .replace('run', COMMANDS.run),
    argument,
  ]
}

/**
 * @param {string} data
 */
const CompileToOBC = data => {
  const source = data.split('\n')
  const readableCommand = []
  source.forEach(command => {
    const [action, argument] = command.split(' ')
    readableCommand.push(handleCommandsOBC(action, argument))
  })
  return readableCommand
}

/**
 *
 * @param {*} data
 */
const CompileToORC = data => {
  const source = data.split('\n')
  const readableCommand = []
  source.forEach(command => {
    const [action, argument] = command.split(' ')
    readableCommand.push(handleCommandsORC(action, argument))
  })
  return readableCommand
}

export { CompileToORC, CompileToOBC }
