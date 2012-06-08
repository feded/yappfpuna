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
					fieldLabel : 'Permiso',
					name : '_permiso',
					store : Ext.create('YAPP.store.Permisos'),
					displayField : '_nombre',
					valueField : 'id',
					typeAhead : true,
					emptyText : 'Seleccione un privilegio...'
				}, {
					text : 'Agregar Permiso',
					scope : this,
					action : 'crear'
				}, '|', {
					text : 'Eliminar Permiso',
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
				renderer : this.renderizar_permiso
			} ]
		});
		this.callParent(arguments);
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	},
	renderizar_permiso : function(valor) {
		// console.log(valor)
		if (valor._nombre != null) {
			return valor._nombre;
		}
		return valor;
	}

});
