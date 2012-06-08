Ext.define('YAPP.view.rol.ABM', {
	extend : 'Ext.form.Panel',
	alias : 'widget.rolabm',
	requires : [ 'YAPP.view.rol.List', 'YAPP.view.rol_privilegio.List', 'YAPP.view.privilegio.List' ],
	title : 'Roles',
	// layout : 'fit',
	autoShow : true,
	// frame:true,
	// stores : [ 'RolEstados' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'rollist',
		}, {
			xtype : 'rolprivilegiolist'
		}, {
			xtype : 'rolpermisolist'
		} ];
		
		this.callParent(arguments);
	}

});
