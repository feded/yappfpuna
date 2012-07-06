Ext.define('YAPP.controller.CalculoImpactos', {
	extend : 'Ext.app.Controller',
	views : [ 'calculo_impacto.View', 'calculo_impacto.Grafo' ],
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
			},
			'calculoimpactosview button[action=grafo]' : {
				click : this.verGrafo
			},
			'calculoimpactografo button[action=salir]' : {
				click : this.cerrarGrafo
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
			return;
			
		}
		this.cargarItems(newValue)
	},
	changeItem : function(object, newValue, oldValue, eOpts) {
		if (newValue == null || newValue == "") {
			this.limpiarStores()
			return;
			
		}
		var store = this.getCalculoImpactosStore()
		store.load({
			params : {
				id : object.getValue()
			},
			scope : this,
			callback : function(records, operation, success) {
				this.actualizarStores(records);
				this.calculado = true
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
		this.item = records[0].data.item
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
	},
	cerrarGrafo : function(button) {
		var window = button.up('window')
		window.close()
	},
	verGrafo : function(button) {
		if (this.calculado == undefined) {
			Ext.Msg.alert("Calculo de impacto", "Seleccione primero un item para el calculo")
			return;
			
		}
		var view = Ext.widget('calculoimpactografo');
		console.log(arbor)
		var sys = arbor.ParticleSystem(100, 600, 0.5, true, 30, 0.02, 0.6)
		sys.renderer = Renderer("#grafico");
		
		var antecesores = this.getAntecesores().store;
		var sucesores = this.getSucesores().store;
		var items = new Array()
		cargarItems(antecesores, items)
		cargarItems(sucesores, items)
		crearDibujo(this.item, items, sys)
		// var animals = sys.addNode('Animals', {
		// 'color' : 'red',
		// 'shape' : 'dot',
		// 'label' : 'Animals'
		// });
		// var dog = sys.addNode('dog', {
		// 'color' : 'green',
		// 'shape' : 'dot',
		// 'label' : 'dog'
		// });
		// var cat = sys.addNode('cat', {
		// 'color' : 'blue',
		// 'shape' : 'dot',
		// 'label' : 'cat'
		// });
		// sys.addEdge(animals, dog);
		// sys.addEdge(dog, animals);
		// sys.addEdge(animals, cat);
	}

});
function cargarItems(store, calculo_items) {
	if (calculo_items == null) {
		calculo_items = new Array()
	}
	store.each(function(record) {
		calculo_items[record.data._id] = record
	})
	return calculo_items
}

function crearDibujo(item_inicio, items, sys) {
	var nodos = new Array()
	n_nodo = get_nodo(item_inicio, sys, 'rectangle', '#000000')
	nodos[item_inicio._id] = n_nodo
	items.forEach(function(record) {
		item = record.data
		n_nodo = get_nodo(item, sys)
		nodos[item._id] = n_nodo
		console.log("NODO" + item._id)
	})

	add_padre(item_inicio, nodos, sys)
	add_antecesor(item_inicio, nodos, sys)
	items.forEach(function(record) {
		item = record.data
		add_padre(item, nodos, sys)
		add_antecesor(item, nodos, sys)
	})
}

function get_nodo(item, sys, forma, fontColor) {
	if (forma == undefined || forma == null) {
		forma = 'dot'
	}
	if (fontColor == undefined || fontColor == null) {
		fontColor = 'none'
	}
	n_nodo = sys.addNode(item._nombre, {
		'color' : item._color,
		'shape' : forma,
		'label' : item._nombre,
		'fontColor' : fontColor
	})
	return n_nodo
}

function add_padre(item, nodos, sys) {
	if (item._padre_item_id != undefined && item._padre_item_id != null) {
		console.log("PADRE" + item._id + "->" + item._padre_item_id)
		if (nodos[item._padre_item_id] != undefined) {
			sys.addEdge(nodos[item._id], nodos[item._padre_item_id], {
				length : .75,
				pointSize : 3,
				label : 'Padre',
				directed : true
			})
		}
	}
}

function add_antecesor(item, nodos, sys) {
	if (item._antecesor_item_id != undefined && item._antecesor_item_id != null) {
		console.log("Antecesor" + item._id + "->" + item._antecesor_item_id)
		if (nodos[item._antecesor_item_id] != undefined) {
			sys.addEdge(nodos[item._id], nodos[item._antecesor_item_id], {
				length : .75,
				pointSize : 8,
				label : 'Antecesor',
				directed : true,
				color : '#000000'
			})
		}
	}
}