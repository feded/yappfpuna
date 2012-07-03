Ext.define('YAPP.view.fase.ABM', {
	extend : 'Ext.form.Panel',
	alias : 'widget.faseabm',
	views: 	[
				'fase.ListarFase', 'fase.ListarAtributoFase', 'fase.ListarTipoFase'
			],
//	title : 'Roles',
	
	autoShow : true,
	
	initComponent : function() {
		this.items = [
					 	{
							xtype : 'listarfase'
						},
						{
							xtype : 'listaratributofase'
						},
						{
							xtype : 'listartipofase'
						}
					];
		this.callParent(arguments);
	}

});
