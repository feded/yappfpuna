var formulario = Ext.define('YAPP.view.item.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.itemedit',
	
	title : 'Editar Item',
	layout : 'fit',
	autoShow : true,
	store : 'Item',
	
// stores : [ 'Item', 'TipoItems', 'Fases' ],
	
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
		xtype : 'combobox',
		fieldLabel : 'Tipo de Item',
		name : '_tipo_item_id',
		store : Ext.create('YAPP.store.TipoItems'),
		displayField : '_prefijo',
		typeAhead : true,
		queryMode : 'local',
		emptyText : 'Seleccione un Tipo...',
		allowBlank : false
	},
	{
		xtype : 'combobox',
		fieldLabel : 'Fase',
		name : '_fase_id',
		store : Ext.create('YAPP.store.Fases'),
		displayField : '_nombre',
		valueField: 'id',
		typeAhead : true,
		queryMode : 'local',
		emptyText : 'Seleccione una Fase...',
		allowBlank : false,
		listeners: {
        	select: function(combo, record, index) {
            	var tipo = combo.getValue();
                var win = combo.up('window');
                var store = win.down('#comboPadre').getStore();
                console.log(combo.getValue());
                store.load({
                        params: {
                                id : combo.getValue()
                        }
                });  
       		}
    	}
	},
	{
		xtype : 'textfield',
		name : '_duracion',
		fieldLabel : 'Duracion en dias',
		allowBlank : false
	},
	{
		xtype : 'checkbox',
		name : '_condicionado',
		fieldLabel : 'Condicionado',
		allowBlank : false
	},
//	{ 
//		xtype: 'datepicker',
//        minDate: new Date(),
//        
//        handler: function(picker, date) {
//            // do something with the selected date
//        }
//	},
//	{
//		xtype : 'datepicker',
//		minDate: new Date(),
//		//name : '_fecha_fin',
//		fieldLabel : 'Fecha de Fin',
//		allowBlank : false
//	},
	{
		xtype : 'combobox',
		fieldLabel : 'Antecesor',
		name : '_antecesor_id',
		displayField : '_nombre',
		typeAhead : true,
		queryMode : 'local',
		emptyText : 'Seleccione un Item...'
	},
	{
		xtype : 'combobox',
		fieldLabel : 'Padre',
		name : '_padre_id',
		itemId : 'comboPadre',
		store : Ext.create('YAPP.store.Item'),
		displayField : '_nombre',
		typeAhead : true,
		queryMode : 'local',
		emptyText : 'Seleccione un Item...'
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