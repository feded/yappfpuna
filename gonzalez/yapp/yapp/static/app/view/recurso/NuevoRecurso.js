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
                        		fieldLabel: 'Recurso'
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
								listeners: {
    								select: function(combo, record, index) {
      									var tipo = combo.getValue();
      									var win = combo.up('window');
      									if(tipo == 'Persona'){
            								win.down('#verCantidad').setVisible(false);
      									}
            							else{
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
                        		xtype: 'textfield',
                        		itemId : 'verCantidad',
                        		hidden: true,
                        		fieldLabel: 'Cantidad disponible'
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
