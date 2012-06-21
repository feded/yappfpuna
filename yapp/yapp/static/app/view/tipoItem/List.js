Ext.define('YAPP.view.tipoItem.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.tipolist',
    layout: 'fit',
    store : 'TipoItems',
	initComponent : function() {
		this.dockedItems = [ {
				xtype : 'toolbar',
				items : [ {
					iconCls : 'icon-add',
					text : 'Nuevo Tipo de Item',
					scope : this,
					action : 'crear'
				}, '|', {
					iconCls : 'icon-delete',
					text : 'Eliminar Tipo de Item',
					disabled : true,
					itemId : 'delete',
					action : 'borrar',
					scope : this,
				}, {
					text : 'Importar',
					action : 'importar',
					scope : this,
				}]
			} ];
    
	    this.columns = [
	        {header: 'Nombre', sortable : true, dataIndex: '_nombre'},
	        {header: 'Comentario', sortable : true, dataIndex: '_comentario'},
	        {header: 'Color', sortable : true, dataIndex: '_color'},
	        {header: 'Prefijo', sortable : true, dataIndex: '_prefijo'},
	        {header: 'Condicionado', sortable : true, dataIndex: '_condicionado'},
			{header: 'Atributos', xtype: 'actioncolumn', dataIndex: 'id',
				 items: [
	                {
	                    icon   : '/static/atributo.png',     
                    	tooltip: 'Agregar-Editar Atributos',   
                    	cursor: 'pointer',           
	                   
	                   
	                    handler: function(grid, rowIndex, colIndex) {
	                        var rec = grid.getStore().getAt(rowIndex);
	                    }
	                }
	            ]
//				renderer: function(value, meta, record) {
//				
//			    var id = Ext.id();
//			
//			    new Ext.Function.defer(function(){
//	    			new Ext.Button({renderTo: id, text: 'Ver',height: 20, action: 'verAtributos' ,   width: 90});
//	    			}, 25);
//			    	return '<span id="' + id + '"></span>';
//			
//			  }
		   	}	 
		];
		this.callParent();
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
            this.down('#delete').setDisabled(selections.length === 0);
    }
	
});
	    

