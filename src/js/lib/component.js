/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var Emitter = require('cjs-emitter');


// /**
//  * Base component implementation.
//  *
//  * Visual element that can handle sub-components.
//  * Each component has a DOM element container $node with a set of classes:
//  * "component" and some specific component class names depending on the hierarchy, for example "page".
//  * Each component has a unique ID given either from $node.id or from data.id. If not given will generate automatically.
//  *
//  * @constructor
//  * @extends Emitter
//  *
//  * @param {Object} [config={}] init parameters
//  * @param {Element} [config.id] component unique identifier (generated if not set)
//  * @param {string} [config.className] space-separated list of classes for "className" property of this.$node
//  * @param {Element} [config.$node] DOM element/fragment to be a component outer container
//  * @param {Element} [config.$body] DOM element/fragment to be a component inner container (by default is the same as $node)
//  * @param {Component} [config.parent] link to the parent component which has this component as a child
//  * @param {Array.<Component>} [config.children=[]] list of components in this component
//  * @param {Object.<string, function>} [config.events={}] list of event callbacks
//  * @param {boolean} [config.visible=true] component initial visibility state flag
//  * @param {boolean} [config.focusable=true] component can accept focus or not
//  * @param {boolean} [config.propagate=false] allow to emit events to the parent component
//  *
//  * @fires module:stb/component~Component#click
//  *
//  * @example
//  * var component = new Component({
//  *     $node: document.getElementById(id),
//  *     className: 'bootstrap responsive',
//  *     events: {
//  *         click: function () { ... }
//  *     }
//  * });
//  * component.add( ... );
//  * component.focus();
//  */
function Component ( config ) {
    // current execution context
    var self      = this,
        //focusable = false,
        classList, modifiers,
        $node;

    /*function onFocus ( event ) {
        //console.log(self, event);

        $node.classList.add(self.name + '--focused');

        if ( DEVELOP ) {
            $node.classList.add('develop-focused');
        }

        // notify listeners
        self.events.focus && self.emit('focus', event);
    }*/

    /*function onBlur ( event ) {
        //console.log(self, event);

        $node.classList.remove(self.name + '--focused');

        if ( DEVELOP ) {
            $node.classList.remove('develop-focused');
        }

        // notify listeners
        self.events.blur && self.emit('blur', event);
    }*/

    /*console.assert(typeof this === 'object', 'must be constructed via new');
    console.assert(typeof config === 'object', 'wrong config type');
    console.assert(!('name' in config) || typeof config.name === 'string', 'wrong config.name type');
    console.assert(!('name' in config) || config.name.length > 0, 'empty config.name');
    console.assert(!('id' in config) || typeof config.id === 'string', 'wrong config.id type');
    console.assert(!('id' in config) || config.id.length > 0, 'empty config.id');
    console.assert(!('id' in config) || document.getElementById(config.id) instanceof Element, 'DOM element was not found');
    console.assert(!('$node' in config) || config.$node instanceof Element, 'wrong config.$node type');
    //console.assert('id' in config || '$node' in config, 'config.id or config.$node should be used');
    console.assert(!('modifiers' in config) || Array.isArray(config.modifiers), 'wrong config.modifiers type');
    console.assert(!('events' in config) || typeof config.events === 'object', 'wrong config.events type');
    console.assert(!('hidden' in config) || typeof config.hidden === 'boolean', 'wrong config.hidden type');
    console.assert(!('focused' in config) || typeof config.focused === 'boolean', 'wrong config.focused type');*/

    // parent constructor call
    Emitter.call(this);

    /** @protected */
    this.internals = {
        hidden: false,
        focusable: false,
        focused: false
    };

    // apply custom name
    config.name && (this.name = config.name);

    // component DOM container (empty div in case nothing is given)
    //this.$node = $node = config.id ? document.getElementById(config.id) : config.$node || document.createElement('div');
    this.$node = $node = config.$node || document.createElement('div');

    // to do: use/remove
    //this.$node.removeAttribute('id');

    // sanitize
    modifiers = config.modifiers || [];

    // enable/disable state
    //this.disabled = !!config.disabled;
    //this.disabled && modifiers.push('disabled');

    classList = [this.name];

    // there are some block modifiers
    if ( modifiers.length ) {
        // build class names
        modifiers.forEach(function ( modifier ) {
            classList.push(self.name + '--' + modifier);
        });
    }

    // append all new classes to the existing ones
    //$node.classList.add.apply($node.classList, classList);
    $node.className = ($node.className ? $node.className + ' ' : '') + classList.join(' ');

    config.focusable && (this.focusable = true);

    // set focus if can and necessary
    config.focusable && config.focused && (this.focused = true);

    // visibility
    //this.hidden = !!config.hidden;
    //this.hidden && this.hide();
    //this.hidden && modifiers.push('hidden');
    config.hidden && (this.hidden = true);

    config.content && this.add.apply(this, config.content);

    // apply all given events
    config.events && this.addListeners(config.events);

    /*if ( config.focusable ) {
        // has focus
        $node.setAttribute('tabIndex', '0');
        // add handlers
        $node.addEventListener('focus', function ( event ) {
            $node.classList.add(self.name + '--focused');
            self.internals.focused = true;

            if ( DEVELOP ) {
                $node.classList.add('develop-focused');
            }

            // notify listeners
            self.events.focus && self.emit('focus', event);
        });
        $node.addEventListener('blur', function onBlur ( event ) {
            //console.log(self, event);

            $node.classList.remove(self.name + '--focused');
            self.internals.focused = false;

            if ( DEVELOP ) {
                $node.classList.remove('develop-focused');
            }

            // notify listeners
            self.events.blur && self.emit('blur', event);
        });
    }*/

    Object.defineProperties(this, {
        /*hidden: {
            get: function () {
                return hidden;
            },
            set: function ( value ) {
                // sanitize
                value = !!value;

                if ( hidden !== value ) {
                    // save
                    hidden = value;

                    // apply
                    if ( value ) {
                        // hide
                        // correct style
                        $node.classList.add(this.name + '--hidden');
                        // notify listeners
                        this.events.hide && this.emit('hide');
                    } else {
                        // show
                        // correct style
                        $node.classList.remove(this.name + '--hidden');
                        // notify listeners
                        this.events.show && this.emit('show');
                    }
                }
            }
        },*/

        /*focusable: {
            get: function () {
                return focusable;
            },
            set: function ( value ) {
                // sanitize
                value = !!value;

                if ( focusable !== value ) {
                    // save
                    focusable = value;

                    // apply
                    if ( value ) {
                        // has focus
                        $node.setAttribute('tabIndex', '0');
                        // add handlers
                        $node.addEventListener('focus', onFocus);
                        $node.addEventListener('blur', onBlur);
                    } else {
                        // does not have focus
                        $node.removeAttribute('tabIndex');
                        // remove handlers
                        $node.removeEventListener('focus', onFocus);
                        $node.removeEventListener('blur', onBlur);
                    }
                }
            }
        },*/

        /*focused: {
            get: function () {
                return document.activeElement === this.$node;
            },
            set: function ( value ) {
                // apply
                if ( value ) {
                    this.$node.focus();
                } else {
                    this.$node.blur();
                }
            }
        }*/
    });

    // apply and render
    //this.data = config.data;
    //config.render && (this.render = config.render);
    //this.render($node, config.data);

    //this.hidden = config.hidden;

    // can accept focus or not
    //this.focusable = config.focusable;


    // if ( DEVELOP ) {
    //     if ( typeof config !== 'object' ) {
    //         throw new Error(__filename + ': wrong config type');
    //     }
    //     // init parameters checks
    //     if ( config.id && typeof config.id !== 'string' ) {
    //         throw new Error(__filename + ': wrong or empty config.id');
    //     }
    //     if ( 'className' in config && (!config.className || typeof config.className !== 'string') ) {
    //         throw new Error(__filename + ': wrong or empty config.className');
    //     }
    //     if ( config.$node && !(config.$node instanceof Element) ) {
    //         throw new Error(__filename + ': wrong config.$node type');
    //     }
    //     if ( config.$body && !(config.$body instanceof Element) ) {
    //         throw new Error(__filename + ': wrong config.$body type');
    //     }
    //     if ( config.parent && !(config.parent instanceof Component) ) {
    //         throw new Error(__filename + ': wrong config.parent type');
    //     }
    //     if ( config.children && !Array.isArray(config.children) ) {
    //         throw new Error(__filename + ': wrong config.children type');
    //     }
    // }

    /**
     * Component visibility state flag.
     *
     * @readonly
     * @type {boolean}
     */
    //this.visible = true;

    /**
     * Component can accept focus or not.
     *
     * @type {boolean}
     */
    //this.focusable = true;

    /**
     * DOM outer handle.
     *
     * @type {Element}
     */
    //this.$node = null;

    /**
     * DOM inner handle.
     * In simple cases is the same as $node.
     *
     * @type {Element}
     */
    //this.$body = null;

    /**
     * Link to the parent component which has this component as a child.
     *
     * @type {Component}
     */
    //this.parent = null;

    /**
     * List of all children components.
     *
     * @type {Component[]}
     */
    //this.children = [];

    /**
     * allow to emit events to the parent component
     *
     * @readonly
     * @type {boolean}
     */
    //this.propagate = !!config.propagate;

    // inner handle - the same as outer handler in case nothing is given
    //this.$body = config.$body || this.$node;

    // set CSS class names
    //this.$node.className += ' component ' + (config.className || '');
    // previous approach is not good as it mess with components hierarchy
    //this.$node.className = this.name + ' ' + (config.className || '');

    // build CSS class chain
    //this.$node.className = className + ' ' + (config.className || '');

    // apply component id if given, generate otherwise
    //this.id = config.id || this.$node.id || 'cid' + counter++;

    // apply hierarchy
    // if ( config.parent ) {
    //     // add to parent component
    //     config.parent.add(this);
    // }

    // apply given visibility
    // if ( config.visible === false ) {
    //     // default state is visible
    //     this.hide();
    // }

    // apply focus handling method
    // if ( config.focusable === false ) {
    //     // can't accept focus
    //     this.focusable = false;
    // }

    // a descendant defined own events
    // if ( this.defaultEvents ) {
    //     // sanitize
    //     config.events = config.events || {};
    //
    //     if ( DEVELOP ) {
    //         if ( typeof config.events !== 'object' ) {
    //             throw new Error(__filename + ': wrong config.events type');
    //         }
    //         if ( typeof this.defaultEvents !== 'object' ) {
    //             throw new Error(__filename + ': wrong this.defaultEvents type');
    //         }
    //     }
    //
    //     for ( name in this.defaultEvents ) {
    //         // overwrite default events with user-defined
    //         config.events[name] = config.events[name] || this.defaultEvents[name];
    //     }
    // }

    // apply the given children components
    // if ( config.children ) {
    //     // apply
    //     this.add.apply(this, config.children);
    // }

    // component activation by mouse
    $node.addEventListener('click', function ( event ) {
        event.stopPropagation();

        if ( DEVELOP ) {
            if ( event.ctrlKey ) {
                //debug.info('"window.link" or "' + self.id + '.component"', 'this component is now available in global scope');
                //self.$node.classList.toggle('wired');

                //console.group('component ' + self.constructor.name + ' #' + self.id);
                console.log(self);
                //console.dir(self);
                //console.log(self.$node);
                //console.dir(self.$node);
                //console.groupEnd();

                // self.$node.style.outline = '1px dashed green';
                // self.$node.style.outlineOffset = '-1px';

                event.preventDefault();

                self.focus();

                window.link = self;
                console.log('this component is now available in global scope as "window.link" or "' + self.id + '.component"');

                return;
            }
        }

        //console.log('DOM event');
        // left mouse button
        if ( event.button === 0 && !self.disabled ) {
            /**
             * Mouse click event.
             *
             * @event module:stb/component~Component#click
             *
             * @type {Object}
             * @property {Event} event click event data
             */
            self.events.click  && self.emit('click', event);

            //console.log('event.defaultPrevented', event.defaultPrevented);

            // apply focus if not canceled
            !event.defaultPrevented && self.internals.focusable && $node.focus();
        }
    });

    if ( DEVELOP ) {
        this.counters[this.constructor.name] = this.counters[this.constructor.name] || 0;
        this.counters[this.constructor.name]++;

        // expose inner ID to global scope
        this.$node.dataset.name = 'component' + this.constructor.name + this.counters[this.constructor.name];
        window[this.$node.dataset.name] = this;

        $node.addEventListener('click', function ( event ) {
            var time = Date.now();

            if ( event.ctrlKey ) {
                event.stopPropagation();
                window.link = self;
                window['c' + time] = self;

                console.group('component info');
                console.log(self);
                console.log($node.getBoundingClientRect());
                console.log('in DEVELOP mode this component is available in the global scope as "%s"', self.$node.dataset.name);
                console.groupEnd();
            }
        });

        // expose a link
        Object.defineProperty($node, 'component', {
            get: function () {
                console.warn('Accessing the associated component from a DOM node is a development-only feature!');

                return self;
            }
        });

        window['Component' + this.constructor.name] = this.constructor;

        //$node.component = this.$body.component = this;
        //$node.component = this;
        //$node.title = this.constructor.name + '#' + this.id + ' (outer)';
        //$node.title = this.name + ' instance of ' + this.constructor.name;
        //this.$body.title = this.name + '#' + this.id + ' (inner)';
    }

    //if ( this.focusable ) {}

    // debug.info('create component ' + this.name + '#' + this.id, null, {
    //     tags: ['create', 'component', this.name, this.id]
    // });
    //return this;
}


// inheritance
Component.prototype = Object.create(Emitter.prototype);
Component.prototype.constructor = Component;


Object.defineProperties(Component.prototype, {
    focusable: {
        get: function () {
            return this.internals.focusable;
        },
        set: function ( value ) {
            var self      = this,
                $node     = this.$node,
                nodeClass = this.name + '--focused';

            // sanitize
            value = !!value;

            // nothing has changed
            if ( this.internals.focusable === value ) {
                console.warn('focusable: current and new values are identical', value, this);
            } else {
                // save
                this.internals.focusable = value;

                // apply
                if ( value ) {
                    // has focus
                    $node.setAttribute('tabIndex', '0');

                    // prepare focus handlers
                    this.internals.onfocus = function onFocus ( event ) {
                        // apply
                        $node.classList.add(nodeClass);
                        DEVELOP && $node.classList.add('develop-focused');
                        // notify listeners
                        self.events.focus && self.emit('focus', event);
                    };
                    this.internals.onblur = function onFocus ( event ) {
                        // apply
                        $node.classList.remove(nodeClass);
                        DEVELOP && $node.classList.remove('develop-focused');
                        // notify listeners
                        self.events.blur && self.emit('blur', event);
                    };

                    // add handlers
                    $node.addEventListener('focus', this.internals.onfocus);
                    $node.addEventListener('blur', this.internals.onblur);
                } else {
                    // does not have focus
                    $node.removeAttribute('tabIndex');

                    // remove handlers
                    $node.removeEventListener('focus', this.internals.onfocus);
                    $node.removeEventListener('blur', this.internals.onblur);

                    // clear
                    delete this.internals.onfocus;
                    delete this.internals.onblur;

                    // blur just in case
                    this.focused = false;
                }
            }
        }
    },

    focused: {
        get: function () {
            return this.internals.focused;
        },
        set: function ( value ) {
            // apply
            if ( value ) {
                this.$node.focus();

                if ( document.activeElement !== this.$node ) {
                    console.warn('focused: fail to focus or not focusable', value, this);
                }
            } else {
                this.$node.blur();
            }
        }
    },

    hidden: {
        get: function () {
            return this.internals.hidden;
        },
        set: function ( value ) {
            var $node     = this.$node,
                nodeClass = this.name + '--hidden';

            // sanitize
            value = !!value;

            // nothing has changed
            if ( this.internals.hidden === value ) {
                console.warn('hidden: current and new values are identical', value, this);
            } else {
                // save
                this.internals.hidden = value;

                // apply
                if ( value ) {
                    // hide
                    $node.classList.add(nodeClass);
                    // notify listeners
                    this.events.hide && this.emit('hide');
                } else {
                    // show
                    $node.classList.remove(nodeClass);
                    // notify listeners
                    this.events.show && this.emit('show');
                }
            }
        }
    }
    /*,
    data: {
        get: function () {
            return this.internals.data;
        },
        set: function ( value ) {
            this.render(this.$node, value);
        }
    }*/
});


/*Component.prototype.init = function ( data ) {
    // store
    this.internals.data = data;

    // build
    this.render(this.$node, data);
};*/


/**
 * @abstract
 * @param {Element} $node - component DOM container
 * @param {*} data - content to use to build component
 */
/*Component.prototype.render = function ( $node, data ) {
    // // store
    // this.internals.data = data;
    //
    // // build
    // $node.textContent = data;
};*/


if ( DEVELOP ) {
    // expose constructor to global scope
    window.Component = Component;

    Component.prototype.counters = {};
}


/**
 * List of all default event callbacks.
 *
 * @type {Object.<string, function>}
 */
//Component.prototype.defaultEvents = null;


/**
 * Add a new component as a child.
 *
 * //@param {...Component} [child] variable number of elements to append
 *
 * //@files Component#add
 *
 * @example
 * panel.add(
 *     new Button( ... ),
 *     new Button( ... )
 * );
 */
Component.prototype.add = function () {
    var index, child;

    // walk through all the given elements
    for ( index = 0; index < arguments.length; index++ ) {
        child = arguments[index];

        // if ( DEVELOP ) {
        //     if ( !(child instanceof Component) ) {
        //         throw new Error(__filename + ': wrong child type');
        //     }
        // }

        this.$node.appendChild(child.$node || child);

        // // apply
        // this.children.push(child);
        // child.parent = this;
        //
        // // correct DOM parent/child connection if necessary
        // if ( child.$node && child.$node.parentNode === null ) {
        //     this.$body.appendChild(child.$node);
        // }
        //
        // debug.info('add component ' + child.name + '#' + child.id + ' to ' + this.name + '#' + this.id, null, {
        //     tags: ['add', 'component', this.name, this.id, child.name, child.id]
        // });
        //
        // // there are some listeners
        // if ( this.events.add ) {
        //     /**
        //      * A child component is added.
        //      *
        //      * @event module:stb/component~Component#add
        //      *
        //      * @type {Object}
        //      * @property {Component} item new component added
        //      */
        //     this.emit('add', {item: child});
        // }
        //
        // //debug.log('component ' + this.name + '#' + this.id + ' new child: ' + child.name + '#' + child.id);
    }
};


/* @todo: consider activation in future */
///**
// * Insert component into the specific position.
// *
// * @param {Component} child component instance to insert
// * @param {number} index insertion position
// */
//Component.prototype.insert = function ( child, index ) {
//    var prevIndex = this.children.indexOf(child);
//
//    if ( DEVELOP ) {
//        if ( arguments.length !== 2 ) { throw new Error(__filename + ': wrong arguments number'); }
//        if ( !(child instanceof Component) ) { throw new Error(__filename + ': wrong child type'); }
//    }
//
//    if ( prevIndex !== -1 ) {
//        this.children.splice(prevIndex, 1);
//        this.$body.removeChild(child.$node);
//    }
//
//    if ( index === this.children.length ) {
//        this.$body.appendChild(child.$node);
//    } else {
//        this.$body.insertBefore(child.$node, this.$body.children[index]);
//    }
//    this.children.splice(index, 0, child);
//
//    if ( !child.parent ) {
//        child.parent = this;
//    }
//};


/**
 * Delete this component and clear all associated events.
 *
 * //@fires module:stb/component~Component#remove
 */
Component.prototype.remove = function () {
    var $parent = this.$node.parentNode;

    // really inserted somewhere
    // if ( this.parent ) {
    //     if ( DEVELOP ) {
    //         if ( !(this.parent instanceof Component) ) {
    //             throw new Error(__filename + ': wrong this.parent type');
    //         }
    //     }
    //
    //     // active at the moment
    //     if ( app.activePage.activeComponent === this ) {
    //         this.blur();
    //         this.parent.focus();
    //     }
    //     this.parent.children.splice(this.parent.children.indexOf(this), 1);
    // }

    // remove all children
    // this.children.forEach(function ( child ) {
    //     if ( DEVELOP ) {
    //         if ( !(child instanceof Component) ) {
    //             throw new Error(__filename + ': wrong child type');
    //         }
    //     }
    //
    //     child.remove();
    // });

    //console.assert(this.$node.parentNode instanceof Element, 'wrong config type');

    // clear DOM
    $parent && $parent.removeChild(this.$node);

    // notify listeners
    this.events.remove && this.emit('remove');

    // remove all listeners
    this.events = {};

    //debug.log('component ' + this.name + '#' + this.id + ' remove', 'red');
    // debug.info('remove component ' + this.name + '#' + this.id, null, {
    //     tags: ['remove', 'component', this.name, this.id]
    // });
};


/**
 * Activate the component.
 * Notify the owner-page and apply CSS class.
 *
 * @return {boolean} operation status
 *
 * //@fires module:stb/component~Component#focus
 */
/*Component.prototype.focus = function () {
    this.$node.focus();

    // not already focused
    //if ( this.focusable && this !== focusComponent ) {
    // if ( this !== focusComponent ) {
    //     // notify the current focused component
    //     focusComponent && focusComponent.blur();
    //
    //     // apply
    //     this.$node.classList.add(this.name + '--focused');
    //     focusComponent = this;
    //
    //     if ( DEVELOP ) {
    //         this.$node.classList.add('develop-focused');
    //     }
    //
    //     // notify listeners
    //     this.events.focus && this.emit('focus', data);
    //
    //     // ok
    //     return true;
    // }

    // status
    return document.activeElement === this.$node;
};*/


/**
 * Remove focus.
 * Change page.activeComponent and notify subscribers.
 *
 * @return {boolean} operation status
 *
 * //@fires module:stb/component~Component#blur
 */
/*Component.prototype.blur = function () {
    this.$node.blur();

    // is it focused
    // if ( this === focusComponent ) {
    //     // apply
    //     this.$node.classList.remove(this.name + '--focused');
    //     focusComponent = null;
    //
    //     if ( DEVELOP ) {
    //         this.$node.classList.remove('develop-focused');
    //     }
    //
    //     // notify listeners
    //     this.events.blur && this.emit('blur');
    //
    //     // ok
    //     return true;
    // }

    // status
    return document.activeElement !== this.$node;
};*/


/**
 * Make the component visible and notify subscribers.
 *
 * //@param {Object} [data] - custom data which passed into handlers
 *
 * @return {boolean} operation status
 *
 * //@fires module:stb/component~Component#show
 */
/*Component.prototype.show = function () {
    if ( this.internals.hidden ) {
        // correct style
        this.$node.classList.remove(this.name + '--hidden');
        // flag
        this.internals.hidden = false;
        // notify listeners
        this.events.show && this.emit('show');

        // ok
        return true;
    }

    console.warn('component is already visible!', this);

    // status
    return false;
};*/


/**
 * Make the component hidden and notify subscribers.
 *
 * //@param {Object} [data] - custom data which passed into handlers
 *
 * @return {boolean} operation status
 *
 * //@fires module:stb/component~Component#hide
 */
/*Component.prototype.hide = function () {
    if ( !this.internals.hidden ) {
        // correct style
        this.$node.classList.add(this.name + '--hidden');
        // flag
        this.internals.hidden = true;
        // notify listeners
        this.events.hide && this.emit('hide');

        // ok
        return true;
    }

    console.warn('component is already hidden!', this);

    // status
    return false;
};*/


/*Component.prototype.enable = function ( data ) {
    if ( this.disabled ) {
        // correct style
        this.$node.classList.remove(this.name + '--disabled');
        // flag
        this.disabled = false;
        // notify listeners
        this.events.enable && this.emit('enable', data);

        // ok
        return true;
    }

    // status
    return false;
};


Component.prototype.disable = function ( data ) {
    if ( !this.disabled ) {
        // remove focus
        this.blur();

        // correct style
        this.$node.classList.add(this.name + '--disabled');
        // flag
        this.disabled = true;
        // notify listeners
        this.events.disable && this.emit('disable', data);

        // ok
        return true;
    }

    // status
    return false;
};*/


// public
module.exports = Component;
