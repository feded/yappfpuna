Ext.define('YAPP.controller.CalculoImpactos', {
	extend : 'Ext.app.Controller',
	views : [ 'calculo_impacto.View' ],
	models : [ 'CalculoImpacto' ],
	stores : [ 'CalculoImpactos', 'Fases', 'Item' ],
	refs : [ {
		selector : 'calculoimpactosview gridpanel[name=antecesores]',
		ref : 'antecesores'
	}, {
		selector : 'calculoimpactosview gridpanel[name=sucesores]',
		ref : 'sucesores'
	}, {
		selector : 'calculoimpactosview gridpanel[name=bases]',
		ref : 'bases'
	}, {
		selector : 'calculoimpactosview combobox[name=cbFase]',
		ref : 'comboFase'
	}, {
		selector : 'calculoimpactosview combobox[name=cbItem]',
		ref : 'comboItem'
	}, {
		selector : 'viewport combobox[name=proyectos]',
		ref : 'proyectos'
	}, {
		selector : 'calculoimpactosview label[name=label_costo_antecesores]',
		ref : 'labelAntecesores'
	}, {
		selector : 'calculoimpactosview label[name=label_costo_sucesores]',
		ref : 'labelSucesores'
	} ],
	
	init : function() {
		this.control({
			'calculoimpactosview' : {
				render : this.onRender
			},
			'calculoimpactosview combobox[name=cbFase]' : {
				change : this.changeFase
			},
			'calculoimpactosview combobox[name=cbItem]' : {
				change : this.changeItem
			}
		});
	},
	
	onRender : function() {
		var combo = this.getComboFase();
		var store = this.getFasesStore();
		var object = this.getProyectos().getValue();
		if (object == '') {
			return;
		}
		combo.store = store;
		store.load({
			params : {
				id : object
			}
		});
	},
	
	changeFase : function(object, newValue, oldValue, eOpts) {
		var store = this.getItemStore();
		var fase = this.getComboFase();
		var combo = this.getComboItem();
		combo.store = store;
		store.load({
			params : {
				id : fase.getValue()
			}
		});
	},
	changeItem : function(object, newValue, oldValue, eOpts) {
		var store = this.getCalculoImpactosStore()
		store.load({
			params : {
				id : object.getValue()
			},
			scope : this,
			callback : function(records, operation, success) {
				this.actualizarStores(records);
			}
		})
	},
	actualizarStores : function(records) {
		var antecesores = this.getAntecesores();
		antecesores.store.loadData(records[0].data.antecesores)
		var sucesores = this.getSucesores();
		sucesores.store.loadData(records[0].data.sucesores)
		var lineasBases = this.getBases();
		lineasBases.store.loadData(records[0].data.bases)

		var labelSucesores = this.getLabelSucesores()
		var labelAntecesores = this.getLabelAntecesores()

		labelSucesores.setText(records[0].data.costo_sucesores)
		labelAntecesores.setText(records[0].data.costo_antecesores)

	}
});
