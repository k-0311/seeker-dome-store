const { spawn } = require('child_process');
const { inspect } = require('util');
spawn('clip').stdin.end(inspect('content_for_the_clipboard'));
