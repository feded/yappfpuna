Ext.define('YAPP.view.unidadTrabajo.NuevaUnidadTrabajo', {
    extend: 'Ext.window.Window',
    alias : 'widget.nuevaunidadtrabajo',

    title : 'Nueva Unidad de trabajo',
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
//    value: '993300',  // initial selected color
    listeners: {
        select: function(picker, selColor) {
//            alert(selColor);
			var texto = selColor;
            var win = picker.up('window');
            win.down('#color').setValue(texto);
        }
    }
});