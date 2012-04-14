Ext.define('YAPP.controller.Menus', {
   extend: 'Ext.app.Controller',
   
   views: [
        'proyecto.CrearProyecto', 'privilegio.List', 'rol.List'
   ],
    

   init: function() {
   		console.log('Cargado controller Menus');
        this.control({
            'viewport button[action=adminProyectos]': {
                click: this.adminProyectos
            },
            'viewport button[action=adminRoles]': {
                click: this.adminRoles
            },
            'viewport button[action=adminPrivilegios]': {
                click: this.adminPrivilegios
            },
        });
    },

    adminProyectos: function(button) {
        
        var tabs = Ext.getCmp('tabPrincipal');
        
        var tab = tabs.add({
            title: 'Administrar proyectos',
            xtype: 'crearproyecto'
        });

        tabs.setActiveTab(tab);
        
    },
    
    adminRoles: function(button) {
        
        var tabs = Ext.getCmp('tabPrincipal');
        
        var tab = tabs.add({
        	title: 'Administrar roles',
            xtype: 'rollist'    
        });

        tabs.setActiveTab(tab);
        
    },
    
    adminPrivilegios: function(button) {
        
        var tabs = Ext.getCmp('tabPrincipal');
        
        var tab = tabs.add({
            title: 'Administrar privilegios',
            xtype: 'privilegiolist'
        });

        tabs.setActiveTab(tab);
        
    },
});