Ext.define('YAPP.controller.Menus', {
	extend : 'Ext.app.Controller',
	
	views : [ 'proyecto.ListarProyecto', 'fase.ListarFase', 'privilegio.List', 'esquema.List', 'rol.ABM', 'rol.List', 'tipoItem.ABM', 'suscripcion.List', 'item.ABM', 'recurso.ListarRecurso',
			'linea_base.ABM', 'calculo_impacto.View', 'gantt.View', 'fase.ABM' ],
	
	stores : [ 'Proyectos', 'RolPermisos', 'Item' ],
	
	refs : [ {
		selector : 'viewport combobox[name=proyectos]',
		ref : 'proyectos'
	}, {
		selector : 'viewport combobox[name=fases]',
		ref : 'fases'
	}, {
		selector : 'viewport button[action=adminRoles]',
		ref : 'botonRoles'
	}, {
		selector : 'viewport button[action=adminItems]',
		ref : 'botonItems'
	}, {
		selector : 'viewport button[action=adminFases]',
		ref : 'botonFases'
	}, {
		selector : 'viewport button[action=adminTipoItems]',
		ref : 'botonTipoItems'
	}, {
		selector : 'viewport button[action=adminEsquemas]',
		ref : 'botonEsquemas'
	}, {
		selector : 'viewport button[action=adminLineasBase]',
		ref : 'botonLineasBase'
	}, {
		selector : 'viewport tabpanel[name=tabPrincipal]',
		ref : 'tabPrincipal'
	}, {
		selector : 'viewport button[action=verDiagramaGantt]',
		ref : 'botonGantt'
	} ],
	
	init : function() {
		console.log('Cargado controller Menus');
		this.control({
			'viewport' : {
				render : this.traerPermiso
			},
			'viewport combobox[name=proyectos]' : {
				afterrender : this.onComboBoxRendered,
				select : this.activarFase
			},
			
			'viewport combobox[name=fases]' : {
				select : this.activarItem
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
			},
			'viewport tabpanel[name=tabPrincipal]' : {
				remove : this.antesDeCerrar,
				tabchange : this.tabChange
			}
		});
	},
	
	tabChange : function(tabPanel, newCard, oldCard, eOpts) {
		newCard.fireEvent('tabSeleccionada', newCard);
	},
	
	traerPermiso : function() {
		var permisos = this.getRolPermisosStore();
		
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
		
		store.sort('id', 'ASC');
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
					disabled : isDisabled(sNombre)
				})
			}
			if (controller.setUser == undefined) {
				var abajo = Ext.getCmp('top')
				console.log(record)
				var cadena = 'Yet another project processor - '
				abajo.setTitle(cadena + "Bienvenido " + record.data._rol._nombre)
				controller.setUser = true
			}
		})

		panel.addDocked({
			xtype : 'button',
			text : 'Cerrar sesión',
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
	
	activarFase : function(combo) {
		this.getBotonFases().setDisabled(false);
		this.getBotonTipoItems().setDisabled(false);
		this.getBotonItems().setDisabled(true);
		this.getBotonEsquemas().setDisabled(true);
		this.getBotonLineasBase().setDisabled(true);
		this.getBotonGantt().setDisabled(false);
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
				var combo = this.getFases();
				if (Ext.typeOf(combo.getPicker().loadMask) !== "boolean") {
					combo.getPicker().loadMask.hide();
				}
				combo.reset();
			}
		});
		var store2 = this.getStore('TipoItems');
		var proyecto_id = this.getProyectos().getValue();
		store2.load({
			params : {
				id_proyecto : proyecto_id
			}
		});
		
	},
	
	activarItem : function(combo) {
		this.getBotonItems().setDisabled(false);
		this.getBotonEsquemas().setDisabled(false);
		this.getBotonLineasBase().setDisabled(false);
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
				emptyText : 'Seleccione un proyecto...',
				name : 'proyectos'
			});
			panel.add({
				xtype : 'combobox',
				fieldLabel : 'Fase',
				displayField : '_nombre',
				queryMode : 'local',
				valueField : 'id',
				disabled : true,
				emptyText : 'Seleccione una fase...',
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
		this.setTab('listarproyecto', 'Administrar proyectos')
	},
	adminFases : function(button) {
		this.setTab('faseabm', 'Administrar fases')
	},
	
	adminRoles : function(button) {
		this.setTab('rolabm', 'Administrar roles')
	},
	
	adminPrivilegios : function(button) {
		this.setTab('privilegiolist', 'Administrar privilegios')
	},
	
	adminTipoItems : function(button) {
		this.setTab('tipoitemsabm', 'Administrar tipo de items')
	},
	adminSuscripciones : function(button) {
		this.setTab('suscripcionview', 'Administrar suscripcion')
	},
	
	adminItems : function(button) {
		this.setTab('itemsabm', 'Administrar Items')
	},
	adminRecursos : function(button) {
		var store = this.getStore('Recursos');
		store.load({
			params : {
				operacion : 'TODOS'
			}
		});
		this.setTab('listarrecurso', 'Administrar recursos');
	},
	adminUnidadTrabajo : function(button) {
		var store = this.getStore('UnidadTrabajo');
		store.load();
		this.setTab('listarunidadtrabajo', 'Administrar unidad de trabajo');
	},
	adminEsquemas : function(button) {
		this.setTab('esquemaslist', 'Administrar Esquemas');
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
		this.setTab('lineasbaseabm', 'Lineas Base');
	},
	calculoImpacto : function(button) {
		this.setTab('calculoimpactosview', 'Calculo de impacto');
	},
	
	verDiagramaGantt : function(button) {
		this.setTab('ganttview', 'Gantt');
	},
	
	antesDeCerrar : function(container, panel, eOpts) {
		this.cerrarTab(panel.xtype)
	},
	
	tabs : new Array(),
	setTab : function(tipo, titulo) {
		var pestanhas = this.getTabPrincipal();
		if (this.tabs[tipo] == undefined) {
			this.tabs[tipo] = pestanhas.add({
				title : titulo,
				xtype : tipo,
				closable : true,
			})
		}
		pestanhas.setActiveTab(this.tabs[tipo])
		return this.tabs[tipo];
	},
	cerrarTab : function(tipo) {
		this.tabs[tipo] = undefined
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
	alias["Unidad de trabajo"] = "adminUnidadTrabajo";
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
	alias["Diagrama de gantt"] = "verDiagramaGantt";
	// "Ver costado derecho"
	
}

function isDisabled(nombre) {
	if (nombre == "Items" || nombre == "Fases" || nombre == "Tipo de items" || nombre == "Esquemas" || nombre == "Linea base" || nombre == "Diagrama de gantt") {
		return true;
	}
	
	return false;
}