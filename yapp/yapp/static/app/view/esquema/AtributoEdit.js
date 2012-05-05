var formulario = Ext.define('YAPP.view.esquema.AtributoEdit', {
	extend : 'Ext.window.Window',
	alias : 'widget.atributoesquemaedit',
	
	title : 'Editar Atributo Esquema',
	layout : 'fit',
	autoShow : true,
	stores : [ 'AtributoEsquema' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			items : [ {
					xtype : 'textfield',
					name : '_nombre',
					fieldLabel : 'Nombre',
					allowBlank : false
				},{
					xtype : 'textfield',
					name : '_tipo',
					fieldLabel : 'Tipo',
					allowBlank : false
				},{
					xtype : 'textfield',
					name : '_valor',
					fieldLabel : 'Valor',
				},{
					xtype : 'textfield',
					name : '_descripcion',
					fieldLabel : 'Descripcion',
					allowBlank : false
				}]
		}];
		
		this.buttons = [  {
			text : 'Guardar',
			action : 'guardarAtributo'
		}, {
			text : 'Cancel',
			scope : this,
			handler : this.close
		} ];
		
		this.callParent(arguments);
	}

});


