var $ = require('jquery');
var Timer = require('timer');

/**
 *
 * @param node
 * @param fn
 * @param params
 *     keep: boolean 无论输入值是否与之前相同，将继续检查，默认false
 *     timer: Number 检测的时间间隔，默认128ms
 *     runOnBlur: boolean 失焦是否再检查一次，默认false
 */
var Inputor = function (node, fn, params) {
    node = $(node);
    params = params || {};
    var cache = node.val();
    var flag = false;
    var run = Timer.debounce(function (force) {
        if (flag) {
            var val = node.val();
            if (params.keep === true || force === true || val !== cache) {
                fn(val, node);
                cache = val;
            }
            if (flag) {
                run();
            }
        }
    }, params.timer || 128);
    node.bind('focus.timer', function () {
        flag = true;
        run(true);
    });
    node.bind('blur.timer', function () {
        if (params.runOnBlur) {
            fn(node.val(), node);
        }
        flag = false;
    });
};

$.fn.inputor = function (fn, params) {
    this.each(function () {
        Inputor(this, fn, params);
    });
};

module.exports = Inputor;
