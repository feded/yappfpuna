var formulario = Ext.define('YAPP.view.esquema.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.esquemaedit',
	
	title : 'Editar Esquema',
	layout : 'fit',
	autoShow : true,
	store : 'Esquema',
	
	initComponent : function() {
		console.log("EDIT");
		this.items = [ {
			xtype : 'form',
			items : [ 
				{
		xtype : 'textfield',
		name : '_nombre',
		fieldLabel : 'Nombre',
		allowBlank : false
	},
	{
		xtype : 'textfield',
		name : '_descripcion',
		fieldLabel : 'Descripcion',
		allowBlank : false
	},
	{
		xtype : 'textfield',
		name : '_etiqueta',
		fieldLabel : 'Etiqueta',
		allowBlank : false
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
		} ];
		
		this.buttons = [  {
			text : 'Guardar',
			action : 'guardar'
		}, {
			text : 'Cancel',
			scope : this,
			handler : this.close
		} ];
		
		this.callParent(arguments);
	}

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