Ext.application({
    name: 'YAPP',
    
    appFolder: 'static/app',
    
    autoCreateViewport: true,
    
    controllers: [
        'Menus',
        'AdministrarProyectos',
        'AdministrarFases',
        'Privilegios',
        'Roles',
        'TipoItem',
        'Suscripciones'
        
    ],
    
    launch: function() {
        // This is fired as soon as the page is ready
    }
});