Ext.define('YAPP.view.item.CrearItem', {
	extend : 'Ext.window.Window',
	alias : 'widget.crearitem',
	layout : 'fit',
	store : 'Item',
	autoShow : true,
	title : 'Crear Item',
	
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			layout : {
				type : 'table',
				columns : 2,
				padding: 5
			},
			defaults: {
	       		 bodyStyle: 'padding:20px'
    		},
			width:650,
			height : 250,
			type : 'hbox',
			items : [ {
				xtype : 'textfield',
				name : '_nombre',
				padding: .5,
				fieldLabel : 'Nombre',
				allowBlank : false
			}, {
				xtype : 'textfield',
				name : '_descripcion',
				fieldLabel : 'Descripcion',
				allowBlank : false
			},
			{
				xtype : 'numberfield',
				name : '_duracion',
				fieldLabel : 'Duracion en dias',
				typeAhead : true,
				allowBlank : false
			},
			{
				name : '_fecha_inicio',
                xtype: 'datefield',
                fieldLabel: 'Fecha de Inicio',
                format : 'd/m/Y',        
                submitFormat:'Y-m-d' 
			},
			{
				xtype : 'checkbox',
				name : '_condicionado',
				fieldLabel : 'Condicionado',
				typeAhead : true,
				allowBlank : false
			}, 
			{
				xtype: 'fieldcontainer',
				fieldLabel: 'Color',
				colspan : 2,
				items: [
						{
							xtype: 'textfield',
							name : '_color',
							//itemId : 'color',
						}
						//,colorPicker
						]
			},
			{
				xtype : 'displayfield',
				name : '_tipo_item_prefijo',
				fieldLabel : 'Prefijo Tipo de Item ',
				allowBlank : false
			},
			{
				xtype : 'displayfield',
				name : 'antecesor_nombre',
				fieldLabel : 'Antecesor',
				
			},
			{
				xtype : 'displayfield',
				name : 'padre_nombre',
				fieldLabel : 'Padre',
				
			},
		],},
		{
			xtype : 'container',
			width : 650,
			height : 100,
			layout : {
				type : 'hbox',
				align : 'rigth',
				padding : 5
			},
			defaults : {
				flex : 1
			},
			items : [ {
					xtype : 'gridpanel',
					name : 'gridTipo',
					store : Ext.create('YAPP.store.TipoItems'),
					columns : columnas_crear_Item,
					// stripeRows : true,
					title : 'Tipos de Items Disponibles',
					margins : '0 2 0 0'
					
				},{
					xtype : 'gridpanel',
					name : 'gridLB',
					store : Ext.create('YAPP.store.LineasBase'),
					columns : columnas_crear_Item,
					// stripeRows : true,
					title : 'Lineas Base Disponibles',
					
				}]
		},
		
		
		{
			xtype : 'container',
			width : 650,
			height : 200,
			layout : {
				type : 'hbox',
				align : 'stretch',
				padding : 5
			},
			defaults : {
				flex : 1
			},
			items : [ {
					xtype : 'gridpanel',
					name : 'gridItemLB',
					height : 200,
					store : Ext.create('YAPP.store.Item'),
					columns : columnas_crear_Item,
					// stripeRows : true,
					title : 'Relacion Antecesor',
					margins : '0 2 0 0'
				},{
					xtype : 'gridpanel',
					name : 'gridPD',
					store : Ext.create('YAPP.store.Item'),
					height : 150,
					multiSelect : true,
					columns : columnas_crear_Item,
					// stripeRows : true,
					title : 'Relacion Padre',
					margins : '0 0 0 3'
				}]
		} ]
		this.layout = {
			type : 'vbox',
			align : 'stretch',
			padding : 5
		};
		this.defaults = {
			flex : 1
		};
		this.width = 650;
		this.height = 550;
		this.buttons = [ {
			text : 'Guardar',
			// disabled : true,
			formBind : true,
			action : 'guardar'
		}, {
			text : 'Cancel',
			scope : this,
			handler : this.close
		} ];
		
		this.callParent(arguments);
	}

});

var columnas_crear_Item = [ {
	text : "Nombre",
	flex : 1,
	sortable : true,
	width : 70,
	dataIndex : '_nombre',
	field : {
		type : 'textfield'
	}
}, {
	text : "Descripcion",
	flex : 1,
	
	sortable : true,
	dataIndex : '_descripcion'
} ];



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

