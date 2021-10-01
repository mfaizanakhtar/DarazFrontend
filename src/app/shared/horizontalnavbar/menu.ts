import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Dashboard',
        icon: 'ri-dashboard-line',
        link: '/'
    },
    {
        id: 2,
        label: 'Orders',
        icon: 'ri-pencil-ruler-2-line',
        isUiElement: true,
    },
    {
        id: 21,
        label: 'Dispatch/Returns',
        icon: 'ri-apps-2-line',
        subItems: [
            {
                id: 22,
                label: 'Dispatch',
                link: '/dispatch',
                parentId: 21
            },
            {
                id: 23,
                label: 'Returns',
                link: '/returns',
                parentId: 21
            }
        ]
    },
    {
        id: 37,
        label: 'Inventory',
        icon: 'ri-stack-line',
        subItems: [
            {
                id: 24,
                label: 'DSC Inventory Tracking',
                link: '/inventorytracking',
                parentId: 37
            },
            {
                id: 25,
                label: 'Grouped Stock Tracking',
                link: '/skuoverview',
                parentId: 37
            }
        ]
    },
    {
        id: 58,
        label: 'Finance',
        icon: 'ri-file-copy-2-line',
        subItems: [
            {
                id: 59,
                label: 'Transactions',
                link: '/transactions',
                parentId: 58
            },
            {
                id: 60,
                label: 'Statements',
                link: '/statement',
                parentId: 58
            }
        ]
    }
];

