Ext.define('YAPP.view.privilegio.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.privilegiolist',
	
	title : 'Privilegios',
	store : 'RolPrivilegios',
	layout : 'fit',
	
	initComponent : function() {
		this.frame = true;
		this.dockedItems = [ {
			xtype : 'toolbar',
			items : [ {
				text : 'Nuevo Privilegio',
				scope : this,
				action : 'crear',
				disabled : true
			}, '|', {
				text : 'Eliminar Privilegio',
				itemId : 'delete',
				action : 'borrar',
				disabled : true,
				scope : this,
			} ]
		} ];
		this.columns = [ {
			header : 'Privilegio sobre',
			flex : 1,
			sortable : true,
			dataIndex : '_privilegio',
			renderer : this.renderPrivilegio
		}, {
			header : 'Entidad',
			flex : 1,
			sortable : true,
			dataIndex : '_entidad',
			renderer : this.renderEntidad,
		}, {
			header : 'Permitir',
			sortable : true,
			dataIndex : '_permitir'
		} ];
		this.callParent(arguments);
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	},
	renderPrivilegio : function(object) {
		return object._nombre
	},
	renderEntidad : function(object) {
		return object._nombre
	}
});
