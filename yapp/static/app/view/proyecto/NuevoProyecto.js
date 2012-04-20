Ext.define('YAPP.view.proyecto.NuevoProyecto', {
    extend: 'Ext.window.Window',
    alias : 'widget.nuevoproyecto',

    title : 'Nuevo proyecto',
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
                    },
                    {
                        xtype: 'textfield',
                        name : '_prioridad',
                        fieldLabel: 'Prioridad'
                    },
                    {
                        xtype: 'textfield',
                        name : '_lider',
                        fieldLabel: 'Líder de proyecto'
                    },
                    {
                        xtype: 'textfield',
                        name : '_nota',
                        fieldLabel: 'Nota'
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