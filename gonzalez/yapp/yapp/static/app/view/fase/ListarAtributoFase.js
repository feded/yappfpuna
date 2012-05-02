Ext.define('YAPP.view.fase.ListarAtributoFase' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.listaratributofase',
    store: 'AtributoFase',
    
    layout: 'fit',

    initComponent: function() {
		  this.dockedItems = [ {
                                xtype : 'toolbar',
                                items : [ 
                        					{
                                	        	xtype: 'button',
                                    	    	text : 'Nuevo Atributo',
                                        		scope : this,
                                        		action : 'crear'
                                			}, '|',
                                			 {
                                        		xtype: 'button',
                                        		text : 'Eliminar Atributo',
                                        		itemId : 'delete',
                                        		action : 'borrar',
                                        		disabled : true,
                                        		scope : this
                                			}
                                		]
                                }];
      
      
		this.columns = [
			{header:'Atibuto', dataIndex:'_nombre'}
        ];   

        this.callParent(arguments);
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this); //a eliminar esta parte
    },
    //la funcion de abajo se va a pasar a view
    onSelectChange : function(selModel, selections) {
                this.down('#delete').setDisabled(selections.length === 0);
                this.down('#atributo').setDisabled(selections.length === 0);
    }
});