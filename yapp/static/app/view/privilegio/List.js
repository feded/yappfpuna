Ext.define('YAPP.view.privilegio.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.privilegiolist',
	
	title : 'Privilegios',
	store : 'Privilegios',
	
	requires : [ 'Ext.grid.plugin.CellEditing', 'Ext.form.field.Text', 'Ext.toolbar.TextItem' ],
	
	initComponent : function() {
		
		this.editing = Ext.create('Ext.grid.plugin.CellEditing');
		
		Ext.apply(this, {
			iconCls : 'icon-grid',
			frame : true,
			plugins : [ this.editing ],
			dockedItems : [ {
				xtype : 'toolbar',
				items : [ {
					iconCls : 'icon-add',
					text : 'Nuevo Privilegio',
					scope : this,
					action : 'crear'
				}, '|', {
					iconCls : 'icon-delete',
					text : 'Eliminar Privilegio',
					itemId : 'delete',
					action : 'borrar',
					disabled : true,
					scope : this,
				} ]
			}, {
				weight : 1,
				xtype : 'toolbar',
				dock : 'bottom',
				ui : 'footer',
				items : [ '->', {
					iconCls : 'icon-save',
					text : 'Sync',
					scope : this,
					handler : this.onSync
				} ]
			} ],
			columns : [ {
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
				renderer : renderizador,
				field : {
					type : 'textfield'
				}
			} ]
		});
		this.callParent();
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	},

});

function renderizador(val) {
	if (val != null)
		return val._nombre
	return "Vacio"
}
