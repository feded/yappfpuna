Ext.Loader.setConfig({
	enabled : true
});

Ext.Loader.setPath('Ext.ux', 'static/extjs/examples/ux/');
Ext.require([ 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.toolbar.Paging', 'Ext.ux.PreviewPlugin', 'Ext.ModelManager', 'Ext.tip.QuickTipManager' ]);

Ext.onReady(function() {
	Ext.tip.QuickTipManager.init();
	
	Ext.define('ForumThread', {
		extend : 'Ext.data.Model',
		fields : [ '_id'],
		idProperty : '_id'
	});
	
	// create the Data Store
	var store = Ext.create('Ext.data.Store', {
		model : 'ForumThread',
		remoteSort : true,
		proxy : {
			// load using script tags for cross domain, if the data in on the
			// same domain as
			// this page, an HttpProxy would be better
			type : 'jsonp',
			url : 'getRoles',
			reader : {
				root : 'roles',
				totalProperty : 'total'
			},
			// sends single sort as multi parameter
			simpleSortMode : true
		}
	// sorters: [{
	// property: 'lastpost',
	// direction: 'DESC'
	// }]
	});
	
	// create the Grid
	var grid = Ext.create('Ext.grid.Panel', {
		store : store,
		stateful : true,
		stateId : 'stateGrid',
		columns : [ {
			text : '_id',
			flex : 1,
			dataIndex : '_id'
		}
//		, {
//			text : 'nombre',
//			width : 75,
//			sortable : true,
//			dataIndex : 'nombre'
//		}, {
//			text : 'estado',
//			width : 75,
//			sortable : true,
//			dataIndex : 'estado'
//		}
		],
		height : 350,
		width : 600,
		title : 'Roles',
		renderTo : 'roles_div',
		viewConfig : {
			stripeRows : true
		}
	});
	
	// trigger the data store load
	store.loadPage(1);
});
