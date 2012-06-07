Ext.define('YAPP.controller.Menus', {
	extend : 'Ext.app.Controller',
	
	views : [ 'proyecto.ListarProyecto', 'fase.ListarFase', 'privilegio.List', 'esquema.List', 'rol.ABM', 
			'rol.List', 'tipoItem.List', 'suscripcion.List', 'item.ABM', 'recurso.ListarRecurso',
			'linea_base.ABM', 'calculo_impacto.View', 'gantt.View' ],
	
	stores : [ 'Proyectos', 'Permisos' ],
	
	refs : [ {
		selector : 'viewport combobox[name=proyectos]',
		ref : 'proyectos'
	},
	 {
            selector : 'viewport combobox[name=fases]',
            ref : 'fases'
    },
	{
		selector : 'viewport button[action=adminRoles]',
		ref : 'botonRoles'
	},
	{
		selector : 'viewport button[action=adminItems]',
		ref : 'botonItems'
	},

	// {
	// selector: 'viewport toolbar[dock=left]',
	// ref: 'bar'
	// }
	],
	
	init : function() {
		console.log('Cargado controller Menus');
		this.control({
			'viewport' : {
				render : this.traerPermiso
			},
			'viewport combobox[name=proyectos]' : {
				afterrender : this.onComboBoxRendered,
				select: this.activarFase
			},
			
			'viewport combobox[name=fases]' : {
				select: this.activarItem
			},
			
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
			'viewport button[action=adminRecursos]' : {
				click : this.adminRecursos
			},
			'viewport button[action=adminUnidadTrabajo]' : {
				click : this.adminUnidadTrabajo
			},
			'viewport button[action=logout]' : {
				click : this.logout
			},
			'viewport button[action=adminLineasBase]' : {
				click : this.adminLineasBase
			},
			'viewport button[action=verDiagramaGantt]' : {
				click : this.verDiagramaGantt
			},
			'viewport button[action=calculoImpacto]' : {
				click : this.calculoImpacto
			}
		});
	},
	
	traerPermiso : function() {
		var permisos = this.getPermisosStore();
		
		permisos.load({
			scope : this,
			callback : function(records, operation, success) {
				// //the operation object contains all of the details of the
				// load operation
				if (permisos.find('_nombre', 'Roles') == -1) {
					var boton = this.getBotonRoles();
					// var bar = this.getBar();
					boton.hide();
					// bar.show();
					// console.log(bar);
					
				}
			}
		});
		//    
		
	},
	
	activarFase: function(combo){
		var store = this.getStore('Fases');
        store.load({
                params : {
                        id : combo.getValue()
                },
                scope : this,
                callback : function(records, operation, success) {
                        fases = this.getStore('Fases');
                        this.getFases().store = fases;
                        this.getStore('Fases').sort('_orden', 'ASC');
                }
        });
		
	},
	
	activarItem: function(combo){
		this.getBotonItems().setDisabled(false);
		
	},
	
	onComboBoxRendered : function() {
		// this.onRendered();
		var proyectos = this.getProyectosStore();
		proyectos.load();
		this.getProyectos().store = proyectos;
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
		
		var combobox = this.getProyectos();
		
		var store = this.getStore('Fases');
		store.load({
			params : {
				id : combobox.getValue()
			}
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
		var tab = tabs.add({
			title : 'Administrar Items',
			xtype : 'itemsabm',
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
	adminUnidadTrabajo : function(button) {
		
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar unidad de trabajo',
			xtype : 'listarunidadtrabajo',
			closable : true
		});
		
		tabs.setActiveTab(tab);
		
	},
	adminEsquemas : function(button) {
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar Esquemas',
			xtype : 'esquemaslist',
			closable : true
		});
		
		tabs.setActiveTab(tab);
	},
	logout : function(button) {
		var form = new Ext.FormPanel({
			id : 'logout',
			name : 'logout',
			labelWidth : 80,
			url : '/logout',
		});
		form.submit({
			method : 'POST',
			success : function() {
				var redirect = '/';
				window.location = redirect;
			},
		});
	},
	adminLineasBase : function(button) {
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Lineas Base',
			xtype : 'lineasbaseabm',
			closable : true
		});
		
		tabs.setActiveTab(tab);
	},
	calculoImpacto : function(button) {
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Calculo de impacto',
			xtype : 'calculoimpactosview',
			closable : true
		});
		
		tabs.setActiveTab(tab);
	},
	verDiagramaGantt : function(button) {
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Gantt',
			xtype : 'ganttview',
			closable : true
		});
		
		tabs.setActiveTab(tab);
	}
});