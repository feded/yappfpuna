Ext.define('YAPP.view.unidadTrabajo.ListarUnidadTrabajo' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.listarunidadtrabajo',
    store: 'UnidadTrabajo',
    
    layout: 'fit',

    initComponent: function() {
		  this.dockedItems = [ {
                                xtype : 'toolbar',
                                items : [ 
                        					{
                                	        xtype: 'button',
                                    	    text : 'Nueva Unidad de trabajo',
                                        	scope : this,
                                        	action : 'crear'
                                			}, '|', {
                                        	xtype: 'button',
                                        	text : 'Eliminar Unidad de trabajo',
                                        	itemId : 'delete',
                                        	action : 'borrar',
                                        	disabled : true,
                                        	scope : this
                                		} ]
                                }];
      
      
		this.columns = [
			{header:'Nombre', dataIndex:'_nombre'},
			{header:'Etiqueta', dataIndex:'_etiqueta'},
			{header:'Descripcion', dataIndex:'_descripcion'},
			{header:'Color', dataIndex:'_color'},
        ];   

        this.callParent(arguments);
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this); //a eliminar esta parte
    },
    //la funcion de abajo se va a pasar a view
    onSelectChange : function(selModel, selections) {
                this.down('#delete').setDisabled(selections.length === 0);
    }
});