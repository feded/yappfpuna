Ext.define('YAPP.view.item.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.itemslist',
	layout : 'fit',
	store : 'Item',
	initComponent : function() {
		Ext.apply(this, {
			iconCls : 'icon-grid',
			frame : true,
			dockedItems : [ {
				xtype : 'toolbar',
				items : [
				{
					iconCls : 'icon-add',
					text : 'Nuevo Item',
					scope : this,
					action : 'crear',
				}, '|', {
					iconCls : 'icon-delete',
					text : 'Eliminar Item',
					disabled : true,
					itemId : 'delete',
					action : 'borrar',
					scope : this,
				} ]
			},{
                weight: 2,
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    xtype: 'button',
                    text: 'Aprobar Item',
                    action : 'aprobar',
                    itemId : 'aprove',
                    scope : this,
                    disabled : true,
                }, '|',{
                    xtype: 'button',
                    text: 'Administar Recursos del Item',
                    action : 'asignar',
                    itemId : 'asignar',
                    scope : this,
                    disabled : true,
                }, ]}],
			
			columns : [ {
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
			}, {
				header : 'Version',
				sortable : true,
				dataIndex : '_version',
				flex : 1
			}, {
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
			}
	
			]
		});
		this.callParent();
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
		this.down('#delete').setDisabled(selections.length === 0);
		this.down('#aprove').setDisabled(selections.length === 0);
		this.down('#asignar').setDisabled(selections.length === 0);
	}

});

function renderizador_lista_item(val) {
	console.log(val);
	if (val != null && val._nombre != null) {
		return val._nombre;
	}
	return val;
}
