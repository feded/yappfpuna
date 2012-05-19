Ext.define('YAPP.controller.CalculoImpactos', {
	extend : 'Ext.app.Controller',
	views : [ 'calculo_impacto.View' ],
	models : [ 'CalculoImpacto' ],
	stores : [ 'CalculoImpactos' ],
	refs : [ {
		selector : 'calculoimpactosview gridpanel[name=antecesores]',
		ref : 'antecesores'
	}, {
		selector : 'calculoimpactosview gridpanel[name=sucesores]',
		ref : 'sucesores'
	}, {
		selector : 'calculoimpactosview gridpanel[name=base]',
		ref : 'bases'
	}, {
		selector : 'lineasbaselist combobox[name=cbFase]',
		ref : 'comboFase'
	}, {
		selector : 'lineasbaselist combobox[name=cbItem]',
		ref : 'comboItem'
	} ],
	
	init : function() {
		this.control({});
	}
});
