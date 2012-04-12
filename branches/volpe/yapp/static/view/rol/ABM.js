Ext.require([ 'Ext.container.*', 'Ext.tip.QuickTipManager', 'Ext.window.MessageBox' ]);
Ext.define('AM.view.rol.ABM', {
	extend : 'Ext.container.Container',
	alias : 'widget.rolabm',
	padding : '0 0 0 20',
	width : 500,
	height : 450,
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	items : [ {
		itemId : 'form',
		xtype : 'roledit'
	}, {
		itemId : 'grid',
		xtype : 'rollist',
		title : 'Lista de roles'
	} ]
});