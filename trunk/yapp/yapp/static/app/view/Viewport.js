Ext.define('YAPP.view.Viewport', {
	extend : 'Ext.container.Viewport',
	
	layout : 'border',
	
	initComponent : function() {
		this.items = [ {
			region : 'north',
			style : 'text-align:center',
			title : 'Yet another project processor',
			id : 'top'
		}, {
			region : 'east',
			id : 'east',
			collapsible : true,
			width : '20%',
			flex : 1,
			style : 'text-align:center',
			visible : false,
			title : 'Proyectos y fases'
		}, {
			title : 'Menu',
			region : 'west',
			style : 'text-align:center',
			id : 'west',
			collapsible : true,
			width : '11%',
			flex : 1,
		}, {
			region : 'center',
			xtype : 'tabpanel',
			name : 'tabPrincipal',
			id : 'tabPrincipal',
			activeTab : 0,
			items : {
				title : 'Principal',
				html : 'Area de trabajo'
			}
		}, {
			title : 'Bienvenido',
			region : 'bottom',
			style : 'text-align:center',
			id : 'botton',
			width : '11%',
			flex : 1,
		}  ];
		
		this.callParent();
	}
});