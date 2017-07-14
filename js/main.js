var config = {
    animationConstruct: function(els2ani, aniTriggerEl) {
        return {
			init : function(){
				this.deanimate();
				document.body.style.opacity = '0.2';
				this.animate(document.body, 110, 0.06);
			},
            mousewheelEvt: (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel',
			appendStickyMenu: function() {
                if (!document.getElementById('stickingMenu')) {
                    var newEl = document.createElement('div'),
                        insideEl = document.createElement('div'),
                        clone = Array.prototype.filter.call(document.querySelectorAll('th span'), 
	function(i){ return i['innerText'] ? i['innerText'].match(/functional competencies/gi) : i['innerHTML'].match(/functional competencies/gi)})[0].cloneNode(1);
					clone.removeAttribute('style');
                    newEl.id = "stickingMenu";
                    insideEl.id = "washer";
                    newEl.style.opacity = '0.2';
                    insideEl.style.width = document.querySelector('table').offsetWidth + 'px';
                    clone.innerHTML = "<strong> Front-End Developer</strong>" + ' ' + clone.innerHTML + ' ' + '<strong>and Core Knowledge Review Agenda</strong>';
                    insideEl.appendChild(clone);
                    newEl.appendChild(insideEl);
                    this.stickingMenu = newEl;
                    document.body.appendChild(newEl);
                    this.animate(document.getElementById('stickingMenu'), 60, 0.03);
                } else if (document.getElementById('stickingMenu').style.opacity == "0") {
                    this.animate(document.getElementById('stickingMenu'), 60, 0.03);
                }
            },
            stickingMenu: '',
            restore: function() {
                var el = document.getElementById('stickingMenu'),
                    opacity = el && el.style.opacity;
                if (opacity > '0' && opacity | 0 == 1) {
                    this.animate(el, 100, 0.3, true);
                }
            },
			scrollTopCurrentData : Number(),
            scrollTop: function() {
                return (document.body.scrollTop || document.documentElement.scrollTop);
            },
            stickerEngine: function() {
                this.appendStickyMenu();
            },
            deanimate: function() {
                els2ani.forEach(function(i) {
                    i.style.opacity = '0.2';
                });
            },
            aniNonActiveState: function() {
                return this.stickingMenu && this.stickingMenu.style.opacity > 1;
            },
            animate: function(el, time, step, reverse) {
                var _interval,
                    direct = function() {
                        if (!el.style.opacity.match(/^1[.]/)) {
                            el.style.opacity = parseFloat(el.style.opacity) + step;
                        } else {
                            clearInterval(_interval);
                        }
                    },
                    obverse = function() {
                        if (document.getElementById('stickingMenu').style.opacity > 0) {
                            document.getElementById('stickingMenu').style.opacity = parseFloat(document.getElementById('stickingMenu').style.opacity) - step;
                        } else {
                            clearInterval(_interval);
                            document.getElementById('stickingMenu').style.opacity = 0;
                        }
                    };
                _interval = setInterval(function() {
                    reverse ? obverse() : direct();
                }, time);
            },
            handler: function(e) {
				var _config = {
                    runOnce: false,
                    event: window.event || e,
                    delta: (window.event || e).type == config.instance.mousewheelEvt && (window.event || e).detail ? (window.event || e).detail * (-120) : (window.event || e).type == config.instance.mousewheelEvt && (window.event || e).wheelDelta,
                    upwards: function() {
                        return this.delta ? this.delta >= 120 : config.instance.scrollTopCurrentData > config.instance.scrollTop();
                    },
                    downwards: function() {
                        return this.delta ? this.delta <= -120 : config.instance.scrollTopCurrentData < config.instance.scrollTop();
                    },
                    isAllTheWayDown: function() {
                        return window.innerHeight + 30 + (window.scrollY ? window.scrollY : window.pageYOffset) >= document.body.offsetHeight;
                    },
                    ani4short: function() {
                        els2ani.forEach(function(i) {
                            config.instance.animate(i, 110, 0.03);
                        });
                    }
                };
				
				if (_config.downwards() && config.instance.scrollTop() > aniTriggerEl.offsetTop - aniTriggerEl.scrollHeight) {
					
					_config.isAllTheWayDown() ? _config.ani4short() : config.instance.stickerEngine();
                }
				
				if(_config.upwards() && config.instance.aniNonActiveState()) {
					config.instance.restore();
					config.instance.deanimate();
				}
				config.instance.scrollTopCurrentData = config.instance.scrollTop();
            }
        }
    },
    domReady: function(callback) {
        config.eventsBinder(document, 'DOMContentLoaded', callback);
        config.eventsBinder(document, 'onreadystatechange', function() {
            if (document.readyState === 'complete') {
                callback();
            }
        });
    },
    eventsBinder: function(El, event, handler) {
        if (El && El.addEventListener) {
            El.addEventListener(event, handler);
		} else if (El && El.attachEvent) {
            El.attachEvent('on' + event, handler);
        }
    }
};

config.domReady(function() {
	config.instance = new config.animationConstruct([], 
	Array.prototype.filter.call(document.querySelectorAll('th span'), 
	function(i){ return i['innerText'] ? i['innerText'].match(/functional competencies/gi) : i['innerHTML'].match(/functional competencies/gi)})[0]);
	config.instance.init();
	config.eventsBinder(document, config.instance.mousewheelEvt, config.instance.handler);
	config.eventsBinder(document, 'keyup', config.instance.handler);
	config.eventsBinder(document, 'mousedown', config.instance.handler);	
	config.eventsBinder(document, 'touchend', config.instance.handler);
	config.eventsBinder(window, 'touchend', config.instance.handler);
});




