Ext.define('YAPP.view.fase.ListarFase' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.listarfase',
    store: 'Fases',
    
    layout: 'fit',
    
//    features: [{ ftype: 'grouping' }],

    initComponent: function() {
		  this.dockedItems = [ {
                                xtype : 'toolbar',
                                items : [ 
                                		 	{
                                				xtype: 'combobox',
                                				fieldLabel: 'Proyecto',
    											store: Ext.create('YAPP.store.Proyectos'),
    											displayField: '_nombre',
    											queryMode : 'local',
    											valueField: 'id',
                                		   },
//                                		   {
//                        	        		xtype: 'button',
//                        	        		text : 'Actualizar',
//                        	        		scope : this,
//                        	        		action : 'actualizar'
//                        					},
                        					 '|',
                        					{
                                	        	xtype: 'button',
                                    	    	text : 'Nuevo Fase',
                                        		scope : this,
                                        		action : 'crear'
                                			}, '|',
                                			 {
                                        		xtype: 'button',
                                        		text : 'Eliminar Fase',
                                        		itemId : 'delete',
                                        		action : 'borrar',
                                        		disabled : true,
                                        		scope : this
                                			},
                                			{
                                        		xtype: 'button',
                                        		text : 'Atributos',
                                        		itemId : 'atributo',
                                        		action : 'atributo',
                                        		disabled : true,
                                        		scope : this
                                			},
                                			{
                                        		xtype: 'button',
                                        		text : 'Tipos de items',
                                        		itemId : 'tipo',
                                        		action : 'tipo',
                                        		disabled : true,
                                        		scope : this
                                			}
                                		]
                                }];
      
      
		this.columns = [
			{header:'Fase', dataIndex:'_nombre'},
			{header:'Orden', dataIndex:'_orden'},
			{header:'Comentario', dataIndex:'_comentario'},
			{header:'Estado', dataIndex:'_estado'},
			{header:'Color', dataIndex:'_color'}
        ];   

        this.callParent(arguments);
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this); //a eliminar esta parte
    },
    //la funcion de abajo se va a pasar a view
    onSelectChange : function(selModel, selections) {
                this.down('#delete').setDisabled(selections.length === 0);
                this.down('#atributo').setDisabled(selections.length === 0);
                this.down('#tipo').setDisabled(selections.length === 0);
    }
});

//function renderProyectoFase(val) {
//	return val._nombre
////	return ""
//}