Ext.define('YAPP.view.item_unidad.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.asignarUnidad',

    title : 'Asinar Unidad de Trabajo',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
    	
        this.items = [
            {
                xtype: 'form',
                items: [
            		{
                		xtype : 'combobox',
						fieldLabel : 'Unidad de Trbajo',
						name : '_unidad',
						store : Ext.create('YAPP.store.UnidadTrabajo'),
						displayField : '_nombre',
						valueField: 'id',
						typeAhead : true,
						queryMode : 'local',
						emptyText : 'Seleccione una Unidad...',
						allowBlank : false
            		},
            		{
            			xtype: 'numberfield',
            			name: '_cantidad',
    					fieldLabel: 'Cantidad'
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
    },
});


