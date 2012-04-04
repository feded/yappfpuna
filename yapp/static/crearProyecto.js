Ext.require([
    'Ext.form.*',
    'Ext.layout.container.Column',
    'Ext.tab.Panel'
]);

Ext.onReady(function(){


    var formulario = Ext.create('Ext.form.Panel', {
        frame:true,
        title: 'Crear proyecto',
        bodyStyle:'padding:10px',
        width: 1000,
        fieldDefaults: {
            msgTarget: 'side', //para que muestre el error al costado
            labelWidth: 75
        },
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },

        items: [{
            fieldLabel: 'Nombre del proyecto',
            name: 'nombre',
            allowBlank:false
        },{
            fieldLabel: 'Autor del proyecto',
            name: 'autor',
            allowBlank:false
        }],

        buttons: [{
            text: 'Guardar',
            handler: function(){
                this.up('form').getForm().submit({
                	url: 'crearProyecto',
                    submitEmptyText: false,
                });
            }
            
        },{
            text: 'Cancelar',
            href: 'main'
        }]
    });

    formulario.render(document.body);
});
