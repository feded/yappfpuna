Ext.define('YAPP.view.privilegio.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.privilegiolist',
	
	title : 'Privilegios',
	store : 'Privilegios',
	layout : 'fit',
	
	initComponent : function() {
		this.dockedItems = [ {
			xtype : 'toolbar',
			items : [ {
				text : 'Nuevo Privilegio',
				scope : this,
				action : 'crear'
			}, '|', {
				text : 'Eliminar Privilegio',
				itemId : 'delete',
				action : 'borrar',
				disabled : true,
				scope : this,
			} ]
		} ];
		this.columns = [ {
			text : 'ID',
			width : 40,
			sortable : true,
			dataIndex : 'id'
		}, {
			text : 'Nombre',
			flex : 1,
			sortable : true,
			dataIndex : '_nombre'
		}, {
			header : 'Entidad',
			flex : 1,
			sortable : true,
			dataIndex : '_entidad',
			renderer : renderizarEntidad,
			field : {
				type : 'textfield'
			}
		}, {
			header : 'Asignado a',
			flex : 1,
			sortable : true,
			dataIndex : '_entidad_padre',
			renderer : renderizarEntidadPadre
		} ];
		this.callParent(arguments);
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	}
});

function renderizarEntidad(val) {
	// console.log(val)
	if (val != null)
		return val._nombre
	return val;
}

function renderizarEntidadPadre(val) {
	if (val != null)
		return val._nombre
	return "A asignar";
}
