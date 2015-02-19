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
     * Flag to determine if HTML insert required
     */
    htmlInserted: false,

    /**
     * Breakpoint aliases
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
        if( this.htmlInserted === true ){
            return true;
        }

        $.each(this.breakpoints, function(i, alias){
            $("<div class='device-" + alias + " visible-" + alias + "'></div>").appendTo('body');
        });

        this.htmlInserted = true;
    },

    /**
     * Returns true if current breakpoint matches passed alias
     */
    is: function( alias ) {
        return $('.device-' + alias).css('display') !== 'none';
    },

    /**
     * Returns current breakpoint alias
     */
    current: function(){
        var viewport = this;
        var name = 'unrecognized';
        $.each(this.breakpoints, function(i, alias){
            if (viewport.is(alias)) {
                name = alias;
            }
        });
        return name;
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


$(function(){

    /**
     * Init Global viewport
     */
    window.viewport = new Viewport();

});