Ext.define('YAPP.view.rol.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.rollist',
	
	// title : 'Todos los roles',
	store : 'Roles',
	layout : 'fit',
	// requires : [ 'Ext.grid.plugin.CellEditing', 'Ext.form.field.Text',
	// 'Ext.toolbar.TextItem' ],
	
	initComponent : function() {
		
		// this.editing = Ext.create('Ext.grid.plugin.CellEditing');
		
		Ext.apply(this, {
			iconCls : 'icon-grid',
			frame : true,
//			plugins : [ this.editing ],
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
				renderer : renderizador_estado_rol,
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
		this.callParent(arguments);
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	},

});

function renderizador_estado_rol(val) {
	if (val == null)
		return val;
	if (val._estado == null)
		return val
	return val._estado
	// return ""
}
