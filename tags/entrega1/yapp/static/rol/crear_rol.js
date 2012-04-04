Ext.require([
    'Ext.form.*',
    'Ext.layout.container.Column',
    'Ext.tab.Panel'
]);

Ext.onReady(function(){

	 var fsf = Ext.create('Ext.form.Panel', {
// url:'save-form.php',
	        frame:true,
	        title: 'Nuevo Rol',
	        bodyStyle:'padding:5px 5px 0',
	        width: 350,
	        fieldDefaults: {
	            msgTarget: 'side',
	            labelWidth: 75
	        },
	        defaults: {
	            anchor: '100%'
	        },

	        items: [{
	            xtype:'fieldset',
	            title: 'Informacion de rol',
	            defaultType: 'textfield',
	            layout: 'anchor',
	            defaults: {
	                anchor: '100%'
	            },
	            items :[{
	                fieldLabel: 'Nombre de rol',
	                name: 'nombre',
	                allowBlank:false
	            },{
	                fieldLabel: 'Estado',
	                name: 'estado'
	            }]
	        },{
	        	checkboxToggle:true,
	        	collapsed: true,
	            xtype:'fieldset',
	            title: 'Rol final',
	            collapsible: true,
	            defaultType: 'textfield',
	            layout: 'anchor',
	            name: 'panel_final',
	            defaults: {
	                anchor: '100%'
	                	
	            },
	            items :[{
	                fieldLabel: 'Email',
	                name: 'email'
	            },{
	                fieldLabel: 'Contraseña',
	                name: 'password',
	                inputType: 'password'
	            }]
	        }],

	        buttons: [{
	            text: 'Guardar',
	            handler: function(){
	                this.up('form').getForm().submit({
	                	url: 'crearRol',
	                    submitEmptyText: false,
	                });
	            }
	            
	        },{
	            text: 'Cancelar',
	            href: 'main'
	        }]
	    });
	 fsf.render(document.body);
});