Ext.define('YAPP.view.rol.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.rollist',
	
	title : 'Todos los roles',
	store : 'Roles',
	
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
					text : 'Nuevo Rol',
					scope : this,
					action : 'crear'
				}, '|', {
					iconCls : 'icon-delete',
					text : 'Eliminar Rol',
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
				header : 'Estado',
				flex : 1,
				sortable : true,
				dataIndex : '_estado',
				renderer : renderizador,
				field : {
					type : 'textfield'
				}
			}, {
				header : 'Final',
				width : 40,
				flex : 0,
				sortable : true,
				dataIndex : '_esFinal'
			} ]
		});
		this.callParent();
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	},

});

function renderizador(value) {
	return value._tipo
}
