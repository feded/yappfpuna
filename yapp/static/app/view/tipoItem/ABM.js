Ext.define('YAPP.view.tipoItem.ABM', {
	extend : 'Ext.form.Panel',
	alias : 'widget.tipoitemsabm',
	title : 'Tipo de Items',
	requires : [ 	'YAPP.view.tipoItem.List',
	 				'YAPP.view.tipoItem.AtributosList',
	 			],
	autoShow : true,
//	layout : 'fit',

	
	initComponent : function() {
		this.items = [ {
			xtype : 'tipolist',
		}, {
			xtype : 'atributosList'
		},
		];
		
		this.callParent(arguments);
	}

});
