Ext.define('YAPP.view.item_atributo.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.asignarAtributo',
	store : 'ItemAtributo',
    title : 'Editar Atributo del Item',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
    	
        this.items = [
            {
                xtype: 'form',
                items: [
					{
						xtype : 'textfield',
						name : '_valor',
						fieldLabel : 'Nuevo Valor',
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


