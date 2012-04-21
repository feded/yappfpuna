Ext.define('YAPP.controller.Menus', {
	extend : 'Ext.app.Controller',
	
	views : [ 'proyecto.ListarProyecto', 'privilegio.List', 'rol.List', 'tipoItem.List', 'suscripciones.List' ],
	
	init : function() {
		console.log('Cargado controller Menus');
		this.control({
			'viewport button[action=adminProyectos]' : {
				click : this.adminProyectos
			},
			'viewport button[action=adminRoles]' : {
				click : this.adminRoles
			},
			'viewport button[action=adminPrivilegios]' : {
				click : this.adminPrivilegios
			},
			'viewport button[actarSuscripcionion=adminTipoItems]' : {
				click : this.adminTipoItems
			},
			'viewport button[action=adminSuscripciones]' : {
				click : this.adminSuscripciones
			}
		});
	},
	
	adminProyectos : function(button) {
		
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar proyectos',
			xtype : 'listarproyecto'
		});
		
		tabs.setActiveTab(tab);
		
	},
	
	adminRoles : function(button) {
		
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar roles',
			xtype : 'rollist'
		});
		
		tabs.setActiveTab(tab);
		
	},
	
	adminPrivilegios : function(button) {
		
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar privilegios',
			xtype : 'privilegiolist'
		});
		
		tabs.setActiveTab(tab);
		
	},
	
	adminTipoItems : function(button) {
		
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar tipo de items',
			xtype : 'tipolist'
		});
		
		tabs.setActiveTab(tab);
		
	},
	
	adminSuscripciones : function(button) {
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar suscripcion',
			xtype : 'suscripcioneslist'
		});
		
		tabs.setActiveTab(tab);
		
	},
});