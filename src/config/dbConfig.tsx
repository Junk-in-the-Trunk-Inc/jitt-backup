import * as fs from 'graceful-fs';

const config = {
    topBar: [
        { type: 'menuitem', kind: 'navigate', to: 'dashboard' },
        { type: 'dropdown', to: 'apis', children: [
            { type: 'menuitem', kind: 'open-in-new-window', to: 'upcitemdb' },
            { type: 'menuitem', kind: 'open-in-new-window', to: 'walmart' },
            { type: 'menuitem', kind: 'open-in-new-window', to: 'amazon' },
            { type: 'menuitem', kind: 'open-in-new-window', to: 'google-search' },
            { type: 'menuitem', kind: 'open-in-new-window', to: 'barcode-lookup' }
        ] },
        { type: 'dropdown', to: 'data', children: [
            { type: 'dropdown', to: 'auctions', children: [
                { type: 'menuitem', to: 'self-storage' },
                { type: 'menuitem', to: 'facility' },
                { type: 'menuitem', to: 'rental-unit' }
            ]},
            { type: 'dropdown', to: 'products', children: [

            ]},
            { type: 'dropdown', to: 'expenses', children: [

            ]}
        ] },
        { type: 'menu', to: 'files', children: [

        ] },
        { type: 'menu', to: 'reports', children: [

        ] },
        { type: 'menu', to: 'queues', children: [

        ] },
        { type: 'menu', to: 'review', children: [

        ] }  
    ]
}