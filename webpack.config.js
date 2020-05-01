const path = require('path');

module.exports = {
    entry: './views/vue/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname + '/views/vue/'),
    },
};
