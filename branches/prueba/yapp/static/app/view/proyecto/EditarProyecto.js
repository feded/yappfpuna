Ext.define('YAPP.view.proyecto.EditarProyecto', {
    extend: 'Ext.window.Window',
    alias : 'widget.editarproyecto',

    title : 'Editar proyecto',
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
                        fieldLabel: 'Proyecto'
                    },
                    {
                        xtype: 'textfield',
                        name : '_autor',
                        fieldLabel: 'Autor'
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