Ext.define('YAPP.view.rol_permiso.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.rolpermisolist',
	
	store : 'RolPermisos',
	layout : 'fit',
	
	initComponent : function() {
		
		Ext.apply(this, {
			iconCls : 'icon-grid',
			frame : true,
			height : 200,
			dockedItems : [ {
				xtype : 'toolbar',
				items : [ {
					xtype : 'combobox',
					fieldLabel : 'Estado',
					name : '_permiso',
					displayField : '_nombre',
					store : Ext.create('YAPP.store.Permisos'),
					valueField : 'id',
					typeAhead : true,
					emptyText : 'Seleccione un permiso...'
				}, '|', {
					text : 'Agregar permiso',
					scope : this,
					action : 'crear'
				}, '|', {
					text : 'Eliminar permiso',
					itemId : 'delete',
					action : 'borrar',
					disabled : true,
					scope : this,
				} ]
			} ],
			columns : [ {
				text : 'Permiso',
				flex : 1,
				sortable : true,
				dataIndex : '_permiso',
				renderer : this.renderizar
			} ]
		});
		this.callParent(arguments);
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	},
	renderizar : function(val) {
		if (val._nombre != null){
			return val._nombre;
		}
		return val;
	}

});
