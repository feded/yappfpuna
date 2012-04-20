Ext.define('YAPP.view.proyecto.CrearProyecto' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.crearproyecto',
    store: 'Proyectos',

    initComponent: function() {
		  this.dockedItems = [ {
                                xtype : 'toolbar',
                                items : [ {
                                	        iconCls : 'icon-add',
                                	        xtype: 'button',
                                    	    text : 'Nuevo Proyecto',
                                        	scope : this,
                                        	action : 'crear'
                                			}, '|', {
                                        	iconCls : 'icon-delete',
                                        	xtype: 'button',
                                        	text : 'Eliminar Proyecto',
                                        	itemId : 'delete',
                                        	action : 'borrar',
                                        	disabled : true,
                                        	scope : this
                                		} ]
                                }];
      
      
		this.columns = [
			{header:'Proyecto', dataIndex:'_nombre'},
			{header:'Autor', dataIndex:'_autor'},
        ];   

        this.callParent(arguments);
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this); //a eliminar esta parte
    },
    //la funcion de abajo se va a pasar a view
    onSelectChange : function(selModel, selections) {
                this.down('#delete').setDisabled(selections.length === 0);
    }
});