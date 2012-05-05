Ext.define('YAPP.controller.Menus', {
	extend : 'Ext.app.Controller',
	
	views : [ 'proyecto.ListarProyecto', 'fase.ListarFase', 'privilegio.List', 'esquema.List', 'rol.ABM',
			'rol.List', 'tipoItem.List', 'suscripcion.List', 'item.List', 'recurso.ListarRecurso' ],

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
			'viewport button[action=adminTipoItems]' : {
				click : this.adminTipoItems
			},
			'viewport button[action=adminFases]' : {
				click : this.adminFases
			},
			'viewport button[action=adminSuscripciones]' : {
				click : this.adminSuscripciones
			},
			'viewport button[action=adminItems]' : {
				click : this.adminItems
			},
			'viewport button[action=adminEsquemas]' : {
				click : this.adminEsquemas
			},
			'viewport button[action=adminRecursos]' :{
				click : this.adminRecursos
			}
		});
	},
	
	adminProyectos : function(button) {
		
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar proyectos',
			xtype : 'listarproyecto',
			closable : true
		});

		tabs.setActiveTab(tab);

	},
	adminFases : function(button) {

		var tabs = Ext.getCmp('tabPrincipal');

		var tab = tabs.add({
			title : 'Administrar fases',
			xtype : 'listarfase',
			closable : true
		});
		
		tabs.setActiveTab(tab);
		
	},
	
	adminRoles : function(button) {
		
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar roles',
			xtype : 'rolabm',
			closable : true
		});
		
		tabs.setActiveTab(tab);
		
	},
	
	adminPrivilegios : function(button) {
		
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar privilegios',
			xtype : 'privilegiolist',
			closable : true
		});
		
		tabs.setActiveTab(tab);
		
	},
	
	adminTipoItems : function(button) {
		
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar tipo de items',
			xtype : 'tipolist',
			closable : true
		});
		
		tabs.setActiveTab(tab);
		
	},
	adminSuscripciones : function(button) {
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar suscripcion',
			xtype : 'suscripcionview',
			closable : true
		});
		
		tabs.setActiveTab(tab);
		
	},
	
	adminItems : function(button) {
		var tabs = Ext.getCmp('tabPrincipal');
		var store = this.getStore('Item');
		store.load();
//		{
//			params:{
//				id: tipoId
//				}
//		}
		var tab = tabs.add({
			title : 'Administrar Items',
			xtype : 'itemslist',
			closable : true
		});
		
		tabs.setActiveTab(tab);
		
	},
	adminRecursos : function(button) {
        
        var tabs = Ext.getCmp('tabPrincipal');
        
        var tab = tabs.add({
                title : 'Administrar recursos',
                xtype : 'listarrecurso',
                closable : true
        });

        tabs.setActiveTab(tab);

	},
	adminEsquemas : function(button){
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar Esquemas',
			xtype : 'esquemaslist',
			closable : true
		});
		
		tabs.setActiveTab(tab);
	}
});