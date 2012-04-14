Ext.application({
	//name : 'YAPP',
	name: 'AM',
	appFolder : '',
	
	controllers : [  'RolController' ],
	//controllers : [  ],
	
	launch : function() {
		Ext.create('Ext.container.Viewport', {
			layout : 'fit',
			items :[
//	        {
//				xtype : 'tipoItemList'
//			},
			{
				xtype : 'rollist'
			}]
		});
	}

});
