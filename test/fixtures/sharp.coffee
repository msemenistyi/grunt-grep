class MockOutputStream extends Stream
  constructor: ->#@grep prod:s
    @writable = true
    @written = [] #@grep prod:e

  write: (data) -> #@grep dev:s
    @written.push data #@grep dev:e

  lastWrite: (fromEnd = -1) -> #@grep dev
    @written[@written.length - 1 + fromEnd].replace /\n$/, '' #@grep prod

historyFile = '.coffee_history_test'
fs.writeFileSync historyFile, '1 + 2\n'