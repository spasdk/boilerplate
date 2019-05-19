/**
 * Loading page implementation.
 */

'use strict';

const
    tag       = require('spa-dom').tag,
    Component = require('../lib/component'),
    Button    = require('../lib/components/button'),
    List      = require('../lib/components/list'),
    TabSet    = require('../lib/components/tab-set');


var buttonSubmit = new Button({
        title: _('Submit'),
        modifiers: ['submit'],
        events: {
            click: function ( event ) {
                console.log('button component click', event);
                //event.stopPropagation();
                page.emit('submit');
            }
        }
    }),

    buttonCancel = new Button({
        title: _('Cancel'),
        modifiers: ['cancel']
    }),

    tabs = [
        {
            title: 'tab 1',
            tab: new Component({
                name: 'tab',
                modifiers: ['1'],
                content: [
                    buttonSubmit,
                    buttonCancel
                ]
            })
        },
        {
            title: 'tab 2',
            tab: new Component({
                name: 'tab',
                modifiers: ['2'],
                content: [tag('div', {}, 'tab 2')]
            })
        },
        {
            title: 'tab 3',
            tab: new Component({
                name: 'tab',
                modifiers: ['3'],
                content: [tag('div', {}, 'tab 3')]
            })
        },
        {
            title: 'tab 4',
            tab: new Component({
                name: 'tab',
                modifiers: ['4'],
                content: [tag('div', {}, 'tab 4')]
            })
        }
    ],

    tabSet = new TabSet({
        modifiers: ['notes'],
        content: tabs.map(function ( data ) {
            return data.tab;
        })
    }),

    list = new List({
        modifiers: ['tabs'],
        data: tabs,
        events: {
            click: function ( event ) {
                console.log('click', event);
            },
            focus: function ( event ) {
                console.log('focus', event);
            },
            blur: function ( event ) {
                console.log('blur', event);
            },
            show: function () {
                console.log('show');
            },
            hide: function () {
                console.log('hide');
            },
            data: function ( newData, oldData ) {
                console.log('data', newData, oldData);
            },
            'focus:item': function ( data, $item, index ) {
                console.log('focus:item', data, $item, index);
                tabSet.current = data.tab;
            },
            'blur:item': function ( data, $item, index ) {
                console.log('blur:item', data, $item, index);
            }
        },
        render: function ( $item, data ) {
            //$item.textContent = data.title;
            const button = new Button({
                title: data.title,
                events: {
                    click: event => {
                        console.log('button click');
                        event.stopPropagation();
                    }
                }
            });

            $item.appendChild(button.$node);
        }
    }),

    page = new Component({
        name: 'page',
        modifiers: ['init'],
        content: [
            list,
            tag('div', {className: 'wrapper'}, tabSet.$node)
        ]
    });


setTimeout(function (  ) {
    //list.focusable = false;
    //console.log(page.focus());
}, 1000);


if ( DEVELOP ) {
    window.pageInit = page;
}

// public
module.exports = page;
