(function() {
  'use strict';

  angular
    .module('randemojinator')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $location) {
    var eyeleft;
    var colorArray = ["tomato", "#7ECEFD", "#675FD6", "#9CABE4", "#3FC380", "#2F584C", "#F6511D", "#C5D86D"];
    var bgColor;
    var initialized = false;

    $scope.canvas = document.getElementById('canvas');
    var context = $scope.canvas.getContext('2d');
    $scope.canvas.width = 160;
    $scope.canvas.height = 160;

    $scope.emoji = $location.search();

    $scope.updateEmoji = function() {
        var e = $scope.emoji;
        e.background = backgroundRand();
        e.mouth = mouthRand();
        e.eyeleft = eyeleftRand();
        e.eyeright = eyerightRand();
        e.extra = extraRand();
        $scope.bgStyle = {"background-color": bgRand() };
        bgColor = $scope.bgStyle["background-color"];
        if(!initialized) {
            $scope.updateURL();
        }
        initialized = true;
    };

    $scope.updateURL =function() {
        var e = $scope.emoji;
        $location.search('background', e.background);
        $location.search('mouth', e.mouth);
        $location.search('eyeleft', e.eyeleft);
        $location.search('eyeright', e.eyeright);
        $location.search('extra', e.extra);

        $scope.encodeURL();
    };

    $scope.encodeURL = function() {
        $scope.absurl = encodeURIComponent($location.absUrl());
    };

    $scope.getImg = function($event) {
        var elem = $event.currentTarget || $event.srcElement;
        var e = $(elem);
        e.attr("href", $scope.canvas.toDataURL());
    };

    if($.isEmptyObject($location.search())) {
        $scope.updateEmoji();
        updateCanvas();
    }
    updateCanvas();

    $scope.update = function() {
        $scope.updateEmoji();
        $scope.updateURL();
        updateCanvas();
    };

    function updateCanvas() {
        $('.clickhandler > img').each(function(){
        	if (!this.complete) {
        		$(this).load(function(){
                    generateCanvas();
        		});
        	} else {
                generateCanvas();
        	}
        });
    }

    function generateCanvas(getbase) {
        context.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);

        var backgroundEl = document.getElementById('background');
        var mouthEl = document.getElementById('mouth');
        var eyeleftEl = document.getElementById('eyeleft');
        var eyerightEl = document.getElementById('eyeright');
        var extraEl = document.getElementById('extra');

        context.globalAlpha = 1.0;
        context.drawImage(backgroundEl, 0, 0);
        context.drawImage(mouthEl, 0, 0);
        context.drawImage(eyeleftEl, 0, 0);
        context.drawImage(eyerightEl, 0, 0);
        context.drawImage(extraEl, 0, 0);

        if(getbase === true) {
            return $scope.canvas.toDataURL();
        }
    }

    function backgroundRand() {
        var rand = Math.floor(1 + Math.random()*58);
        if (rand > 56) {
            return '03';
        } else if (rand === 56) {
            return '02';
        } else if (rand === 55) {
            return '04';
        } else {
            return '01';
        }
    }

    function extraRand() {
        var rand = Math.floor(1 + Math.random()*58);
        if (rand > 12) {
            return '00';
        } else if (rand > 9) {
            return rand;
        } else {
            return '0' + rand;
        }
    }

    function mouthRand() {
        var rand = Math.floor(Math.random()*26);
        if (rand > 9) {
            return rand;
        } else {
            return '0' + rand;
        }
    }

    function eyeleftRand() {
        var rand = Math.floor(1 + Math.random()*32);
        if (rand > 9) {
            eyeleft = rand;
            return eyeleft;
        } else {
            eyeleft = '0' + rand;
            return eyeleft;
        }
    }

    function eyerightRand() {
        var firstrand = Math.floor(Math.random()*100);
        if (firstrand <= 60) {
            return eyeleft;
        } else {
            var rand = Math.floor(1 + Math.random()*32);
            if (rand > 9) {
                return rand;
            } else {
                return '0' + rand;
            }
        }
    }

    function bgRand() {
        var rand = Math.floor(Math.random()*colorArray.length);
        if (colorArray[rand] === bgColor) {
            bgRand();
        } else {
            return colorArray[rand];
        }
    }

    //share button
    $('.share').on('click', function(e) {

		e.preventDefault();

		var $this = $(this);

		$this.animate({
			'width': $this.width() === 384 ? '64px' : '384px'
		}, 300, 'swing');

	});
  }
})();
