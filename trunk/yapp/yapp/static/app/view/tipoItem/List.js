Ext.define('YAPP.view.tipoItem.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.tipolist',
    layout: 'fit',
	autoShow : true,
    store : 'TipoItems',
	initComponent : function() {
		this.dockedItems = [ {
				xtype : 'toolbar',
				items : [ {
					text : 'Nuevo Tipo de Item',
					itemId : 'nuevo_tipo_item',
					scope : this,
					action : 'crear',
				}, '|', {
					text : 'Eliminar Tipo de Item',
					disabled : true,
					itemId : 'delete',
					action : 'borrar',
					scope : this,
				},'|', {
					text : 'Importar',
					action : 'importar',
					scope : this,
					
				}]
			} ];
    
	    this.columns = [
	        {header: 'Nombre', sortable : true, dataIndex: '_nombre', flex : 1},
	        {header: 'Comentario', sortable : true, dataIndex: '_comentario', flex: 1},
	        {header: 'Color', sortable : true, dataIndex: '_color', flex: 1},
	        {header: 'Prefijo', sortable : true, dataIndex: '_prefijo', flex:1 },
	        {header: 'Condicionado', sortable : true, dataIndex: '_condicionado', flex:1},
//			{header: 'Atributos', xtype: 'actioncolumn', dataIndex: 'id',
//				 items: [
//	                {
//	                    icon   : '/static/atributo.png',     
//                    	tooltip: 'Agregar-Editar Atributos',   
//                    	cursor: 'pointer',           
//	                   
//	                   
//	                    handler: function(grid, rowIndex, colIndex) {
//	                        var rec = grid.getStore().getAt(rowIndex);
//	                    }
//	                }
//	            ]
////				renderer: function(value, meta, record) {
////				
////			    var id = Ext.id();
////			
////			    new Ext.Function.defer(function(){
////	    			new Ext.Button({renderTo: id, text: 'Ver',height: 20, action: 'verAtributos' ,   width: 90});
////	    			}, 25);
////			    	return '<span id="' + id + '"></span>';
////			
////			  }
//		   	}	 
		];
		this.callParent();
	}	
});
	    

