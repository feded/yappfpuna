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
            		xtype : 'combobox',
					fieldLabel : 'Unidad de Trbajo',
					name : '_unidad_id',
					store : Ext.create('YAPP.store.UnidadTrabajo'),
					displayField : '_nombre',
					valueField: 'id',
					typeAhead : true,
					queryMode : 'local',
					emptyText : 'Seleccione una Unidad...',
					allowBlank : false,
					disabled : true,
					listeners: {
						select: function(combo, record, index) {
							var panel = combo.up('panel');
							panel.down('#asignar').setDisabled(false);
						}
					}
        		}, 
				{
					text : 'Asignar U. de Trabajo',
					scope : this,
					action : 'guardar',
					itemId : 'asignar',
					disabled : true,
					name : 'btnAsignar',
					scope : this,
				}, {
					text : 'Desasignar U. de Trabajo',
					itemId : 'desasignar',
					action : 'desasignar',
					disabled : true,
					scope : this,
				} ]
			} ],
			columns : [ {
				text : 'Asignadas',
				flex : 1,
				sortable : true,
				dataIndex : '_unidad',
				renderer : renderizar_nombre_unidad
			}]
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
