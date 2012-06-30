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
                        fieldLabel: 'Proyecto',
                        allowBlank: false
                    },
					{
						xtype : 'combobox',
						fieldLabel : 'Autor',
						name : '_autor',
						store : Ext.create('YAPP.store.RolesFinales'),
						valueField : 'id',
						displayField : '_nombre',
						typeAhead : true,
						queryMode : 'local',
						emptyText : 'Seleccione un autor...',
						allowBlank: false
					},
                    {
                        xtype: 'numberfield',
                        name : '_prioridad',
                        fieldLabel: 'Prioridad',
                        minValue: 1,
                        Value: 1,
                        maxValue: 10
                    },
                    {
						xtype : 'combobox',
						fieldLabel : 'Líder',
						name : '_lider',
						store : Ext.create('YAPP.store.RolesFinales'),
						valueField : 'id',
						displayField : '_nombre',
						typeAhead : true,
						queryMode : 'local',
						emptyText : 'Seleccione un lider...',
						allowBlank: false
					},
                    {
                        xtype: 'textfield',
                        name : '_nota',
                        fieldLabel: 'Nota',
                        allowBlank: false
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