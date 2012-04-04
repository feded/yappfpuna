Ext.require([ 'Ext.form.*', 'Ext.layout.container.Column', 'Ext.tab.Panel', 'Ext.grid.*', 'Ext.data.*', 'Ext.dd.*' ]);

Ext.define('DataObject', {
	extend : 'Ext.data.Model',
	fields : [ 'name', 'column1', 'column2' ]
});

Ext.onReady(function() {
	
	var button_aceptar = {
		text : 'Ingresar',
		formBind : true,
		handler : function() {
			fsf.getForm().submit({
				method : 'POST',
				waitMsg : 'Creando...',
				params : {
					'expandido' : expandido
				},
				success : function() {
					Ext.Msg.alert('Estado', "" + expandido, function(btn, text) {
						if (btn == 'ok') {
							// var redirect = 'main';
							// window.location = redirect;
						}
					});
				},
				failure : function(form, action) {
					if (action.failureType == 'server') {
						Ext.Msg.alert('Error al crear rol!', obj.errors.reason);
					} else {
						Ext.Msg.alert('Error!', 'No se puede conectar al servidor : ' + action.response.responseText);
					}
					fsf.getForm().reset();
				}
			});
		}
	}
	var rol_field = {
		xtype : 'fieldset',
		title : 'Informacion de rol',
		defaultType : 'textfield',
		layout : 'anchor',
		defaults : {
			anchor : '100%'
		},
		name : 'fieldSet',
		items : [ {
			fieldLabel : 'Nombre de rol',
			name : 'nombre',
			allowBlank : false
		}, {
			fieldLabel : 'Estado',
			name : 'estado'
		} ]
	};
	
	var expandido;
	var rol_final_field = Ext.widget('myfieldset', {
		collapsed : true,
		xtype : 'fieldset',
		title : 'Rol final',
		collapsible : true,
		defaultType : 'textfield',
		layout : 'anchor',
		name : 'panel_final',
		defaults : {
			anchor : '100%'
		},
		items : [ {
			fieldLabel : 'Email',
			name : 'email'
		}, {
			fieldLabel : 'Contraseña',
			name : 'password',
			inputType : 'password'
		} ],
		listeners : {
			'beforeexpand' : function(fieldset) {
				expandido = true;
			},
			'beforecollapse' : function(fieldset) {
				expandido = false;
			}
		}
	});
	var fsf = Ext.create('Ext.form.Panel', {
		frame : true,
		title : 'Nuevo Rol',
		bodyStyle : 'padding:5px 5px 0',
		width : 350,
		url : 'crearRol',
		fieldDefaults : {
			msgTarget : 'side',
			labelWidth : 75
		},
		defaults : {
			anchor : '100%'
		},
		renderTo : 'form',
		items : [ rol_field, rol_final_field ],
		buttons : [ button_aceptar ]
	
	});
	
	// create the Data Store
	var store = Ext.create('Ext.data.Store', {
		pageSize : 50,
		model : 'ForumThread',
		remoteSort : true,
		proxy : {
			// load using script tags for cross domain, if the data in
			// on the
			// same domain as
			// this page, an HttpProxy would be better
			type : 'jsonp',
			url : 'viewRoles',
			reader : {
				root : 'topics',
				totalProperty : 'totalCount'
			},
			// sends single sort as multi parameter
			simpleSortMode : true
		},
		sorters : [ {
			property : 'lastpost',
			direction : 'DESC'
		} ]
	});
	
	var columns = [ {
		text : "Record Name",
		flex : 1,
		sortable : true,
		dataIndex : 'name'
	}, {
		text : "column1",
		width : 70,
		sortable : true,
		dataIndex : 'column1'
	}, {
		text : "column2",
		width : 70,
		sortable : true,
		dataIndex : 'column2'
	} ];
	
	// declare the source Grid
	var firstGrid = Ext.create('Ext.grid.Panel', {
		multiSelect : true,
		renderTo : 'grid',
		store : store,
		columns : columns,
		stripeRows : true,
		title : 'First Grid',
		margins : '0 2 0 0'
	});
	
	// Simple 'border layout' panel to house both grids
	var displayPanel = Ext.create('Ext.Panel', {
		width : 650,
		height : 300,
		layout : {
			type : 'hbox',
			align : 'stretch',
			padding : 5
		},
		defaults : {
			flex : 1
		}, // auto stretch
		renderTo : 'grid',
		items : [ firstGrid ],
		dockedItems : {
			xtype : 'toolbar',
			dock : 'bottom',
			items : [ '->', // Fill
			{
				text : 'Reset both grids',
				handler : function() {
					// refresh source grid
					firstGridStore.loadData(myData);
				}
			} ]
		}
	});
	store.loadPage(1);
});
