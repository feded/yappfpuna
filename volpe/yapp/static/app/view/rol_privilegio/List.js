Ext.define('YAPP.view.rol_privilegio.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.rolprivilegiolist',
	
	store : 'RolPrivilegios',
	layout : 'fit',
	
	initComponent : function() {
		
		Ext.apply(this, {
			iconCls : 'icon-grid',
			frame : true,
			height : 200,
			dockedItems : [ {
				xtype : 'toolbar',
				items : [ {
					text : 'Agregar privilegio',
					scope : this,
					action : 'crear'
				}, '|', {
					text : 'Eliminar privilegio',
					itemId : 'delete',
					action : 'borrar',
					disabled : true,
					scope : this,
				} ]
			} ],
			columns : [ {
				text : 'Privilegio',
				flex : 1,
				sortable : true,
				dataIndex : '_privilegio',
				renderer : renderizar_rol_privilegio
			}, {
				header : 'Entidad',
				flex : 1,
				sortable : true,
				dataIndex : '_entidad_padre',
				renderer : renderizar_rol_entidad_padre,
				field : {
					type : 'textfield'
				}
			} ]
		});
		this.callParent(arguments);
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
	},

});

function renderizar_rol_privilegio(val) {
	if (val == null)
		return val;
	if (val._nombre == null)
		return val
	return val._nombre
}
function renderizar_rol_entidad_padre(val) {
	if (val == null)
		return val;
	if (val._nombre == null)
		return val
	return val._nombre
}
