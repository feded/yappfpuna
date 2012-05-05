Ext.define('YAPP.view.suscripcion.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.suscripcionlist',
	store : 'Suscripciones',
	
	layout : 'fit',
	
	initComponent : function() {
		this.dockedItems = [ {
			xtype : 'toolbar',
			items : [ {
				iconCls : 'icon-add',
				xtype : 'button',
				text : 'Nueva Suscripcion',
				scope : this,
				action : 'crear'
			}, '|', {
				iconCls : 'icon-delete',
				xtype : 'button',
				text : 'Eliminar Suscripcion',
				itemId : 'delete',
				action : 'borrar',
				disabled : true,
				scope : this
			} ]
		} ];
		
		this.columns = [ {
			header : 'ID',
			dataIndex : 'id'
		}, {
			header : 'Nombre',
			dataIndex : '_nombre'
		}, {
			header : 'Entidad Padre',
			flex : 1,
			sortable : true,
			dataIndex : '_entidad_padre',
			renderer : this.renderizarEntidad
		}, {
			header : 'Rol',
			flex : 1,
			sortable : true,
			dataIndex : '_rol_final',
			renderer : this.renderizarRol
		} ];
		
		this.callParent(arguments);
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	},
	renderizarEntidad : function(val) {
		if (val == null)
			return "vacio"
		return val._nombre
	},
	renderizarRol : function(val) {
		if (val == null)
			return "vacio"
		return val._nombre
	}
});