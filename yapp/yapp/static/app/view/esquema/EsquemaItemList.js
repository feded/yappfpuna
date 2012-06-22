Ext.define('YAPP.view.esquema.EsquemaItemList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.esquemaItemList',
    store : 'Item',
	initComponent : function() {
		this.dockedItems = [ {
				xtype : 'toolbar',
				items : [ {
						iconCls : 'icon-add',
						text : 'Agregar Item',
						scope : this,
						action : 'nuevoItem'
					}, '|', {
						iconCls : 'icon-delete',
						text : 'Remover Item',
						disabled : true,
						itemId : 'delete',
						action : 'borrarItem',
						scope : this,
					} ]
				} ];
    
	    this.columns = [
	        {header: 'Item', sortable : true, dataIndex: '_nombre', flex: 1},
		];
		this.callParent();
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
            this.down('#delete').setDisabled(selections.length === 0);
    }
	
});
	    


