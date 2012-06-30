Ext.define('YAPP.view.fase.NuevaFase', {
    extend: 'Ext.window.Window',
    alias : 'widget.nuevafase',

    title : 'Nueva Fase',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
    	
        this.items = [
            {
                xtype: 'form',
                items: [
                    		{
                        		xtype: 'textfield',
                        		name : '_nombre',
                        		fieldLabel: 'Nombre'
                    		},
                    		{
                    			xtype: 'numberfield',
                    			name: '_orden',
                				fieldLabel: 'Orden',
                				value: 5,
                				minValue: 1
                    		},
                    		{
                    			xtype: 'textareafield',
                    			name: '_comentario',
            					fieldLabel: 'Comentario'
                    		},
                    		{
								xtype : 'colorcbo',
								name : '_color',
								fieldLabel: 'Color'
							}
                    		
//                    		{
//                    			xtype: 'colorpicker',
////                    			name: '_color',
//                    			fieldLabel: 'Color'
//                    		}
                    		
//					{
//                    	xtype: 'gridpanel',
//                    	store: 'AtributoFase',
//                    	dockedItems : [ {
//                                			xtype : 'toolbar',
//                                				items : [ {
//                                	        		xtype: 'button',
//                                    	    		text : 'Nuevo Atributo',
//                                        			scope : this,
//                                        			action : 'crearAtributo'
//                                					}, '|', {
//                                        			xtype: 'button',
//                                        			text : 'Eliminar Atributo',
//                                        			action : 'borrarAtributo',
//                                        			scope : this
//                                				} ]
//                                		}],
//                    	columns : [
//							{header:'Atributo', dataIndex:'_nombre'}
//						]
//                    }
					
                ]
            }
        ];
        this.buttons = [
            {
                text: 'Guardar',
                action: 'guardar'
            },
            {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },
});
