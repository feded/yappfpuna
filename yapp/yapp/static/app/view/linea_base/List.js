Ext.define('YAPP.view.linea_base.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.lineasbaselist',
	
	store : 'LineasBase',
	layout : 'fit',
	
	initComponent : function() {
		
		Ext.apply(this, {
			iconCls : 'icon-grid',
			frame : true,
			height : 220,
			dockedItems : [ {
				xtype : 'toolbar',
				items : [ {
					text : 'Generar Linea Base',
					scope : this,
					action : 'crear'
				}, {
					text : 'Romper Linea Base',
					itemId : 'delete',
					action : 'borrar',
					disabled : true,
					scope : this,
				} ]
			} ],
			columns : [ {
				text : 'Nombre',
				flex : 1,
				sortable : true,
				dataIndex : '_nombre'
			}, {
				header : 'Fase',
				flex : 1,
				sortable : true,
				dataIndex : '_fase',
				renderer : renderizar_linea_base_fase
			} ]
		});
		this.callParent(arguments);
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	},

});

function renderizar_linea_base_fase(val) {
	if (val == null)
		return val;
	if (val._nombre == null)
		return val
	return val._nombre
}
