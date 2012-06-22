Ext.define('YAPP.view.esquema.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.esquemaslist',
    layout: 'fit',
    store : 'Esquemas',
	initComponent : function() {
		this.dockedItems = [ {
				xtype : 'toolbar',
				items : [ 
						{
							iconCls : 'icon-add',
							text : 'Nuevo Esquema',
							scope : this,
							action : 'crear',
						}, '|', {
							iconCls : 'icon-delete',
							text : 'Eliminar Esquema',
							disabled : true,
							itemId : 'delete',
							action : 'borrar',
							scope : this,
						},
						{
                    		xtype: 'button',
                    		text : 'Atributos',
                    		itemId : 'atributo',
                    		action : 'atributo',
                    		disabled : true,
                    		scope : this
            			},
            			{
                    		xtype: 'button',
                    		text : 'Items Del Esquema',
                    		itemId : 'itemEsquema',
                    		action : 'itemEsquema',
                    		disabled : true,
                    		scope : this
            			},
						]
				} ];
    
	    this.columns = [
	        {header: 'Nombre', sortable : true, dataIndex: '_nombre', flex: 1},
	        {header: 'Descripcion', sortable : true, dataIndex: '_descripcion', flex: 1},
	        {header: 'Etiqueta', sortable : true, dataIndex: '_etiqueta', flex: 1},
	        {header: 'Color', sortable : true, dataIndex: '_color',  flex: 1},
	        {header: 'Fase', sortable : true, dataIndex: '_fase_id', flex: 1},
	        

		];
		this.callParent();
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
            this.down('#delete').setDisabled(selections.length === 0);
            this.down('#atributo').setDisabled(selections.length === 0);
            this.down('#itemEsquema').setDisabled(selections.length === 0);
    }
	
});
	    


