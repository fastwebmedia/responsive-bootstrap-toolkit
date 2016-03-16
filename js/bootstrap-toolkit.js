(function($) {

function Viewport (options) {
	if( !this instanceof Viewport ){
		throw new SyntaxError("Viewport constructor called without 'new' keyword!");
	}
	// merge the options in
	$.extend(this, options);

	this.init();
}

Viewport.prototype = {
	constructor:        Viewport,

	/**
	 * Determines default interval between firing 'changed' method
	 */
	interval: 300,

	/**
	 * Breakpoint aliases (in Order)
	 */
	breakpoints: ['xs', 'sm', 'md', 'lg'],

	/**
	 * Used to calculate intervals between consecutive function executions
	 */
	timer: new Date(),

	/**
	 * Setup the object
	 */
	init: function() {
		this.insertHTML();
	},

	/**
	 * Insert HTML into DOM if required
	 */
	insertHTML: function() {
		if( $('.device-xs').length ){
			return true;
		}

		$.each(this.breakpoints, function(i, alias){
			$("<div class='device-" + alias + " visible-" + alias + "'></div>").appendTo('body');
		});
	},

	/**
	 * Returns true if current breakpoint matches passed alias
	 */
	is: function( alias ) {
		return $('.device-' + alias).is(':visible');
	},

	/**
	 * Returns breakpoint if greater than or equal to passed alias
	 */
	gte: function( alias ) {
		var key = this.breakpoints.indexOf(alias);
		var newBreakpoints = this.breakpoints.slice(key);

		return this.current(newBreakpoints);
	},

	/**
	 * Returns breakpoint if lower than or equal to passed alias
	 */
	lte: function( alias ) {
		var key = this.breakpoints.indexOf(alias);
		var newBreakpoints = this.breakpoints.slice(0, key+1);

		return this.current(newBreakpoints);
	},

	/**
	 * Returns current breakpoint alias
	 */
	current: function(breakpoints){
		var viewport = this;
		var name = false;

		if( typeof breakpoints == "undefined" ){
			breakpoints = this.breakpoints;
		}
		$.each(breakpoints, function(i, alias){
			if (viewport.is(alias)) {
				name = alias;
			}
		});
		return name;
	},

	/**
	 * Check if device is mobile
	 */
	isMobile: function() {
		if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/iPhone|iPad|iPod/i)
			|| navigator.userAgent.match(/Opera Mini/i)
			|| navigator.userAgent.match(/IEMobile/i) ) {

			return true;
		}
		return false;
	},

	/**
	 * Waits specified number of milliseconds before executing a function
	 * Source: http://stackoverflow.com/a/4541963/2066118
	 */
	changed: function() {
		var timers = {};

		return function(callback, ms) {
			// Get unique timer ID
			var uID = (!uID) ? this.timer.getTime() : null;

			if (timers[uID]) {
				clearTimeout(timers[uID]);
			}
			// Use default interval if none specified
			if (typeof ms === "undefined") {
				ms = this.interval;
			}
			timers[uID] = setTimeout(callback, ms);
		};
	}()

};


$(document).ready(function(){
    window.viewport = new Viewport();
});

})(jQuery); // Fully reference jQuery after this point.
