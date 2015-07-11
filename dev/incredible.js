/**
 * Project : incredible
 * File : incredible.js
 * Date : 11/07/2015
 * Author : Vincent Loy <vincent.loy1@gmail.com>
 */
/*global window, document, Snap*/
(function (exports, Snap) {
    'use strict';
    var extend,
        incredible;

    extend = function (out) {
        var i,
            obj,
            key;
        out = out || {};

        for (i = 1; i < arguments.length; i += 1) {
            obj = arguments[i];

            if (obj) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
                            extend(out[key], obj[key]);
                        } else {
                            out[key] = obj[key];
                        }
                    }
                }
            }
        }

        return out;
    };

    incredible = function (elt, params) {
        var args = extend({
                backgroundColor: '#fe1fe1',
                strokeColor: '#cd1cd1',
                modulo: 20,
                debug: true,
            }, params),
            el = document.getElementById(elt);
            //snap = new Snap(),
            //bigCircle = snap.circle(500, 500, 500);

        var s = Snap(800, 800);
        var circleX = 400, circleY = 400, circleRadius = 360;

        if (args.debug) {
            var bigCircle = s.circle(circleX, circleY, circleRadius);
            //var L1 = s.path("M " + circleX + " " + circleY + "L 0 0").attr({stroke: "blue"});
 //By default its black, lets change its attributes
            bigCircle.attr({
             fill: "#bada55",
             stroke: "#000",
             strokeWidth: 5
             });
        }

        var mod = args.modulo;

        var newX = circleX + ((circleRadius) * Math.sin(0));
        var newY = circleY - ((circleRadius) * Math.cos(0));

        //var c1 = s.circle(newX, newY, 10).attr({fill: "red"});

        for (var i = 0; i < args.modulo; i += 1) {
            var test = s.circle(newX, newY, 10).attr({
                fill: 'red',
            });

            var rotateVal = (360 / args.modulo) * i;

            test.attr({
                "transform": "rotate("+ rotateVal +", 400, 400)",
                "data-num": i
            });
        }
    };

    exports.incredible = incredible;
}(window, Snap));
