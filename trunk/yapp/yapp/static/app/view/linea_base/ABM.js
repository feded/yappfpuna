Ext.define('YAPP.view.linea_base.ABM', {
	extend : 'Ext.form.Panel',
	alias : 'widget.lineasbaseabm',
	title : 'Lineas Base',
	requires : [ 'YAPP.view.linea_base.List', 'YAPP.view.item.List' ],
	// layout : 'fit',
	autoShow : true,
	// frame:true,
	// stores : [ 'RolEstados' ],
	
	initComponent : function() {
		this.items = [ {
			xtype : 'lineasbaselist',
		}, {
			padding : 5,
			xtype : 'gridpanel',
			name : 'gridItems',
			store : 'Item',
			height : 400,
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
				xtype : 'datecolumn',
				header : 'Fecha de Inicio',
				sortable : true,
				dataIndex : '_fecha_inicio',
				format : 'd/m/Y',
				flex : 1
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
			} ],
			title : 'Items de la linea base'
		} ];
		
		this.callParent(arguments);
	}

});
