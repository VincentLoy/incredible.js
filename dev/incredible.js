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
                backgroundColor: '#2980b9',
                strokeColor: '#fff',
                modulo: 1000,
                debug: false,
                background: true,
                multiple: 10,
                pas: 1
            }, params),
            el = document.getElementById(elt),

            s = new Snap(1200, 1200),
            circleX = 550,
            circleY = 550,
            circleRadius = 500,
            newX,
            newY,
        //originX = circleX + (circleRadius * Math.sin(0)),
        //originY = circleY - (circleRadius * Math.cos(0)),
            slice = 2 * Math.PI / args.modulo,
            angle,
            points = [],
            pointStart,
            pointEnd,
            Mx,
            My,
            Lx,
            Ly,
            i,
            y,
            debugCircle;

        if (args.debug || args.background) {
            debugCircle = s.circle(circleX, circleY, circleRadius);
            //var L1 = s.path("M " + circleX + " " + circleY + "L 0 0").attr({stroke: "blue"});
            //By default its black, lets change its attributes
            debugCircle.attr({
                fill: args.backgroundColor,
                strokeWidth: 5
            });
        }

        //var c1 = s.circle(newX, newY, 10).attr({fill: "red"});

        for (i = 0; i < args.modulo; i += args.pas) {
            angle = slice * i;

            newX = (circleX + circleRadius * Math.cos(angle));
            newY = (circleY + circleRadius * Math.sin(angle));
            points.push({x: newX, y: newY});

            if (args.debug) {
                s.circle(newX, newY, 10).attr({
                    fill: 'red'
                });
            }
        }


        for (y = 0; y < points.length; y += 1) {
            pointStart = points[y];
            pointEnd = points[(y * args.multiple) % args.modulo];
            Mx = pointStart.x;
            My = pointStart.y;
            Lx = pointEnd.x;
            Ly = pointEnd.y;

            s.path("M " + Mx + " " + My + "L " + Lx + " " + Ly).attr({stroke: args.strokeColor});
        }


    };

    exports.incredible = incredible;
}(window, Snap));
