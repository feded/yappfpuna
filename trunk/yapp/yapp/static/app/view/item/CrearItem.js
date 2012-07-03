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
				padding : 5
			},
			defaults : {
				bodyStyle : 'padding:20px'
			},
			width : 650,
			height : 250,
			type : 'hbox',
			items : [ {
				xtype : 'textfield',
				name : '_nombre',
				fieldLabel : 'Nombre',
				allowBlank : false,

			}, {
				xtype : 'textfield',
				name : '_descripcion',
				fieldLabel : 'Descripcion',
				allowBlank : false,

			}, {
				xtype : 'numberfield',
				name : '_duracion',
				fieldLabel : 'Duracion en dias',
				typeAhead : true,
				allowBlank : false,
				minValue : 1,
				value : 1,

			}, {
				name : '_fecha_inicio',
				xtype : 'datefield',
				fieldLabel : 'Fecha de Inicio',
				format : 'd/m/Y',
				submitFormat : 'Y-m-d',

			}, {
				xtype : 'numberfield',
				name : '_completado',
				fieldLabel : 'Porcentaje Completado',
				minValue : 0,
				maxValue : 100,

			},{
				xtype : 'colorcbo',
				name : '_color',
				fieldLabel : 'Color',

			},{
				xtype : 'checkbox',
				name : '_condicionado',
				fieldLabel : 'Condicionado',
				typeAhead : true,
				allowBlank : false,

			}, {
				xtype : 'displayfield',
				name : '_tipo_item_prefijo',
				fieldLabel : 'Prefijo Tipo de Item ',
				allowBlank : false,

			}, {
				xtype : 'displayfield',
				name : 'antecesor_nombre',
				fieldLabel : 'Antecesor',

			}, {
				xtype : 'displayfield',
				name : 'padre_nombre',
				fieldLabel : 'Padre',

			}, ],
		}, {
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

			}, {
				xtype : 'gridpanel',
				name : 'gridLB',
				store : Ext.create('YAPP.store.LineasBase'),
				columns : columnas_crear_Item,
				// stripeRows : true,
				title : 'Lineas Base Disponibles',

			} ]
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
				title : 'Relación Antecesor',
				margins : '0 2 0 0',
				fbar : [ {
					text : 'Eliminar',
					name : 'eliminar_antecesor',
					action : 'eliminar_antecesor',
				} ]
			}, {
				xtype : 'gridpanel',
				name : 'gridPD',
				store : Ext.create('YAPP.store.Item'),
				height : 150,
				multiSelect : true,
				columns : columnas_crear_Item,
				// stripeRows : true,
				title : 'Relación Padre',
				margins : '0 0 0 3',
				fbar : [ {
					text : 'Eliminar',
					name : 'eliminar_padre',
					action : 'eliminar_padre',
				} ]
			} ]
		} ];
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

var colorPicker = Ext.define('Ext.ux.ColorPickerCombo', {
	extend : 'Ext.form.field.Trigger',
	alias : 'widget.colorcbo',
	triggerTip : 'Seleccione un color.',
	regex : /^[0-9a-fA-F]{6}$/,
	regexText : 'Seleccione un color valido',
	onTriggerClick : function() {
		var me = this;
		picker = Ext.create('Ext.picker.Color', {
			pickerField : this,
			ownerCt : this,
			renderTo : document.body,
			floating : true,
			hidden : true,
			focusOnShow : true,
			style : {
				backgroundColor : "#fff"
			},
			listeners : {
				scope : this,
				select : function(field, value, opts) {
					me.setValue(value);
					me.inputEl.setStyle({
						backgroundColor : value
					});
					picker.hide();
				},
				show : function(field, opts) {
					field.getEl().monitorMouseLeave(500, field.hide, field);
				}
			}
		});
		picker.alignTo(me.inputEl, 'tl-bl?');
		picker.show(me.inputEl);
	}
});
