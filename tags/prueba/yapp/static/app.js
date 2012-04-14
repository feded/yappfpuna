Ext.application({
    name: 'YAPP',
    
    appFolder: 'static/app',
    
    autoCreateViewport: true,
    
    controllers: [
        'Menus',
        'AdministrarProyectos'
    ],
    
    launch: function() {
        // This is fired as soon as the page is ready
    }
});