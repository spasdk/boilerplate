/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

/* eslint no-path-concat: 0 */

'use strict';

var Component = require('../component'),
    visiblePage;


/**
 * Base page implementation.
 *
 * A full-screen top-level layer that can operate as an independent separate entity.
 * It is added to the document body on creation if not already linked.
 *
 * @constructor
 * @extends Component
 *
 * @param {Object} [config={}] - init parameters (all inherited from the parent)
 *
 * @example
 * var Page = require('stb/ui/page'),
 *     page = new Page({
 *         $node: document.getElementById(id)
 *     });
 *
 * page.addListener('show', function show () {
 *     // page is visible now
 * });
 */
function Page ( config ) {
    //var self = this;

    console.assert(typeof this === 'object', 'must be constructed via new');
    console.assert(typeof config === 'object', 'wrong config type');

    //config.focusable = true;

    // hide by default
    if ( !('hidden' in config) ) {
        config.hidden = true;
    }

    // parent constructor call
    Component.call(this, config);


    /*this.addListeners({
        show: function () {
            // hide previous page
            visiblePage && (visiblePage.hidden = true);
            // eslint-disable-next-line consistent-this
            visiblePage = this;
        },
        hide: function () {
            visiblePage = null;
        }
    });*/


    /**
     * Page visibility/active state flag.
     *
     * @readonly
     * @type {boolean}
     */
    //this.active = false;

    /**
     * Link to the currently active component with focus.
     *
     * @readonly
     * @type {Component}
     */
    //this.activeComponent = null;

    // set default className if classList property empty or undefined
    //config.className = 'page ' + (config.className || '');

    //config.className = this.CLASS_NODE;

    // state flag
    //this.active = this.$node.classList.contains('active');

    // correct DOM parent/child connection if necessary
    // if ( this.$node.parentNode === null ) {
    //     document.body.appendChild(this.$node);
    // }

    // always itself
    //this.page = this;

    /*this.$node.addEventListener('click', function ( event ) {
        console.log('page click', event);

        self.events.click  && self.emit('click', event);
    });*/

    // if ( DEVELOP ) {
    //     window.ComponentPage = Page;
    // }
}


// inheritance
Page.prototype = Object.create(Component.prototype);
Page.prototype.constructor = Page;

// set component name
Page.prototype.name = 'page';

//Page.prototype.CLASS_NODE = 'page';


/*Object.defineProperties(Page.prototype, {
    hidden: {
        get: function () {
            return this.private.hidden;
        },
        set: function ( value ) {
            // hide the visible page
            if ( value && visiblePage === this ) {
                // no visible pages
                visiblePage = null;
            }

            // show the hidden page
            if ( !value && visiblePage !== this ) {
                if ( this.private.hidden ) {
                    // hide previous page
                    visiblePage && (visiblePage.hidden = true);

                    //Component.prototype.show.call(this, data);

                    // eslint-disable-next-line consistent-this
                    visiblePage = this;

                    // /!*!// there are some listeners
                    // if ( this.parent.events['switch'] ) {
                    //     this.parent.emit('switch', {prev: prev, curr: this});
                    // }*!/

                    //return true;
                }
            }

            // apply visibility
            //Component.prototype.hidden = value;
            this.private.component.hidden = value;
        }
    }
});*/


/**
 * Make the page visible, i.e. set active page, and notify subscribers.
 * Hide previous visible page if exists.
 *
 * @param {Object} [data] - custom data which passed into handlers
 *
 * @return {boolean} operation status
 *
 * //@fires module:stb/ui/page.item~Page#show
 */
/*Page.prototype.show = function ( data ) {
    //var prev = null;

    // if ( DEVELOP ) {
    //     if ( !this.parent ) {
    //         throw new Error(__filename + ': no parent for page item');
    //     }
    //     // if ( this.parent.constructor.name !== 'PageList' ) {
    //     //     throw new Error(__filename + ': wrong parent for page item');
    //     // }
    //     if ( this.parent.currentPage && !(this.parent.currentPage instanceof Page) ) {
    //         throw new Error(__filename + ': wrong current page item type');
    //     }
    // }

    // is it hidden
    if ( this.hidden ) {
        // hide previous page
        visiblePage && visiblePage.hide(data);

        Component.prototype.show.call(this, data);

        // eslint-disable-next-line consistent-this
        visiblePage = this;

        /!*!// there are some listeners
         if ( this.parent.events['switch'] ) {
         this.parent.emit('switch', {prev: prev, curr: this});
         }*!/

        return true;
    }

    // nothing was done
    return false;
};*/


/**
 * Make the page hidden and notify subscribers.
 *
 * @return {boolean} operation status
 *
 * //@fires module:stb/ui/page.item~Page#hide
 */
/*Page.prototype.hide = function () {
    // if ( DEVELOP ) {
    //     if ( !this.parent ) {
    //         throw new Error(__filename + ': no parent for page item');
    //     }
    //     // if ( this.parent.constructor.name !== 'PageList' ) {
    //     //     throw new Error(__filename + ': wrong parent for page item');
    //     // }
    //     if ( this.parent.currentPage && !(this.parent.currentPage instanceof Page) ) {
    //         throw new Error(__filename + ': wrong current page item type');
    //     }
    // }

    if ( Component.prototype.hide.call(this) ) {
        visiblePage = null;

        return true;
    }

    // nothing was done
    return false;
};*/


// public
module.exports = Page;
