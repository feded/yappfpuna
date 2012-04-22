Ext.define('YAPP.view.tipoItem.AtributosList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.atributosList',
    width: 400,
    defaultType:'textfield',
    
    store : 'AtributoTipoItem',
	initComponent : function() {
		this.dockedItems = [ {
				xtype : 'toolbar',
				items : [ {
						iconCls : 'icon-add',
						text : 'Nuevo Atributo Tipo Item',
						scope : this,
						action : 'crearAtributo'
					}, '|', {
						iconCls : 'icon-delete',
						text : 'Eliminar Atributo Tipo de Item',
						disabled : true,
						itemId : 'delete',
						action : 'borrar',
						scope : this,
					} ]
				} ];
    
	    this.columns = [
	        {header: 'Tipo', sortable : true, dataIndex: '_tipo', flex: 1},
	        {header: 'Valor', sortable : true, dataIndex: '_valor', flex: 1},
	        {header: 'Descripcion', sortable : true, dataIndex: '_descripcion',  flex: 1},
	        {header: 'Opcional', sortable : true, dataIndex: '_opcional', flex: 1},
	        {header: 'Defecto', sortable : true, dataIndex: '_defecto', flex: 1},
		];
		this.callParent();
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
            this.down('#delete').setDisabled(selections.length === 0);
    }
	
});
	    


