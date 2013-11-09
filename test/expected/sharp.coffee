class MockOutputStream extends Stream

  write: (data) -> 
    @written.push data 

  lastWrite: (fromEnd = -1) -> 

historyFile = '.coffee_history_test'
fs.writeFileSync historyFile, '1 + 2\n'