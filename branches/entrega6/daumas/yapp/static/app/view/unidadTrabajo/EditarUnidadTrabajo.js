Ext.define('YAPP.view.unidadTrabajo.EditarUnidadTrabajo', {
    extend: 'Ext.window.Window',
    alias : 'widget.editarunidadtrabajo',

    title : 'Editar Unidad de trabajo',
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
                        		fieldLabel: 'Nombre'
                    		},
                    		{
                    			xtype: 'textfield',
                        		name : '_etiqueta',
                        		fieldLabel: 'Etiqueta'
                    		},
                    		{
                    			xtype: 'textareafield',
                    			name: '_descripcion',
            					fieldLabel: 'Descripcion'
                    		},
                    		{
                    			xtype: 'fieldcontainer',
                    			fieldLabel: 'Color',
                    			items: [
                    					{
                        					xtype: 'textfield',
                        					name : '_color',
                        					itemId : 'color',
                    					},colorPicker
                    					]
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

var colorPicker = Ext.create('Ext.picker.Color', {
});