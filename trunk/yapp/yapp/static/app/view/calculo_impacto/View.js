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
			width : 800,
			height : 500,
			
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
				height : 300,
				columns : columnas_calculo_impacto_fase,
				// stripeRows : true,
				title : 'Lineas bases afectadas',
				margins : '0 2 0 0',
				padding : 5
			}, {
				xtype : 'container',
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
					height : 300,
					columns : columna_calculo_impacto_item,
					store : Ext.create('YAPP.store.Item'),
					// stripeRows : true,
					title : 'Antecesores',
					margins : '0 2 0 0',
					dockedItems : [ {
						xtype : 'toolbar',
						style : 'text-align:rigth',
						dock : 'bottom',
						items : [ {
							xtype : 'label',
							name : 'label_antecesores',
							text : 'Costo antecesores: '
						}, {
							xtype : 'label',
							name : 'label_costo_antecesores',
							text : '0'
						} ]
					} ]
				}, {
					xtype : 'gridpanel',
					name : 'sucesores',
					height : 300,
					columns : columna_calculo_impacto_item,
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
				name : 'cbItem',
				fieldLabel : 'Item',
				displayField : '_nombre',
				queryMode : 'local',
				valueField : 'id',
			}, {
				text : 'Ver grafo',
				scope : this,
				action : 'grafo'
			} ]
		} ];
		
		this.callParent(arguments);
	}

});

var columnas_calculo_impacto_fase = [ {
	text : "Nombre",
	flex : 1,
	sortable : true,
	width : 20,
	dataIndex : '_nombre'
}, {
	text : "Descripcion",
	flex : 1,
	width : 60,
	sortable : true,
	dataIndex : '_descripcion'
}, {
	text : "Fase",
	flex : 1,
	width : 20,
	sortable : true,
	dataIndex : '_fase'
} ];

var columna_calculo_impacto_item = [ columnas_calculo_impacto_fase, {
	text : "Costo",
	flex : 1,
	width : 20,
	sortable : true,
	dataIndex : '_costo'
} ]