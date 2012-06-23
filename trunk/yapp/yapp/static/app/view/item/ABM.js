Ext.define('YAPP.view.item.ABM', {
	extend : 'Ext.form.Panel',
	alias : 'widget.itemsabm',
	title : 'Items',
	requires : [ 	'YAPP.view.item_unidad.List',
	 				'YAPP.view.item.List' ,
	 				'YAPP.view.item_atributo.List',
	 				'YAPP.view.item_atributo.ListarArchivo'
	 			],
	// layout : 'fit',
	autoShow : true,
	// frame:true,
	// stores : [ 'RolEstados' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'itemslist',
		}, {
			xtype : 'itemunidadlist'
		},
		{
			xtype : 'container',
//			width : 650,
			height : 300,
			layout : {
				type : 'hbox',
				align : 'stretch',
//				padding : 5
			},
			defaults : {
				flex : 1
			},
			items :[
			{
						xtype : 'atributositemlist',
					},
					{
						xtype : 'listararchivo'
					},
				]
		}
		];
		
		this.callParent(arguments);
	}

});
