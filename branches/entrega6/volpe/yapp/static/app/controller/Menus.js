Ext.define('YAPP.controller.Menus', {
	extend : 'Ext.app.Controller',
	
	views : [ 'proyecto.ListarProyecto', 'fase.ListarFase', 'privilegio.List', 'esquema.List', 'rol.ABM', 
			'rol.List', 'tipoItem.List', 'suscripcion.List', 'item.ABM', 'recurso.ListarRecurso',
			'linea_base.ABM', 'calculo_impacto.View', 'gantt.View' ],
	
	stores : [ 'Proyectos', 'RolPermisos' ],
	
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
		var permisos = this.getRolPermisosStore();
		
		var west= Ext.getCmp('west')
		console.log(west)
		
		permisos.load({
			scope : this,
			callback : function(records, operation, success) {
				this.setearMenuIzquierda(records);
			}
		});
		//    
		
	},
	setearMenuIzquierda : function(records) {
		var panelDerecha = Ext.getCmp('east');
		panelDerecha.setVisible(false)
		// arreglar esto
		var panel = Ext.getCmp('west');
		var store = this.getRolPermisosStore();
		var controller = this;
		store.each(function f(record) {
			if (!controller.casosEspeciales(record)) {
				var sNombre = record.data._permiso._nombre;
				var sAccion = "";
				if (typeof getAliasFuncion(sNombre) == "undefined") {
					sAccion = "admin" + sNombre;
				} else {
					sAccion = getAliasFuncion(sNombre);
				}
				
				panel.addDocked({
					text : sNombre,
					textAlign : 'left',
					xtype : 'button',
					action : sAccion,
					disabled : isDisabled(sNombre),
					padding : '20 10 20 010'
				})
			}
		})

		panel.addDocked({
			xtype : 'button',
			text : 'SALIR',
			width : '100%',
			flex : 1,
			textAlign : 'left',
			action : 'logout'
		});
		
		panel.add({
			xtype : 'label',
			text : '',
		});
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
                        this.getFases().setDisabled(false);
                        this.getStore('Fases').sort('_orden', 'ASC');
                }
        });
		
	},
	
	activarItem: function(combo){
		this.getBotonItems().setDisabled(false);
	},
	casosEspeciales : function(permiso) {
		if (permiso.data._permiso._nombre == "Ver costado derecho") {
			var panel = Ext.getCmp('east');
			panel.add({
				xtype : 'label',
				text : ' '
			});
			panel.add({
				xtype : 'combobox',
				fieldLabel : 'Proyecto',
				displayField : '_nombre',
				queryMode : 'local',
				valueField : 'id',
				name : 'proyectos'
			});
			panel.add({
                xtype : 'combobox',
               	fieldLabel : 'Fase',
                displayField : '_nombre',
                queryMode : 'local',
                valueField : 'id',
                disabled:true,
                name : 'fases'
            })
			panel.setVisible(true);
			return true;
		}
		// falta permiso para abilitar
		return false;
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

function getAliasFuncion(permiso) {
	if (diccionarioPopulado == false) {
		diccionarioPopulado = true;
		popularHashMap();
	}
	return alias[permiso];
}

var alias = new Array();
var diccionarioPopulado = false;
function popularHashMap() {
	diccionarioPopulado = true;
	alias["Tipo de items"] = "adminTipoItems";
	// "Roles"
	// "Privilegios"
	// "Proyectos"
	// "Fases"
	// "Esquemas"
	// "Items"
	// alias["Suscripciones"] = "adminLineasBase";
	alias["Linea base"] = "adminLineasBase";
	
	// "Linea base"
	// "Recursos"
	alias["Calculo de impacto"] = "calculoImpacto";
	// "Ver costado derecho"
	
}

function isDisabled(nombre){
	if (nombre == "Items")
	{
		return true;
	}
	
	return false;
}