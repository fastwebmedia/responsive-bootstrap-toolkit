/*!
 * Responsive Bootstrap Toolkit
 * Author:    Maciej Gurban
 * License:   MIT
 * Version:   2.3.0 (2015-02-15)
 * Origin:    https://github.com/maciej-gurban/responsive-bootstrap-toolkit
 */
;var ResponsiveBootstrapToolkit = (function($){
    // Methods and properties
    var self = {

        /**
         * Determines default interval between firing 'changed' method
         */
        interval: 300,

        /**
         * Breakpoint aliases
         */
        breakpoints: ['xs', 'sm', 'md', 'lg'],

        /**
         * Used to calculate intervals between consecutive function executions
         */
        timer: new Date(),

        init: function() {
            self.insertHTML();
            return self;
        },

        insertHTML: function() {
            $.each(self.breakpoints, function(i, alias){
                $('<div class="device-'+alias+' visible-'+alias+'"></div>').appendTo('body');
            });
        },

        /**
         * Returns true if current breakpoint matches passed alias
         */
        is: function( alias ) {
            return $('.device-'+alias).css('display') !== 'none';
        },

        /**
         * Returns current breakpoint alias
         */
        current: function(){
            var name = 'unrecognized';
            $.each(self.breakpoints, function(i, alias){
                if (self.is(alias)) {
                    name = alias;
                }
            });
            return name;
        },

        /*
         * Waits specified number of milliseconds before executing a function
         * Source: http://stackoverflow.com/a/4541963/2066118
         */
        changed: function() {
            var timers = {};
            return function(callback, ms) {
                // Get unique timer ID
                var uID = (!uID) ? self.timer.getTime() : null;
                if (timers[uID]) {
                    clearTimeout(timers[uID]);
                }
                // Use default interval if none specified
                if (typeof ms === "undefined") {
                    ms = self.interval;
                }
                timers[uID] = setTimeout(callback, ms);
            };
        }()

    };

    $(function(){
        self.init();
    });

    return self;

})(jQuery);