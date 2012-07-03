Ext.define('YAPP.view.recurso.NuevoRecurso', {
    extend: 'Ext.window.Window',
    alias : 'widget.nuevorecurso',

    title : 'Nuevo recurso',
    layout: 'fit',
    autoShow: true,
//    stores : [ 'TipoRecurso' ],

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
//        					{
//        						xtype: 'radiogroup',
//            					fieldLabel: 'Tipo',
//		            			cls: 'x-check-group-alt',
//            					items: [
//                					{boxLabel: 'Persona', name: '_tipo_id', inputValue: 1, checked: true},
//                					{boxLabel: 'Bien', name: '_tipo_id', inputValue: 2},
//                					{boxLabel: 'Material', name: '_tipo_id', inputValue: 3}
//            					]
//        					},
                    		{
                        		xtype: 'textfield',
                        		name : '_nombre',
                        		fieldLabel: 'Recurso',
                        		allowBlank: false
                    		},
                    		{
								xtype : 'combobox',
								fieldLabel : 'Tipo',
								name : '_tipo',
								store : Ext.create('YAPP.store.TipoRecurso'),
//								valueField : 'TipoRecurso',
								displayField : '_tipo',
								typeAhead : true,
								queryMode : 'local',
								emptyText : 'Seleccione un tipo...',
								allowBlank: false,
								listeners: {
    								select: function(combo, record, index) {
      									var tipo = combo.getValue();
      									var win = combo.up('window');
      									if(tipo == 'Persona'){
            								win.down('#verCostoCantidad').setVisible(false);
            								win.down('#verCostoHora').setVisible(true);
            								win.down('#verCantidad').setVisible(false);
      									}
            							else{
            								win.down('#verCostoHora').setVisible(false);
            								win.down('#verCostoCantidad').setVisible(true);
            								win.down('#verCantidad').setVisible(true);
            							}
            								
    								}
  								}
							},
							{
                        		xtype: 'textfield',
                        		name : '_descripcion',
                        		fieldLabel: 'Descripcion'
                    		},
                    		{
                        		xtype: 'numberfield',
                        		name : '_costo_hora',
                        		itemId : 'verCostoHora',
                        		hidden: true,
                        		fieldLabel: 'Costo/hora',
                        		minValue: 0
                    		},
                    		{
                        		xtype: 'numberfield',
                        		name : '_costo_cantidad',
                        		itemId : 'verCostoCantidad',
                        		hidden: true,
                        		fieldLabel: 'Costo/cantidad',
                        		minValue: 0
                    		},
                    		{
                        		xtype: 'numberfield',
                        		name : '_cantidad',
                        		itemId : 'verCantidad',
                        		hidden: true,
                        		fieldLabel: 'Cantidad',
                        		minValue: 0
                    		}
							
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
    }
});
