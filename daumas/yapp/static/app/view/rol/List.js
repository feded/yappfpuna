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
			height : 200,
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
			columns : columnasDeRol
		});
		this.callParent(arguments);
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	},

});

