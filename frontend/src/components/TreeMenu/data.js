const treeMenuData = [
    {
        id: "1",
        label: 'Home',
        path: '/',
    },
    {
        id: "2",
        label: 'Categories',
        path: '/category',
        children: [
            {
                id: "2-1",
                label: 'Clothing',
                path: 'clothing',
            },
            {
                id: "2-2",
                label: 'Food',
                path: 'food',
            },
        ],
    },
    {
        id: "3",
        label: 'About Us',
        path: '/about',
        children: [
            {
                id: "3-1",
                label: 'Store',
                path: 'store',
            },
            {
                id: "3-2",
                label: 'Contact',
                path: 'contact',
            },
        ]
    }
];

export default treeMenuData;