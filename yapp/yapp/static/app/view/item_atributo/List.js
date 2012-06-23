Ext.define('YAPP.view.item_atributo.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.atributositemlist',
	
	store : 'ItemAtributo',
	layout : 'fit',
	
	initComponent : function() {
		
		this.dockedItems = [{
				xtype : 'toolbar',
				title: 'Atributos Particulares',
				items : [ 
				{
                    xtype: 'button',
                    text: 'Definir Atributo no Asignado',
                    name : 'atributos',
                    action : 'atributos',
                    scope : this,
                    disabled : true,
                }]
		}];
		
		this.columns = [ {
				text : 'Nombre Atributo',
				flex : 1,
				sortable : true,
				dataIndex : '_atributo',
				renderer : renderizarNombreAtributo
			},{
				header : 'Tipo',
				flex : 1,
				sortable : true,
				dataIndex : '_atributo',
				renderer : renderizarTipoAtributo
			},{
				header : 'Valor',
				flex : 1,
				sortable : true,
				dataIndex : '_valor',
				
			} ];
		this.callParent(arguments);
	}
	

});



function renderizarNombreAtributo(val) {
	console.log(val)
	if (val == null)
		return val;
	if (val._valor == null)
		return val
	return val._valor
}

function renderizarTipoAtributo(val) {
	console.log(val)
	if (val == null)
		return val;
	if (val._tipo == null)
		return val
	return val._tipo
}
