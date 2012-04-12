Ext.application({
	name : 'AM',
	
	appFolder : '',
	
	controllers : [ 'RolController' ],
	// controllers : [ 'Users' ],
	
	launch : function() {
		Ext.create('Ext.container.Viewport', {
			layout : 'fit',
			items : {
				xtype : 'rolabm'
			// xtype : 'userlist'
			}
		});
	}

});
