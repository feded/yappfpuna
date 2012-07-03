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
			'viewport combobox[name=fases]' : {
				change : this.changeFase
			},
			'calculoimpactosview combobox[name=cbItem]' : {
				change : this.changeItem
			},
			'calculoimpactosview' : {
				'tabSeleccionada' : this.onFocus
			}
		});
	},
	onFocus : function(view) {
		var combo = this.getComboItem()
		if (this.itemStore == undefined) {
			this.itemStore = Ext.create('YAPP.store.Item')
			combo.store = this.itemStore
		}
		valor = this.ultimoCambiado
		if (valor != undefined && valor != "") {
			this.cargarItems(valor)
		}
	},
	cargarItems : function(value) {
		var combo = this.getComboItem()
		this.itemStore.load({
			params : {
				id : value
			},
			callback : function(items) {
				if (Ext.typeOf(combo.getPicker().loadMask) !== "boolean") {
					combo.getPicker().loadMask.hide();
				}
			}
		});
	},
	changeFase : function(object, newValue, oldValue, eOpts) {
		this.ultimoCambiado = newValue;
		if (this.itemStore == undefined) {
			return;
		}
		if (newValue == null || newValue == "") {
			this.limpiarStores()
			this.itemStore.removeAll()
			this.getComboItem().setValue("")
			return
		}
		this.cargarItems(newValue)
	},
	changeItem : function(object, newValue, oldValue, eOpts) {
		if (newValue == null || newValue == "") {
			this.limpiarStores()
			return
		}
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

	},
	limpiarStores : function() {
		var antecesores = this.getAntecesores();
		antecesores.store.removeAll()
		var sucesores = this.getSucesores();
		sucesores.store.removeAll()
		var lineasBases = this.getBases();
		lineasBases.store.removeAll()

		var labelSucesores = this.getLabelSucesores()
		var labelAntecesores = this.getLabelAntecesores()

		labelSucesores.setText("0")
		labelAntecesores.setText("0")
	}
});
