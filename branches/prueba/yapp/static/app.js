Ext.application({
    name: 'YAPP',
    
    appFolder: 'static/app',
    
    autoCreateViewport: true,
    
    controllers: [
        'Menus',
        'AdministrarProyectos',
        'Privilegios',
        'Roles'
        
    ],
    
    launch: function() {
        // This is fired as soon as the page is ready
    }
});