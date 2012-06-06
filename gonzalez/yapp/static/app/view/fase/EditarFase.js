Ext.define('YAPP.view.fase.EditarFase', {
    extend: 'Ext.window.Window',
    alias : 'widget.editarfase',

    title : 'Editar Fase',
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
                    			xtype: 'numberfield',
                    			name: '_orden',
                				fieldLabel: 'Orden',
                				value: 5,
                				minValue: 1
                    		},
                    		{
                    			xtype: 'textareafield',
                    			name: '_comentario',
            					fieldLabel: 'Comentario'
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
