Ext.define('YAPP.view.item.RevertirItem', {
	extend : 'Ext.window.Window',
	alias : 'widget.revertirItems',
	title : 'Items',
	// layout : 'fit',
	autoShow : true,
	// frame:true,
	initComponent : function() {
		this.items = [ {
					xtype : 'gridpanel',
					name : 'gridVersionesItem',
					height : 90,
					columns : [ {
				header : 'Version',
				sortable : true,
				dataIndex : '_version',
				flex : 1
			},{
				header : 'Nombre',
				sortable : true,
				dataIndex : '_nombre',
				flex : 1
			}, {
				header : 'Duracion',
				sortable : true,
				dataIndex : '_duracion',
				flex : 1
			}, {
				header : 'Descripcion',
				sortable : true,
				dataIndex : '_descripcion',
				flex : 1
			}, {
				header : 'Condicionado',
				sortable : true,
				dataIndex : '_condicionado',
				flex : 1
			}, {
				header : 'Tipo de Item',
				sortable : true,
				dataIndex : '_tipo_item',
				flex : 1,
				renderer : renderizador_lista_item
			},  {
				header : 'Estado',
				sortable : true,
				dataIndex : '_estado',
				flex : 1
			}, {
				 xtype: 'datecolumn' ,
				 header: 'Fecha de Inicio', 
				 sortable : true, 
				 dataIndex: '_fecha_inicio', 
				 format: 'd/m/Y', 
				 flex: 1
			}, {
				header : 'Padre',
				sortable : true,
				dataIndex : '_padre',
				flex : 1,
				renderer : renderizador_lista_item
			}, {
				header : 'Antecesor',
				sortable : true,
				dataIndex : '_antecesor',
				flex : 1,
				renderer : renderizador_lista_item
			}, {
			 	hidden : true,
				header : 'Item ID',
				sortable : true,
				dataIndex : '_item_id',
				flex : 1,
				renderer : renderizador_lista_item
			}			],
					store : Ext.create('YAPP.store.Item'),
					// stripeRows : true,
					title : 'Versiones Anteriores',
					margins : '0 2 0 0',
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
		this.width = 750;
		this.height = 300;
		this.buttons = [ {
			text : 'Revertir a Versión Seleccionada',
			disabled : true,
			formBind : true,
			action : 'revertirItems',
			itemId : 'revertirItems'
		}, {
			text : 'Cancel',
			scope : this,
			handler : this.close
		} ];
		
		this.callParent(arguments);
	}
	

});


onSelectChange = function(selModel, selections) {
		console.log('hola')
		this.down('#revertirItems').setDisabled(selections.length === 0);
	}

function renderizador_lista_item(val) {
	if (val != null && val._nombre != null) {
		return val._nombre;
	}else if (val != null && val.data != null && val.data._nombre != null){
		return val.data._nombre;
	}
	return val;
}