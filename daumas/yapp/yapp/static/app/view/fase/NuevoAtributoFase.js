Ext.define('YAPP.view.fase.NuevoAtributoFase', {
    extend: 'Ext.window.Window',
    alias : 'widget.nuevoatributofase',

    title : 'Nuevo Atributo',
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
                        fieldLabel: 'Atributo'
                    },
                     {
                        xtype: 'textareafield',
                        name : '_descripcion',
                        fieldLabel: 'Descripcion'
                    },
                     {
                        xtype: 'textfield',
                        name : '_valor',
                        fieldLabel: 'Valor'
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