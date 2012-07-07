Ext.define('YAPP.view.suscripcion.View', {
	extend : 'Ext.form.Panel',
	alias : 'widget.suscripcionview',
	title : 'Roles',
	// layout : 'fit',
	autoShow : true,
	// frame:true,
	// stores : [ 'RolEstados' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'suscripcionlist',
		}, {
			xtype : 'notificaciones'
		} ];
		
		this.callParent(arguments);
	}

});
