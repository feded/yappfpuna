Ext.define('YAPP.view.calculo_impacto.View', {
	extend : 'Ext.form.Panel',
	alias : 'widget.calculoimpactosview',
	title : 'Calculo de impacto',
	// layout : 'fit',
	autoShow : true,
	// frame:true,
	stores : [ 'CalculoImpactos' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'container',
			width : 650,
			height : 300,
			layout : {
				type : 'vbox',
				align : 'stretch',
				padding : 5
			},
			defaults : {
				flex : 1
			},
			items : [ {
				xtype : 'gridpanel',
				name : 'bases',
				height : 100,
				columns : columnas_calculo_impacto,
				// stripeRows : true,
				title : 'Lineas bases afectadas',
				margins : '0 2 0 0',
				padding : 5
			}, {
				xtype : 'container',
				width : 650,
				height : 300,
				layout : {
					type : 'hbox',
					align : 'stretch',
					padding : 1
				},
				defaults : {
					flex : 1
				},
				items : [ {
					xtype : 'gridpanel',
					name : 'antecesores',
					height : 100,
					columns : columnas_calculo_impacto,
					store : Ext.create('YAPP.store.Item'),
					// stripeRows : true,
					title : 'Antecesores',
					margins : '0 2 0 0'
				}, {
					xtype : 'gridpanel',
					name : 'sucesores',
					height : 100,
					columns : columnas_calculo_impacto,
					store : Ext.create('YAPP.store.Item'),
					// stripeRows : true,
					title : 'Sucesores',
					margins : '0 0 0 3',
					dockedItems : [ {
						xtype : 'toolbar',
						dock : 'bottom',
						items : [ {
							xtype : 'label',
							name : 'label_sucesores',
							text : 'Costo sucesores: '
						}, {
							xtype : 'label',
							name : 'label_costo_sucesores',
							text : '0'
						} ]
					} ]
				} ]
			} ]
		} ];
		this.dockedItems = [ {
			xtype : 'toolbar',
			items : [ {
				xtype : 'combobox',
				name : 'cbFase',
				fieldLabel : 'Fase',
				displayField : '_nombre',
				queryMode : 'local',
				valueField : 'id',
			}, {
				xtype : 'combobox',
				name : 'cbItem',
				fieldLabel : 'Item',
				displayField : '_nombre',
				queryMode : 'local',
				valueField : 'id',
			} ]
		} ];
		
		this.callParent(arguments);
	}

});

var columnas_calculo_impacto = [ {
	text : "Nombre",
	flex : 1,
	sortable : true,
	width : 40,
	dataIndex : '_nombre'
}, {
	text : "Descripcion",
	flex : 1,
	width : 60,
	sortable : true,
	dataIndex : '_descripcion'
} ];