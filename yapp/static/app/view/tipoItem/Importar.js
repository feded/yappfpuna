Ext.define('YAPP.view.tipoItem.Importar', {
	extend : 'Ext.window.Window',
	alias : 'widget.importar',
	
	title : 'Importar tipos de items',
	layout : 'fit',
	autoShow : true,
	
	store: 'Proyectos',
	
	initComponent : function() {
		this.items =[{
				xtype: 'combobox',
                fieldLabel: 'Proyecto',
				displayField: '_nombre',
				queryMode : 'local',
				valueField: 'id',
				name: 'proyectoImportar'
		},
		
		{
			xtype : 'container',
			width : 650,
			height : 300,
			layout : {
				type : 'hbox',
				align : 'stretch',
				padding : 5
				},
			defaults : {
				flex : 1
				},
			items :[ {
				xtype : 'gridpanel',
				name : 'firstGrid',
				height : 100,
				store : Ext.create('YAPP.store.TipoItems'),
				multiSelect : true,
				viewConfig : {
					plugins : {
						ptype : 'gridviewdragdrop',
						dragGroup : 'firstGridDDGroup',
						dropGroup : 'secondGridDDGroup'
						},
					},
				columns : columnasImportar,
				title : 'Tipos de items Disponibles',
				margins : '0 2 0 0'
				},
				{
					xtype : 'gridpanel',
					name : 'secondGrid',
					store : Ext.create('YAPP.store.TipoItems'),
					height : 100,
					viewConfig : {
						plugins : {
							ptype : 'gridviewdragdrop',
							dragGroup : 'secondGridDDGroup',
							dropGroup : 'firstGridDDGroup'
						},
					},
					columns : columnasImportar,
					// stripeRows : true,
					title : 'A importar',
					margins : '0 0 0 3'
				} 
			]
		}]
		this.layout = {
			type : 'vbox',
			align : 'stretch',
			padding : 5
		};
		this.defaults = {
			flex : 1
		};
		this.width = 650;
		this.height = 300;
		this.buttons = [ {
			text : 'Guardar',
			// disabled : true,
			formBind : true,
			action : 'guardar'
		}, {
			text : 'Cancel',
			scope : this,
			handler : this.close
		} ];
		
		this.callParent(arguments);
	}

});

var columnasImportar = [
	{
		text : "Nombre",
		flex : 1,
		sortable : true,
		width : 70,
		dataIndex : '_nombre',
		field : {
			type : 'textfield'
		}
	},
//	{
//		text: "Tipo",
//		flex : 1,
//		sortable : true,
//		width: 70,
//		renderer: renderizador_asignar_tipo,
//		field: {
//			type : 'textfield'
//		}
//	},
//	{
//		text: "Costo",
//		flex : 1,
//		sortable : true,
//		width: 70,
//		renderer: renderizador_asignar_costo,
//		field: {
//			type : 'textfield'
//		}
//	}
];

//function renderizador_asignar_costo(value, metaData, record) {
//	var costo = record.data._costo_hora + record.data._costo_cantidad;
//	return costo;
//}
//
//function renderizador_asignar_tipo(value, metaData, record) {
//	return record.data._tipo._tipo;
//}
