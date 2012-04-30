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
			{header:'Recurso', dataIndex:'_nombre'}
//			{header:'ID proyecto', dataIndex:'_proyecto', renderer : renderProyectoFase}
        ];   

        this.callParent(arguments);
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this); //a eliminar esta parte
    },
    //la funcion de abajo se va a pasar a view
    onSelectChange : function(selModel, selections) {
                this.down('#delete').setDisabled(selections.length === 0);
    }
});

//function renderProyectoFase(val) {
//	return val._nombre
////	return ""
//}