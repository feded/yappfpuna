Ext.define('YAPP.view.recurso.ListarRecurso' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.listarrecurso',
    store: 'Recursos',
    
    layout: 'fit',
    
//    features: [{ ftype: 'grouping' }],

    initComponent: function() {
		  this.dockedItems = [ {
                                xtype : 'toolbar',
                                items : [ 
                        					{
                                	        xtype: 'button',
                                    	    text : 'Nuevo Recurso',
                                        	scope : this,
                                        	action : 'crear'
                                			}, '|', {
                                        	xtype: 'button',
                                        	text : 'Eliminar Recurso',
                                        	itemId : 'delete',
                                        	action : 'borrar',
                                        	disabled : true,
                                        	scope : this
                                		} ]
                                }];
      
      
		this.columns = [
			{header:'Recurso', dataIndex:'_nombre'},
//			{header:'Tipo', dataIndex:'_tipo_id'}
//			{header:'Tipo', dataIndex:'_tipo',renderer : renderizador},
			{header:'Tipo', dataIndex:'tipo_nombre'},
			{header:'Descripcion', dataIndex:'_descripcion'},
			{header:'Costo', renderer: renderizador_listar_recursos},
			{header:'Costo/hora', dataIndex:'_costo_hora', hidden: true},
			{header:'Costo/cantidad', dataIndex:'_costo_cantidad', hidden: true},
			{header:'Cantidad', dataIndex:'_cantidad', 	hidden: true}
			
        ];   

        this.callParent(arguments);
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this); //a eliminar esta parte
    },
    //la funcion de abajo se va a pasar a view
    onSelectChange : function(selModel, selections) {
                this.down('#delete').setDisabled(selections.length === 0);
    }
});

function renderizador_listar_recursos (value, metaData, record) {
	var costo = record.data._costo_hora + record.data._costo_cantidad;
	return costo;
	
}