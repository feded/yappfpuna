Ext.application({
	name : 'AM',
	
	appFolder : '',
	
	// controllers : [ 'Roles' ],
	controllers : [ 'Privilegios' ],
	
	launch : function() {
		Ext.create('Ext.container.Viewport', {
			layout : 'fit',
			items : {
				// xtype : 'rolabm'
				xtype : 'privilegiolist'
			}
		});
	}

});
