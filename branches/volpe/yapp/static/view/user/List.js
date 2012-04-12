Ext.define('AM.view.user.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.userlist',
	
	title : 'All Users',
	store : 'Users',
	
	initComponent : function() {
		
		this.columns = [ {
			header : 'Name',
			dataIndex : '_nombre',
			flex : 1
		}, {
			header : 'Email',
			dataIndex : '_email',
			flex : 1
		}, {
			header : 'Estado',
			dataIndex : '_estado',
			felx : 1
		}, {
			header : 'Es Final',
			dataIndex : 'esFinal',
			flex : 0
		} ];
		
		this.callParent(arguments);
	}
});