var $ = require('jquery');
require('../index');

$(function () {
    $('#inputor').inputor(function(val, node) {
        console.log(val);
    });
});
