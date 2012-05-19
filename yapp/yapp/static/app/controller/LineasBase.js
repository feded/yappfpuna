Ext.define('YAPP.controller.LineasBase', {
	extend : 'Ext.app.Controller',
	views : [ 'linea_base.Edit' ],
	models : [ 'LineaBase', 'Item' ],
	stores : [ 'LineasBase', 'Item', 'Fases' ],
	refs : [ {
		selector : 'lineabaseedit gridpanel[name=firstGrid]',
		ref : 'firstGrid'
	}, {
		selector : 'lineabaseedit gridpanel[name=secondGrid]',
		ref : 'secondGrid'
	}, {
		selector : 'lineasbaselist combobox[name=cbFase]',
		ref : 'comboFase'
	}, {
		selector : 'lineasbaselist combobox[name=_padre]',
		ref : 'comboItemPadre'
	} ],
	
	init : function() {
		this.control({
			'lineasbaselist' : {
				// itemdblclick : this.editUser,
				itemclick : this.lineaBaseClick
			},
			'lineasbaselist button[action=crear]' : {
				click : this.botonCrearApretado
			},
			'lineasbaselist combobox[name=cbProyecto]' : {
				change : this.changeProyecto
			},
			
			'lineasbaselist combobox[name=cbFase]' : {
				change : this.changeFase
			},
			'lineabaseedit button[action=guardar]' : {
				click : this.botonEditGuardarApretado
			},
		});
	},
	lineaBaseClick : function(grid, record) {
		var store = this.getItemStore();
		store.load({
			params : {
				id_linea_base : record.get('id')
			}
		});
	},
	botonCrearApretado : function(button) {
		nuevaLineaBase = new YAPP.model.LineaBase();
		this.ventanaRol(nuevaLineaBase);
	},
	ventanaRol : function(record) {
		var view = Ext.widget('lineabaseedit');
		if (record != null)
			view.down('form').loadRecord(record);
		var grid1 = this.getFirstGrid();
		var grid2 = this.getSecondGrid();
		var store = grid1.store;
		store.autoSync = false;
		if (record.items == null) {
			store.load({
				params : {
					id : 2
				}
			});
		} else {
			sotre.loadData(record.items)
		}
	},
	
	changeProyecto : function(object, newValue, oldValue, eOpts) {
		var combo = this.getComboFase();
		var store = this.getFasesStore();
		if (object.getValue() == '') {
			return;
		}
		combo.store = store;
		store.load({
			params : {
				id : object.getValue()
			}
		});
	},
	changeFase : function(object, newValue, oldValue, eOpts) {
		var store = this.getLineasBaseStore();
		var fase = this.getComboFase();
		store.load({
			params : {
				id_fase : fase.getValue()
			}
		});
	},
	botonEditGuardarApretado : function(button) {
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		var grid2 = this.getSecondGrid();
		record.set(values);
		
		if (grid2.store.count() == 0) {
			alert("Seleccione al menos un item para la linea base");
			return;
		}
		var fase = this.getComboFase();
		var items = grid2.store.getRange();
		
		var itemsDTO = new Array();
		for ( var i in items) {
			itemsDTO[i] = items[i].data.id;
		}
		record.data._items = itemsDTO;
		record.data._fase = fase.getValue()
		console.log(record)

		win.close();
		if (record.get('id') == 0)
			this.getLineasBaseStore().insert(0, record);
	}
});
