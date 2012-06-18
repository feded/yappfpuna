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
                                			}, 
                                			'|', 
                                			{
	                                        	xtype: 'button',
	                                        	text : 'Eliminar Unidad de trabajo',
	                                        	itemId : 'delete',
	                                        	action : 'borrar',
	                                        	disabled : true,
	                                        	scope : this
                                			},
                                			'|',
                                			{
	                                        	xtype: 'button',
	                                        	text : 'Asignar recursos',
	                                        	itemId : 'asignarRecursos',
	                                        	action : 'asignarRecursos',
	                                        	disabled : true,
	                                        	scope : this
                                			}
                                			
                                		]
                                }];
      
      
		this.columns = [
			{header:'Nombre', dataIndex:'_nombre'},
			{header:'Etiqueta', dataIndex:'_etiqueta'},
			{header:'Descripcion', dataIndex:'_descripcion'},
			{header:'Color', dataIndex:'_color'},
			//{header:'Costo', renderer: renderizador_listar_unidad_trabajo}
        ];   

        this.callParent(arguments);
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this); //a eliminar esta parte
    },
    //la funcion de abajo se va a pasar a view
    onSelectChange : function(selModel, selections) {
                this.down('#delete').setDisabled(selections.length === 0);
                this.down('#asignarRecursos').setDisabled(selections.length === 0)
    }
});

function renderizador_listar_unidad_trabajo(value, metaData, record) {
	
	var store = Ext.create('YAPP.store.Recursos');
	
	store.load({
			params : {
					operacion : 'NODISPONIBLES',
					id_unidad: record.data.id  
			},
			callback: function(records){
				var costo = 0;
				for ( var i in records) {
					costo = costo + records[i].data._costo_hora + records[i].data._costo_cantidad;
					console.log(records[i].data._costo_hora);
					console.log(records[i].data._costo_cantidad);
				}
				console.log("el costo es " + costo);
				//retorna antes
				return costo;
			}
		});
}