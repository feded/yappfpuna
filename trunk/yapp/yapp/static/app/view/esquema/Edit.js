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
		xtype : 'colorcbo',
		name : 'color',
		fieldLabel: 'Color',
	},
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
	},
	
});

var colorPicker = Ext.define('Ext.ux.ColorPickerCombo', {
		extend: 'Ext.form.field.Trigger',
		alias: 'widget.colorcbo',
		triggerTip: 'Seleccione un color.',
	 	onTriggerClick: function() {
		  var me = this; 
		  picker = Ext.create('Ext.picker.Color', {     
			pickerField: this,     
			ownerCt: this,    
			renderTo: document.body,     
			floating: true,    
			hidden: true,    
			focusOnShow: true,
			style: {
	            	backgroundColor: "#fff"
	        	} ,
			listeners: {
	            	scope:this,
	            	select: function(field, value, opts){
			me.setValue('#' + value);
			me.inputEl.setStyle({backgroundColor:value});
			picker.hide();
		},
		show: function(field,opts){
			field.getEl().monitorMouseLeave(500, field.hide, field);
			}
	        	}
	});
	       picker.alignTo(me.inputEl, 'tl-bl?');
	       picker.show(me.inputEl);
		}	
	});
