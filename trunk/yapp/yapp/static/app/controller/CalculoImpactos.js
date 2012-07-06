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
			},
			'calculoimpactografo checkbox[name=extras]' : {
				change : this.changeCheckBox
			}
		});
	},
	changeCheckBox : function(cb, newValue, oldValue) {
		var eDemas = this.eDemas
		var sys = this.sys
		var todos = this.nTodos
		if (newValue == false) {
			eDemas.forEach(function(arista) {
				console.log(arista)
				if (arista != undefined && arista.edge != undefined) {
					sys.pruneEdge(arista.edge)
				}
			})
		} else {
			eDemas.forEach(function(arista) {
				var edge = add_edge(sys, todos, arista.inicio, arista.fin, arista.label, arista.color)
				arista.edge = edge
			})
		}
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
		var sys = arbor.ParticleSystem(100, 600, 0.5, true, 30, 0.02, 0.6)
		sys.renderer = Renderer("#grafico");
		
		var antecesores = this.getAntecesores().store;
		var sucesores = this.getSucesores().store;
		
		var aAntecesores = cargarItems(antecesores)
		var aSucesores = cargarItems(sucesores)

		//
		var todos = new Array()
		todos[this.item._id] = this.item
		aAntecesores.forEach(function(record) {
			var item = record.data
			todos[item._id] = item
		})
		aSucesores.forEach(function(record) {
			var item = record.data
			todos[item._id] = item
		})
		var nTodos = new Array()
		var eDemas = new Array()
		//
		
		var nAntecesores = addNodos(aAntecesores, sys, nTodos)
		var nSucesores = addNodos(aSucesores, sys, nTodos)
		nNodo = get_nodo(this.item, sys, 'dot', '#000000')
		nAntecesores[this.item._id] = nNodo
		nSucesores[this.item._id] = nNodo
		nTodos[this.item._id] = nNodo
		addEdges(this.item, aAntecesores, nAntecesores, sys, nTodos, eDemas)
		addEdges(this.item, aSucesores, nSucesores, sys, nTodos, eDemas)
		this.eDemas = eDemas
		this.sys = sys
		this.nTodos = nTodos
		// crearDibujo(this.item, items, sys)
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

function addNodos(items, sys, todos, nodos) {
	nodos = new Array()
	items.forEach(function(record) {
		item = record.data
		n_nodo = get_nodo(item, sys)
		nodos[item._id] = n_nodo

		if (todos != null) {
			todos[item._id] = n_nodo
		}
	})
	return nodos
}

function addEdges(item_inicio, items, nodos, sys, todos, eDemas) {
	add_padre(item_inicio, nodos, sys, todos, eDemas)
	add_antecesor(item_inicio, nodos, sys, todos, eDemas)
	items.forEach(function(record) {
		item = record.data
		add_padre(item, nodos, sys, todos, eDemas)
		add_antecesor(item, nodos, sys, todos, eDemas)
	})
}

function get_nodo(item, sys, forma, fontColor) {
	if (forma == undefined || forma == null) {
		forma = 'rectangle'
	}
	if (fontColor == undefined || fontColor == null) {
		fontColor = 'none'
	}
	var n_nodo = sys.addNode(item._nombre, {
		'color' : item._color,
		'shape' : forma,
		'label' : item._nombre,
		'fontColor' : fontColor
	})
	console.log("Nuevo nodo: " + item._nombre + "[" + item._id + "]")
	return n_nodo
}

function add_padre(item, nodos, sys, todos, eDemas) {
	var i = eDemas.length
	if (item._padre_item_id != undefined && item._padre_item_id != null) {
		if (nodos[item._padre_item_id] != undefined) {
			add_edge(sys, nodos, item._id, item._padre_item_id, "Hijo")
		} else {
			if (nodos[item._padre_item_id] != undefined) {
				edge = add_edge(sys, nodos, item._id, item._padre_item_id, "Hijo")
				var arista = {
					edge : edge,
					inicio : item._id,
					fin : item._antecesor_item_id,
					label : "Hijo",
				}
				console.log(arista)
				eDemas[i] = arista
				i = i + 1
			}
		}
	}
}

function add_antecesor(item, nodos, sys, todos, eDemas) {
	var i = eDemas.length
	if (item._antecesor_item_id != undefined && item._antecesor_item_id != null) {
		if (nodos[item._antecesor_item_id] != undefined) {
			add_edge(sys, nodos, item._id, item._antecesor_item_id, "Sucesor", '#000000')
		} else {
			if (todos[item._antecesor_item_id] != undefined) {
				edge = add_edge(sys, todos, item._id, item._antecesor_item_id, "Sucesor", '#000000')
				var arista = {
					edge : edge,
					inicio : item._id,
					fin : item._antecesor_item_id,
					label : "Sucesor",
					color : '#000000'
				}
				console.log(arista)
				eDemas[i] = arista
				i = i + 1
			}
		}
	}
}

function add_edge(sys, nodos, inicio_id, destino_id, label, color_fuente) {
	var aRet = sys.addEdge(nodos[inicio_id], nodos[destino_id], {
		length : .75,
		pointSize : 8,
		label : label,
		directed : true,
		color : color_fuente
	})
	console.log("AGREGANDO NODO " + inicio_id + " -> " + destino_id)
	if (aRet == undefined) {
		console.log("\tERROR " + inicio_id + " -> " + destino_id)
	}
	return aRet
}