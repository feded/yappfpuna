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
			html : "<canvas id=\"grafico\" width=\"800\" height=\"600\"></canvas>",
		} ];
		this.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			items : [ {
				text : 'Salir',
				scope : this,
				action : 'salir'
			} ]
		} ];
		this.callParent(arguments);
	}

});
