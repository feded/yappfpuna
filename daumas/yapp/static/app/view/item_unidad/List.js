Ext.define('YAPP.view.item_unidad.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.itemunidadlist',
	
	store : 'ItemUnidad',
	layout : 'fit',
	
	initComponent : function() {
		
		Ext.apply(this, {
			iconCls : 'icon-grid',
			frame : true,
			dockedItems : [ {
				xtype : 'toolbar',
				items : [ 
				{
					text : 'Asignar U. de Trabajo',
					scope : this,
					action : 'asignar',
					disabled : true,
					name : 'btnAsignar'
				}, {
					text : 'Desasignar U. de Trabajo',
					itemId : 'desasignar',
					action : 'desasignar',
					disabled : true,
					scope : this,
				} ]
			} ],
			columns : [ {
				text : 'Nombre Unidad',
				flex : 1,
				sortable : true,
				dataIndex : '_unidad',
				renderer : renderizar_nombre_unidad
			},{
				header : 'Cantidad Asignadada',
				flex : 1,
				sortable : true,
				dataIndex : '_cantidad',
				
			} ]
		});
		this.callParent(arguments);
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#desasignar').setDisabled(selections.length === 0);
	},

});



function renderizar_nombre_unidad(val) {
	if (val == null)
		return val;
	if (val._nombre == null)
		return val
	return val._nombre
}
