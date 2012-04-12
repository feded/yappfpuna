Ext.define('YAPP.controller.Menus', {
   extend: 'Ext.app.Controller',
   
   views: [
        'menus.CrearProyecto',
   ],
    

   init: function() {
        this.control({
            'viewport button[action=adminProyectos]': {
                click: this.adminProyectos
            },
            'viewport button[action=adminRoles]': {
                click: this.adminRoles
            }
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
            title: 'Administrar Roles'
                      
        });

        tabs.setActiveTab(tab);
        
    }
    
   
});