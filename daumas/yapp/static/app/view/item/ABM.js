Ext.define('YAPP.view.item.ABM', {
	extend : 'Ext.form.Panel',
	alias : 'widget.itemsabm',
	title : 'Items',
	requires : [ 'YAPP.view.item_unidad.List', 'YAPP.view.item.List' ],
	// layout : 'fit',
	autoShow : true,
	// frame:true,
	// stores : [ 'RolEstados' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'itemslist',
		}, {
			xtype : 'itemunidadlist'
		} ];
		
		this.callParent(arguments);
	}

});
