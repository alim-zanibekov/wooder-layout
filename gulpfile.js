const fs = require('fs');

require('./gulp/serve');

fs
    .readdirSync('./gulp/tasks')
    .forEach(name => require(`./gulp/tasks/${name}`));