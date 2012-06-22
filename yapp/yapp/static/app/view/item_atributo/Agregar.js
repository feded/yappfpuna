Ext.define('YAPP.view.item_atributo.Agregar', {
    extend: 'Ext.window.Window',
    alias : 'widget.agregaratributo',
    title : 'Editar Atributo del Item',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
    	
        this.items = [
            {
                xtype: 'form',
                items: [
					{	
						xtype : 'combobox',
						fieldLabel : 'Nombre Atributo',
						name : '_atributo_id',
						store : Ext.create('YAPP.store.AtributoTipoItem'),
						displayField : '_valor',
						valueField: 'id',
						typeAhead : true,
						queryMode : 'local',
						emptyText : 'Seleccione un Atributo...',
						allowBlank : false,
						listeners: {
							select: function(combo, record, index) {
								var tipo = record[0]._tipo;
								var win = combo.up('window');
								if (tipo == "Cadena de Texto" ){
									
									win.down('#valort').setVisible(true);
									win.down('#valorn').setVisible(false);
									win.down('#valorc').setVisible(false);
								}if (tipo == "Numerico"){
									
									win.down('#valort').setVisible(false);
									win.down('#valorn').setVisible(true);
									win.down('#valorc').setVisible(false);
								}
								if (tipo == "Booleano"){
									
									win.down('#valort').setVisible(false);
									win.down('#valorn').setVisible(false);
									win.down('#valorc').setVisible(true);
								}
    								
							}
						}
					},
					{
						xtype : 'textfield',
						name : '_valor',
						itemId : 'valort',
						fieldLabel : 'Valor',
						typeAhead : true,
					},{
						xtype : 'numberfield',
						hidden: true,
						name : '_valor',
						itemId : 'valorn',
						fieldLabel : 'Valor',
						typeAhead : true,
					},{
						xtype : 'checkbox',
						hidden: true,
						name : '_valor',
						itemId : 'valorc',
						fieldLabel : 'Valor',
						typeAhead : true,
					},
					
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





