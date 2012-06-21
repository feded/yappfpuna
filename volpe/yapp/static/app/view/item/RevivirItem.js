Ext.define('YAPP.view.item.RevivirItem', {
	extend : 'Ext.window.Window',
	alias : 'widget.revivirItems',
	title : 'Items',
	// layout : 'fit',
	autoShow : true,
	// frame:true,
	initComponent : function() {
		this.items = [ {
					xtype : 'gridpanel',
					name : 'gridItem',
					height : 90,
					columns : listaColumnas,
					store : Ext.create('YAPP.store.Item'),
					// stripeRows : true,
					title : 'Detalle Items',
					margins : '0 2 0 0'
				}
		, {
			xtype : 'container',
			width : 650,
			height : 200,
			layout : {
				type : 'hbox',
				align : 'stretch',
				padding : 5
			},
			defaults : {
				flex : 1
			},
			items : [ {
					xtype : 'gridpanel',
					name : 'gridEliminados',
					height : 200,
					store : Ext.create('YAPP.store.Item'),
					columns : columnas,
					multiSelect : true,
					viewConfig : {
						plugins : {
							ptype : 'gridviewdragdrop',
							dragGroup : 'firstGridDDGroup',
							dropGroup : 'secondGridDDGroup'
						},
						listeners : {
							
						}
					},
					// stripeRows : true,
					title : 'Items Eliminados',
					margins : '0 2 0 0'
				},{
					xtype : 'gridpanel',
					store : Ext.create('YAPP.store.Item'),
					name : 'gridARevivir',
					height : 200,
					viewConfig : {
						plugins : {
							ptype : 'gridviewdragdrop',
							dragGroup : 'secondGridDDGroup',
							dropGroup : 'firstGridDDGroup'
						},
						listeners : {
							
						}
					},
					columns : columnas,
					// stripeRows : true,
					title : 'Items a Revivir',
					margins : '0 0 0 3'
				}]
				
		} ]
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
			text : 'Revivir',
			// disabled : true,
			formBind : true,
			action : 'revivirItems'
		}, {
			text : 'Cancel',
			scope : this,
			handler : this.close
		} ];
		
		this.callParent(arguments);
	}

});


var columnas = [ {
	text : "Nombre",
	flex : 1,
	sortable : true,
	width : 70,
	dataIndex : '_nombre',
	field : {
		type : 'textfield'
	}
}, {
	text : "Descripcion",
	flex : 1,
	
	sortable : true,
	dataIndex : '_descripcion'
} ];

var listaColumnas =   [ {
				header : 'Nombre',
				sortable : true,
				dataIndex : '_nombre',
				flex : 1
			}, {
				header : 'Duracion',
				sortable : true,
				dataIndex : '_duracion',
				flex : 1
			}, {
				header : 'Descripcion',
				sortable : true,
				dataIndex : '_descripcion',
				flex : 1
			}, {
				header : 'Condicionado',
				sortable : true,
				dataIndex : '_condicionado',
				flex : 1
			}, {
				header : 'Tipo de Item',
				sortable : true,
				dataIndex : '_tipo_item',
				flex : 1,
				renderer : renderizador_lista_item
			}, {
				header : 'Version',
				sortable : true,
				dataIndex : '_version',
				flex : 1
			}, {
				header : 'Estado',
				sortable : true,
				dataIndex : '_estado',
				flex : 1
			}, {
				 xtype: 'datecolumn' ,
				 header: 'Fecha de Inicio', 
				 sortable : true, 
				 dataIndex: '_fecha_inicio', 
				 format: 'd/m/Y', 
				 flex: 1
			}, {
				header : 'Padre',
				sortable : true,
				dataIndex : '_padre',
				flex : 1,
				renderer : renderizador_lista_item
			}, {
				header : 'Antecesor',
				sortable : true,
				dataIndex : '_antecesor',
				flex : 1,
				renderer : renderizador_lista_item
			}, {
			 	hidden : true,
				header : 'Item ID',
				sortable : true,
				dataIndex : '_item_id',
				flex : 1,
				renderer : renderizador_lista_item
			}			];


function renderizador_lista_item(val) {
	if (val != null && val._nombre != null) {
		return val._nombre;
	}else if (val != null && val.data != null && val.data._nombre != null){
		return val.data._nombre;
	}
	return val;
}