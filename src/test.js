import _ from "lodash";

const logMessage = message => console.log(message)

const debouncedLogMessage = _.debounce(logMessage, 1500)

debouncedLogMessage('first message')
debouncedLogMessage('second message')
debouncedLogMessage('third message')

//console: third message
