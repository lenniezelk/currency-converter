const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'build', 'js'),
    filename: 'app.js'
  }
};
