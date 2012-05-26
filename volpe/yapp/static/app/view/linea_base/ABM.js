Ext.define('YAPP.view.linea_base.ABM', {
	extend : 'Ext.form.Panel',
	alias : 'widget.lineasbaseabm',
	title : 'Lineas Base',
	requires : [ 'YAPP.view.linea_base.List', 'YAPP.view.item.List' ],
	// layout : 'fit',
	autoShow : true,
	// frame:true,
	// stores : [ 'RolEstados' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'lineasbaselist',
		}, {
			xtype : 'itemslist'
		} ];
		
		this.callParent(arguments);
	}

});
