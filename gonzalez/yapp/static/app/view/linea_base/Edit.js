Ext.require([ 'Ext.grid.*', 'Ext.data.*', 'Ext.dd.*', 'Ext.example.*', 'YAPP.model.Item', 'YAPP.store.Item' ]);

Ext.define('YAPP.view.linea_base.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.lineabaseedit',
	
	title : 'Linea base',
	layout : 'fit',
	autoShow : true,
	// stores : [ 'EntidadesPadres' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			type : 'hbox',
			items : [ {
				xtype : 'textfield',
				name : '_nombre',
				fieldLabel : 'Nombre',
				allowBlank : false
			}, {
				xtype : 'textfield',
				name : '_descripcion',
				fieldLabel : 'Descripcion',
				allowBlank : false
			} ],
		}, {
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
			items : [ {
				xtype : 'gridpanel',
				name : 'firstGrid',
				height : 100,
				store : Ext.create('YAPP.store.Item'),
				multiSelect : true,
				viewConfig : {
					plugins : {
						ptype : 'gridviewdragdrop',
						dragGroup : 'firstGridDDGroup',
						dropGroup : 'secondGridDDGroup'
					},
					listeners : {
						drop : function(node, data, dropRec, dropPosition) {
						}
					}
				},
				columns : columnas,
				// stripeRows : true,
				title : 'Items de la fase',
				margins : '0 2 0 0'
			}, secondGrid ]
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

var secondGrid = {
	xtype : 'gridpanel',
	name : 'secondGrid',
	height : 100,
	viewConfig : {
		plugins : {
			ptype : 'gridviewdragdrop',
			dragGroup : 'secondGridDDGroup',
			dropGroup : 'firstGridDDGroup'
		},
		listeners : {
			drop : function(node, data, dropRec, dropPosition) {
			}
		}
	},
	columns : columnas,
	// stripeRows : true,
	title : 'Items de la linea base',
	margins : '0 0 0 3'
};
