Ext.define('YAPP.view.Viewport', {
	extend : 'Ext.container.Viewport',
	
	layout : 'border',
	
	initComponent : function() {
		this.items = [ {
			region : 'north',
			title : 'Yet another project processor'
		}, {
			region : 'east',
			id : 'east',
			width : '20%',
			flex : 1,
			visible : false
			/*rbar : [ {
				xtype : 'combobox',
				fieldLabel : 'Proyecto',
				displayField : '_nombre',
				queryMode : 'local',
				valueField : 'id',
				name : 'proyectos'
			},
			{
                xtype : 'combobox',
               	fieldLabel : 'Fase',
                displayField : '_nombre',
                queryMode : 'local',
                valueField : 'id',
                name : 'fases'
            } ]*/
		}, {
			region : 'west',
			id : 'west',
			width : '11%',
			flex : 1
			/*lbar : [ {
				xtype : 'button',
				text : 'Administrar roles',
				textAlign : 'left',
				action : 'adminRoles'
			}, {
				text : 'Administrar privilegios',
				textAlign : 'left',
				xtype : 'button',
				action : 'adminPrivilegios'
			}, {
				xtype : 'button',
				text : 'Administrar proyectos',
				textAlign : 'left',
				action : 'adminProyectos'
			
			}, {
				xtype : 'button',
				text : 'Administrar fases',
				textAlign : 'left',
				action : 'adminFases'
			
			}, {
				xtype : 'button',
				text : 'Administrar esquemas',
				textAlign : 'left',
				action : 'adminEsquemas'
			
			}, {
				text : 'Administrar tipo de items',
				textAlign : 'left',
				xtype : 'button',
				action : 'adminTipoItems'
			
			}, {
				text : 'Administrar items',
				textAlign : 'left',
				xtype : 'button',
				action : 'adminItems',
				disabled: true
			
			}, {
				text : 'Administrar suscripciones',
				textAlign : 'left',
				action : 'adminSuscripciones'
			}, {
				text : 'Linea base',
				textAlign : 'left',
				action : 'adminLineasBase'
			
			}, {
				xtype : 'button',
				text : 'Recursos',
				textAlign : 'left',
				action : 'adminRecursos'
			
			}, {
				xtype : 'button',
				text : 'Unidad de trabajo',
				textAlign : 'left',
				action : 'adminUnidadTrabajo'
			
			}, {
				xtype : 'button',
				text : 'Diagrama de Gantt',
				textAlign : 'left',
				action : 'verDiagramaGantt'
			
			}, {
				xtype : 'button',
				text : 'Calculo de impacto',
				textAlign : 'left',
				action : 'calculoImpacto'
			}, {
				xtype : 'button',
				text : 'SALIR',
				textAlign : 'left',
				action : 'logout'
			} ]*/
		}, {
			region : 'center',
			xtype : 'tabpanel',
			name : 'tabPrincipal',
			id : 'tabPrincipal',
			activeTab : 0,
			items : {
				title : 'Principal',
				html : 'Area de trabajo'
			}
		} ];
		
		this.callParent();
	}
});