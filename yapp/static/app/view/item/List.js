Ext.define('YAPP.view.item.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.itemslist',
    layout: 'fit',
    store : 'Item',
	initComponent : function() {
		this.dockedItems = [ {
				xtype : 'toolbar',
				items : [ 
						{
                        	xtype: 'combobox',
                        	name: 'cbProyecto',
                            fieldLabel: 'Proyecto',
    						store: Ext.create('YAPP.store.Proyectos'),
    						displayField: '_nombre',
    						queryMode : 'local',
    						valueField: 'id',
                        },
                        {
                        	xtype: 'combobox',
                        	name: 'cbFase',
                            fieldLabel: 'Fase',
    						displayField: '_nombre',
    						queryMode : 'local',
    						valueField: 'id',
                        },
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
						}
						]
				} ];
    
	    this.columns = [
	        {header: 'Nombre', sortable : true, dataIndex: '_nombre', flex: 1},
	        {header: 'Duracion', sortable : true, dataIndex: '_duracion', flex: 1},
	        {header: 'Condicionado', sortable : true, dataIndex: '_condicionado',  flex: 1},
	        {header: 'Version', sortable : true, dataIndex: '_version', flex: 1},
	        {header: 'Estado', sortable : true, dataIndex: '_estado', flex: 1},
//	        {header: 'Fecha de Inicio', sortable : true, dataIndex: '_fecha_inicio', flex: 1},
//	        {header: 'Fecha de Fin', sortable : true, dataIndex: '_fecha_fin', flex: 1},
	        {header: 'Padre', sortable : true, dataIndex: '_padre', flex: 1, renderer: renderizador_lista_item}


		];
		this.callParent();
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	onSelectChange : function(selModel, selections) {
            this.down('#delete').setDisabled(selections.length === 0);
    }
	
});
	    
function renderizador_lista_item(val) {
	if (val == null)
		return val;
	if (val._estado == null)
		return val
	return val._nombre
	// return ""
}

