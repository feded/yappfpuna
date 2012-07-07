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
					},
					{
						xtype : 'textfield',
						name : '_valor',
						itemId : 'valort',
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





