/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

const
    Component = require('../component');


/**
 * Base button implementation.
 *
 * Has global options:
 *     Button.prototype.clickDuration - time to apply "click" class, does not apply if 0
 *
 * @constructor
 * @extends Component
 *
 * @param {Object} [config={}] - init parameters (all inherited from the parent)
 * @param {string} [config.title] - button caption text (generated if not set)
 * @param {string} [config.icon] - button icon name
 *
 * @example
 * var Button = require('stb/ui/button'),
 *     btnSimple, btnIcon, btnDetached;
 *
 * btnSimple = new Button({
 *     $node: document.getElementById('btnSimple'),
 *     title: 'Simple button'
 * });
 *
 * btnIcon = new Button({
 *     $node: document.getElementById('btnIcon'),
 *     icon: 'menu'
 *     title: 'Button with icon'
 * });
 *
 * btnDetached = new Button({
 *     title: 'Button not added to the page',
 *     className: 'wide'
 * });
 */
function Button ( config ) {
    //const self = this;

    console.assert(typeof this === 'object', 'must be constructed via new');
    console.assert(typeof config === 'object', 'wrong config type');

    //config.name = 'spa-component-button' + (config.className || '');

    // set default className if classList property empty or undefined
    //config.className = this.name + ' ' + (config.className || '');

    config.focusable = true;

    // parent constructor call
    Component.call(this, config);

    // optional dom
    // if ( config.icon ) {
    //     // insert icon
    //     this.$icon = this.$body.appendChild(document.createElement('div'));
    //     this.$icon.className = 'icon ' + config.icon;
    // }
    //
    // // insert caption placeholder
    // this.$text = this.$body.appendChild(document.createElement('div'));
    // this.$text.classList.add('text');

    if ( config.title ) {
        // fill it
        this.$node.textContent = config.title;
    }

    // this.$node.addEventListener('click', function ( event ) {
    //     console.log('button node click', event);
    //
    //     self.events.click && self.emit('click', event);
    // });

    // if ( DEVELOP ) {
    //     window.ComponentButton = Button;
    // }
}


// inheritance
Button.prototype = Object.create(Component.prototype);
Button.prototype.constructor = Button;

// set component name
Button.prototype.name = 'button';


/*Button.prototype.render = function ( $node, data ) {
    // store
    this.private.data = data;

    // build
    $node.textContent = data.title;
};*/


// time to apply "click" class, does not apply if 0
//Button.prototype.clickDuration = 200;


/**
 * List of all default event callbacks.
 *
 * @type {Object.<string, function>}
 */
// Button.prototype.defaultEvents = {
//     /**
//      * Default method to handle mouse click events.
//      */
//     click: function () {
//         // current execution context
//         var self = this;
//
//         this.$node.classList.add('click');
//
//         setTimeout(function () {
//             self.$node.classList.remove('click');
//         }, this.clickDuration);
//     },
//
//     /**
//      * Default method to handle keyboard keydown events.
//      *
//      * @param {Object} event generated event
//      */
//     keydown: function ( event ) {
//         if ( event.code === keys.enter ) {
//             // emulate click
//             // there are some listeners
//             if ( this.events['click'] ) {
//                 /**
//                  * Mouse click event emulation.
//                  *
//                  * @event module:stb/ui/button~Button#click
//                  *
//                  * @type {Object}
//                  * @property {Event} event click event data
//                  */
//                 this.emit('click', {event: event});
//             }
//         }
//     }
// };


// public
module.exports = Button;
