Ext.define('YAPP.view.calculo_impacto.Grafo', {
	extend : 'Ext.window.Window',
	alias : 'widget.calculoimpactografo',
	title : 'Grafo',
	// layout : 'fit',
	autoShow : true,
	// frame:true,
	
	initComponent : function() {
		this.items = [ {
			xtype : 'container',
			html : "<canvas id=\"grafico\" width=\"800\" height=\"600\" style=\"background-color:#FFFFFF\"></canvas>",
		} ];
		this.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			items : [ {
				xtype : 'checkbox',
				name : 'extras',
				fieldLabel : 'Todas las relaciones',
				typeAhead : true,
				checked : true
			}, {
				xtype : 'component',
				flex : 1
			}, {
				text : 'Salir',
				scope : this,
				action : 'salir'
			} ]
		} ];
		this.callParent(arguments);
	},
});
