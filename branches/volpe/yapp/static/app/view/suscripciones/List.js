Ext.define('YAPP.view.suscripciones.ListarSuscripcion', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.listarsuscripcion',
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
			header : 'Proyecto',
			dataIndex : '_nombre'
		}, {
			header : 'Autor',
			dataIndex : '_autor'
		}, {
			header : 'Prioridad',
			dataIndex : '_prioridad'
		}, {
			header : 'Estado',
			dataIndex : '_estado'
		}, {
			header : 'Líder de proyecto',
			dataIndex : '_lider'
		}, {
			header : 'Nota',
			dataIndex : '_nota'
		}, {
			header : 'Fecha de creación',
			dataIndex : '_fecha_creacion'
		}, {
			header : 'Fecha de modificacion',
			dataIndex : '_fecha_modificacion'
		} ];
		
		this.callParent(arguments);
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	// la funcion de abajo se va a pasar a view
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	}
});