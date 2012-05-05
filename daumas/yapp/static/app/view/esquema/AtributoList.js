Ext.define('YAPP.view.esquema.AtributosList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.atributosesquemalist',
    width: 400,
    defaultType:'textfield',
    
    store : 'AtributoEsquema',
	initComponent : function() {
		this.dockedItems = [ {
				xtype : 'toolbar',
				items : [ {
						iconCls : 'icon-add',
						text : 'Nuevo Atributo Esquema',
						scope : this,
						action : 'crearAtributo'
					}, '|', {
						iconCls : 'icon-delete',
						text : 'Eliminar Atributo Esquema',
						disabled : true,
						itemId : 'delete',
						action : 'borrar',
						scope : this,
					} ]
				} ];
    
	    this.columns = [
	        {header: 'Nombre', sortable : true, dataIndex: '_nombre', flex: 1},
	        {header: 'Tipo', sortable : true, dataIndex: '_tipo', flex: 1},
	        {header: 'Valor', sortable : true, dataIndex: '_valor', flex: 1},
	        {header: 'Descripcion', sortable : true, dataIndex: '_descripcion',  flex: 1}
		];
		this.callParent();
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
            this.down('#delete').setDisabled(selections.length === 0);
    }
	
});
	    


