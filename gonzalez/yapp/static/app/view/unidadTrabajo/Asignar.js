//Ext.require([ 'Ext.grid.*', 'Ext.data.*', 'Ext.dd.*', 'Ext.example.*', 'YAPP.model.Recursos', 'YAPP.store.Recursos' ]);

Ext.define('YAPP.view.unidadTrabajo.Asignar', {
	extend : 'Ext.window.Window',
	alias : 'widget.asignarrecursos',
	
	title : 'Asignar recursos',
	layout : 'fit',
	autoShow : true,
	
	store: 'Recursos',
	model: 'Recursos',
	
	
	initComponent : function() {
		this.items =[
//		 				{
//							xtype : 'form',
//				//			type : 'hbox',
//							items : [ 
//										{
//											xtype : 'textfield',
//											name : '_nombre',
//											fieldLabel : 'Nombre',
//											allowBlank : false
//										},
//										{
//											xtype : 'textfield',
//											name : '_descripcion',
//											fieldLabel : 'Descripcion',
//											allowBlank : false
//										}
//									],
//						},
						{
							xtype : 'container',
							width : 650,
							height : 300,
							layout : 
									{
										type : 'hbox',
										align : 'stretch',
										padding : 5
									},
							defaults : 
							{
								flex : 1
							},
							items :
									[ 
										{
											xtype : 'gridpanel',
											name : 'firstGrid',
											height : 100,
											store : Ext.create('YAPP.store.Recursos'),
											multiSelect : true,
											viewConfig : 
														{
															plugins :
																	{
																		ptype : 'gridviewdragdrop',
																		dragGroup : 'firstGridDDGroup',
																		dropGroup : 'secondGridDDGroup'
																	},
														},
											columns : columnas,
											// stripeRows : true,
											title : 'Recursos Disponibles',
											margins : '0 2 0 0'
										},
										{
											xtype : 'gridpanel',
											name : 'secondGrid',
											store : Ext.create('YAPP.store.Recursos'),
											height : 100,
											viewConfig : {
												plugins : {
													ptype : 'gridviewdragdrop',
													dragGroup : 'secondGridDDGroup',
													dropGroup : 'firstGridDDGroup'
												},
											},
											columns : columnas,
											// stripeRows : true,
											title : 'Recursos asignados',
											margins : '0 0 0 3'
										} 
									]
						}
					]
		this.layout = {
			type : 'vbox',
			align : 'stretch',
			padding : 5
		};
		this.defaults = {
			flex : 1
		};
		this.width = 650;
		this.height = 300;
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

var columnas = [
	{
		text : "Nombre",
		flex : 1,
		sortable : true,
		width : 70,
		dataIndex : '_nombre',
		field : {
			type : 'textfield'
		}
	}
];

