Ext.define('YAPP.view.item.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.itemslist',
    layout: 'fit',
    store : 'Item',
	initComponent : function() {
		this.dockedItems = [ {
				xtype : 'toolbar',
				items : [ {
						iconCls : 'icon-add',
						text : 'Nuevo Item',
						scope : this,
						action : 'crear',
					}, '|', {
						iconCls : 'icon-delete',
						text : 'Eliminar Item',
						disabled : true,
						itemId : 'delete',
						action : 'borrar',
						scope : this,
					} ]
				} ];
    
	    this.columns = [
	        {header: 'Nombre', sortable : true, dataIndex: '_nombre', flex: 1},
	        {header: 'Duracion', sortable : true, dataIndex: '_duracion', flex: 1},
	        {header: 'Condicionado', sortable : true, dataIndex: '_condicionado',  flex: 1},
	        {header: 'Version', sortable : true, dataIndex: '_version', flex: 1},
	        {header: 'Estado', sortable : true, dataIndex: '_estado', flex: 1},
	        {header: 'Fecha de Inicio', sortable : true, dataIndex: '_fecha_inicio', flex: 1},
	        {header: 'Fecha de Fin', sortable : true, dataIndex: '_fecha_fin', flex: 1},
	        {header: 'Antecesor', sortable : true, dataIndex: '_antecesor_id', flex: 1},
	        {header: 'Padre', sortable : true, dataIndex: '_padre_id', flex: 1},


		];
		this.callParent();
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
            this.down('#delete').setDisabled(selections.length === 0);
    }
	
});
	    


