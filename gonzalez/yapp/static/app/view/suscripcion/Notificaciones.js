Ext.define('YAPP.view.suscripcion.Notificaciones', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.notificaciones',
	store : 'Historiales',
	
	layout : 'fit',
	
	initComponent : function() {
//		this.dockedItems = [ {
//			xtype : 'toolbar',
//			items : [ {
//				xtype : 'button',
//				text : 'Marcar como leida',
//				itemId : 'delete',
//				action : 'borrar',
//				disabled : true,
//				scope : this
//			} ]
//		} ];
		
		this.columns = [ {
			header : 'Id Usuario',
			dataIndex : '_usuario',
			flex : 1
		}, {
			header : 'Tabla',
			dataIndex : '_entidad',
			flex : 1
		}, {
			header : 'Entidad modificada',
			dataIndex : '_id_modificado',
			flex : 1
		}, {
			header : 'Accion',
			dataIndex : '_accion',
			flex : 1
		}, {
			header : 'Fecha',
			dataIndex : '_fecha',
			flex : 1
		} ];
		
		this.callParent(arguments);
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	}
});