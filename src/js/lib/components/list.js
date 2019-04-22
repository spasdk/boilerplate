/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

'use strict';

var Component = require('../component');


/**
 *
 * @constructor
 * @extends Component
 *
 * @param {Object} [config={}] - init parameters (all inherited from the parent)
 */
function List ( config ) {
    var self = this,
        $node;

    console.assert(typeof this === 'object', 'must be constructed via new');
    console.assert(typeof config === 'object', 'wrong config type');

    config.focusable = true;

    // parent constructor call
    Component.call(this, config);

    // shortcut
    $node = this.$node;

    /**
     * Link to the currently focused DOM element.
     *
     * @type {Element}
     */
    //this.$focusItem = null;

    //config.render && (this.render = config.render);

    Object.defineProperties(this, {
        /*data: {
            get: function () {
                return data;
            },
            set: function ( value ) {
                var $fragment = document.createDocumentFragment();

                // sanitize
                value = value || [];

                // valid input
                if ( Array.isArray(value) ) {
                    // store
                    data = value;

                    // clear container
                    while ( $node.lastChild ) {
                        $node.removeChild($node.lastChild);
                    }

                    // reset focus states
                    focusIndex = $focusItem = undefined;

                    // create items
                    data.forEach(function ( dataItem, index ) {
                        var $item = document.createElement('div'),
                            $wrap = document.createElement('div');

                        $item.dataset.index = index;
                        $item.className = this.name + '__item';
                        this.render($item, dataItem);
                        //this.render($wrap, dataItem);

                        //$item.appendChild($wrap);
                        $fragment.appendChild($item);
                    }, this);

                    // fill
                    $node.appendChild($fragment);
                } else {
                    console.error('wrong data type', value);
                }
            }
        },*/

        // // todo: support blur
        // $focusItem: {
        //     get: function () {
        //         return $focusItem;
        //     },
        //     set: function ( $value ) {
        //         var itemClass = this.name + '__item--focused';
        //
        //         // valid focus candidate
        //         if ( $value && $value.parentNode === $node ) {
        //             // not previously focused
        //             if ( $value !== $focusItem ) {
        //                 // clear the previous focused element
        //                 $focusItem && $focusItem.classList.remove(itemClass);
        //
        //                 // store
        //                 $focusItem = $value;
        //                 focusIndex = Number($value.dataset.index);
        //
        //                 // apply styles
        //                 $value.classList.add(itemClass);
        //
        //                 // notify listeners
        //                 this.events['focus:item'] && this.emit('focus:item', data[focusIndex], $focusItem, focusIndex);
        //             }
        //         } else {
        //             console.error('$focusItem should be a child element of $node', $value);
        //         }
        //     }
        // },
        //
        // focusIndex: {
        //     get: function () {
        //         return focusIndex;
        //     },
        //     set: function ( value ) {
        //         var $target;
        //
        //         // sanitize
        //         value = Number(value);
        //
        //         // something has changed
        //         if ( focusIndex !== value ) {
        //             // valid input
        //             if ( value >= 0 && value < this.data.length ) {
        //                 // find the element to focus
        //                 $target = $node.children[value];
        //                 // apply
        //                 this.$focusItem = $target;
        //             } else {
        //                 console.error('focusIndex is out of range', value);
        //             }
        //         }
        //     }
        // }
    });

    // custom visualization
    config.render && (this.render = config.render);

    // apply and render
    config.data && (this.data = config.data);

    //$node.addEventListener('click', function ( event ) {
    this.addListener('click', function ( event ) {
        var $item = event.target;

        // find the top item
        while ( $item.parentNode !== $node ) {
            $item = $item.parentNode;
        }

        // alternative way to find the index of clicked item
        //console.log(Array.prototype.indexOf.call($item.parentNode.children, $item));

        // notify listeners
        //self.events.click && self.emit('click', /*data[$item.dataset.index],*/ event);

        // listeners can cancel focusing
        if ( !event.defaultPrevented ) {
            self.$focusItem = $item;
        }
    });

    // this.addListener('click', function ( data, event ) {
    //     //console.log(data, event);
    //
    //     //event.preventDefault();
    //
    //     /*var $target = event.target;
    //
    //     //console.log(event);
    //     // @todo: remove event.path - not supported in Firefox
    //     // there can be children in list item
    //     // so need to travers through propagation chain
    //     var $item = event.path.find(function ( element ) {
    //         //console.log('===', element.parentNode, self.$node);
    //         return element.parentNode === self.$node;
    //     });
    //
    //     /!*while ( $target.parentNode === self.$node ) {
    //         $target = $target.parentNode;
    //     }*!/
    //
    //     //console.log('click in constructor');
    //
    //     // notify listeners
    //     self.events['click:item'] && self.emit('click:item', self.data[$item.index], event);
    //
    //     //console.log(event);
    //
    //     if ( !event.defaultPrevented ) {
    //         //console.log('$item', $item);
    //
    //         if ( $item ) {
    //             self.focusItem($item);
    //         }
    //
    //         // if ( self.$focusItem ) {
    //         //     self.$focusItem.className = self.CLASS_ITEM;
    //         // }
    //         //
    //         // event.target.className = self.CLASS_ITEM_FOCUSED;
    //         // self.$focusItem = event.target;
    //         //
    //         // // there are some listeners
    //         // if ( self.events['focus:item'] ) {
    //         //     // notify listeners
    //         //     self.emit('focus:item', data[event.target.index], event);
    //         // }
    //     }*/
    // });

    // if ( DEVELOP ) {
    //     window.ComponentList = List;
    // }
}


// inheritance
List.prototype = Object.create(Component.prototype);
List.prototype.constructor = List;

// set component name
List.prototype.name = 'list';

// base classes
//List.prototype.CLASS_NODE         = 'list';
//List.prototype.CLASS_ITEM         = List.prototype.CLASS_NODE + '__item';
//List.prototype.CLASS_ITEM_FOCUSED = List.prototype.CLASS_ITEM + ' ' + List.prototype.CLASS_ITEM + '--focused';


Object.defineProperties(List.prototype, {
    data: {
        get: function () {
            return this.internals.data;
        },
        set: function ( data ) {
            var $node     = this.$node,
                $fragment = document.createDocumentFragment(),
                internals = this.internals;

            // sanitize
            data = data || [];

            // valid input
            if ( Array.isArray(data) ) {
                // notify listeners
                this.events.data && this.emit('data', data, internals.data);
                // store
                internals.data = data;

                // clear container
                while ( $node.lastChild ) {
                    $node.removeChild($node.lastChild);
                }

                // reset focus states
                internals.focusIndex = internals.$focusItem = null;

                // create items
                data.forEach(function ( dataItem, index ) {
                    var $item = document.createElement('div');

                    // build item
                    $item.dataset.index = index;
                    $item.className = this.name + '__item';
                    this.render($item, dataItem);

                    $fragment.appendChild($item);
                }, this);

                // fill
                $node.appendChild($fragment);
            } else {
                console.error('wrong data type', data);
            }
        }
    },

    $focusItem: {
        get: function () {
            return this.internals.$focusItem;
        },
        set: function ( $value ) {
            var internals  = this.internals,
                $focusItem = internals.$focusItem,
                focusIndex = internals.focusIndex,
                itemClass  = this.name + '__item--focused';

            // valid focus candidate or null to clear focus
            if ( ($value && $value.parentNode === this.$node) || !$value ) {
                // not clearing
                if ( $value ) {
                    // notify listeners
                    this.events['click:item'] && this.emit('click:item', internals.data[focusIndex], $focusItem, focusIndex);
                }

                // nothing has changed
                if ( $value === $focusItem ) {
                    console.warn('$focusItem: current and new values are identical', $value, this);
                } else {
                    // the previous focused element
                    if ( $focusItem ) {
                        // clear
                        $focusItem.classList.remove(itemClass);
                        // notify listeners
                        this.events['blur:item'] && this.emit('blur:item', internals.data[focusIndex], $focusItem, focusIndex);
                    }

                    // store
                    internals.$focusItem = $focusItem = $value || null;
                    internals.focusIndex = focusIndex = $focusItem ? Number($focusItem.dataset.index) : null;

                    // new selection
                    if ( $focusItem ) {
                        // apply styles
                        $focusItem.classList.add(itemClass);
                        // notify listeners
                        this.events['focus:item'] && this.emit('focus:item', internals.data[focusIndex], $focusItem, focusIndex);
                    }
                }
            } else {
                console.error('$focusItem should be a child element of $node', $value);
            }
        }
    },

    focusIndex: {
        get: function () {
            return this.internals.focusIndex;
        },
        set: function ( value ) {
            var internals = this.internals,
                $target;

            if ( value === null || value === undefined ) {
                // reset
                this.$focusItem = null;
            } else {
                // sanitize
                value = Number(value);

                // nothing has changed
                if ( internals.focusIndex === value ) {
                    console.warn('focusIndex: current and new values are identical', value, this);
                } else {
                    // valid input
                    if ( value >= 0 && value < internals.data.length ) {
                        // find the element to focus
                        $target = this.$node.children[value];
                        // apply
                        this.$focusItem = $target;
                    } else {
                        console.error('focusIndex is out of range', value);
                    }
                }
            }
        }
    }
});


/**
 * Method to build each list item content.
 *
 * @param {Element} $item - item DOM link
 * @param {*} data - associated with this item data
 */
List.prototype.render = function ( $item, data ) {
    $item.textContent = data;

    // var //internals = this.internals,
    //     $fragment = document.createDocumentFragment();
    //
    // // sanitize
    // this.internals.data = data = data || [];
    //
    // // valid input
    // if ( Array.isArray(data) ) {
    //     // store
    //     //data = data;
    //
    //     // clear container
    //     while ( $node.lastChild ) {
    //         $node.removeChild($node.lastChild);
    //     }
    //
    //     // reset focus states
    //     this.internals.focusIndex = this.internals.$focusItem = undefined;
    //
    //     // create items
    //     data.forEach(function ( dataItem, index ) {
    //         var $item = document.createElement('div'),
    //             $wrap = document.createElement('div');
    //
    //         $item.dataset.index = index;
    //         $item.className = this.name + '__item';
    //         $item.textContent = dataItem;
    //         //this.render($item, dataItem);
    //         //this.render($wrap, dataItem);
    //
    //         //$item.appendChild($wrap);
    //         $fragment.appendChild($item);
    //     }, this);
    //
    //     // fill
    //     $node.appendChild($fragment);
    // } else {
    //     console.error('wrong data type', data);
    // }
};


/**
 * Init or re-init of the component inner structures and HTML.
 *
 * @param {Object} config - init parameters (subset of constructor config params)
 */
/*List.prototype.init = function ( config ) {
    var $fragment = document.createDocumentFragment(),
        $node     = this.$node,
        data      = config.data,
        itemClass = this.name + '__item',
        self      = this;

    this.data = data;

    // clear container
    while ( $node.lastChild ) {
        $node.removeChild($node.lastChild);
    }

    // create items
    data.forEach(function ( value, index ) {
        var $item = document.createElement('div'),
            $wrap = document.createElement('div');

        $item.dataset.index = index;
        $item.className = itemClass;
        self.render($item, value);
        //self.render($wrap, value);

        //$item.appendChild($wrap);
        $fragment.appendChild($item);
    });

    $node.appendChild($fragment);


    // this.addListener('focus', function ( event ) {
    //
    // });

    // $node.addEventListener('click', function ( event ) {
    //     if ( self.$focusItem ) {
    //         self.$focusItem.className = self.CLASS_ITEM;
    //     }
    //
    //     event.target.className = self.CLASS_ITEM_FOCUSED;
    //
    //     self.$focusItem = event.target;
    //
    //     // there are some listeners
    //     if ( self.events['click'] ) {
    //         // notify listeners
    //         self.emit('click', data[event.target.index], event);
    //     }
    //
    //     event.stopPropagation();
    // });
};*/


/*List.prototype.focusItem = function ( $target ) {
    var result    = false,
        itemClass = this.name + '__item--focused';

    // something has changed
    if ( $target !== this.$focusItem ) {
        // process the previous focused element
        if ( this.$focusItem ) {
            //this.$focusItem.className = this.CLASS_ITEM;
            this.$focusItem.classList.remove(itemClass);
        }

        // apply
        //$target.className = this.CLASS_ITEM_FOCUSED;
        $target.classList.add(itemClass);
        this.$focusItem = $target;

        // notify listeners
        this.events['focus:item'] && this.emit('focus:item', this.data[$target.dataset.index]);

        // ok
        result = true;
    }

    // status
    return result;
};*/


// public
module.exports = List;
