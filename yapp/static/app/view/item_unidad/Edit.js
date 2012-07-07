Ext.define('YAPP.view.item_unidad.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.asignarUnidad',
	store : 'ItemUnidad',
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
						name : '_unidad_id',
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
            			value : 1,
            			minValue : 1,
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


