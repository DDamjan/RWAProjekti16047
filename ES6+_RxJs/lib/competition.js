"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.competition = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require("./db");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var competition = exports.competition = function () {
    function competition() {
        _classCallCheck(this, competition);

        this.swimmers = new Array();
        (0, _db.populateSwimmers)(this.swimmers);
    }

    _createClass(competition, [{
        key: "drawCompetition",
        value: function drawCompetition(host) {
            var container = document.createElement("div");
            container.className = "competition-container";
            host.appendChild(container);

            var divPool = document.createElement("div");
            divPool.className = "pool-container";
            container.appendChild(divPool);

            var poolLanes = document.createElement("div");
            poolLanes.className = "pool-lanes";
            poolLanes.backgroundImage = 'url("../resources/pool.jpg")';
            divPool.appendChild(poolLanes);

            var poolLaneNum = document.createElement("div");
            poolLaneNum.className = "pool-lane-number";
            poolLaneNum.backgroundImage = 'url("../resources/pool-frame.jpg")';
            divPool.appendChild(poolLaneNum);
        }
    }, {
        key: "log",
        value: function log() {
            console.log(this.swimmers);
        }
    }]);

    return competition;
}();