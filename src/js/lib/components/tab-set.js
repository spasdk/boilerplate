/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var Component = require('../component');


function TabSet ( config ) {
    // parent constructor call
    Component.call(this, config);

    this.private.current = null;
}


// inheritance
TabSet.prototype = Object.create(Component.prototype);
TabSet.prototype.constructor = TabSet;

// set component name
TabSet.prototype.name = 'tab-set';


Object.defineProperties(TabSet.prototype, {
    current: {
        get: function () {
            return this.private.current;
        },
        set: function ( current ) {
            var previous = this.private.current;

            // nothing has changed
            if ( current === previous ) {
                console.warn('current: current and new values are identical', current, this);
            } else {
                // hide current visible tab
                previous && (previous.hidden = true);

                // show new
                this.private.current = current;
                current.hidden = false;

                // notify listeners
                this.events.switch && this.emit('switch', previous, current);
            }
        }
    }
});


TabSet.prototype.add = function () {
    var index, tab;

    // walk through all the given elements
    for ( index = 0; index < arguments.length; index++ ) {
        tab = arguments[index];

        // all tabs are hidden from the start
        tab.hidden = true;

        // apply
        this.$node.appendChild(tab.$node);
    }
};


// public
module.exports = TabSet;
