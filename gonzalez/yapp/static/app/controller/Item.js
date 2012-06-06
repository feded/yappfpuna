Ext.define('YAPP.controller.Item', {
	extend : 'Ext.app.Controller',
	
	views : [ 'item.List', 'item.Edit' ],
	stores : [ 'Item', 'Fases', 'TipoItems' ],
	models : [ 'Item' ],
	
	refs : [ {
		selector : 'itemslist combobox[name=cbFase]',
		ref : 'comboFase'
	}, {
		selector : 'itemedit combobox[name=_padre]',
		ref : 'comboItemPadre'
	}, {
		selector : 'itemedit combobox[name=_antecesor]',
		ref : 'comboItemAntecesor'
	} ],
	
	init : function() {
		console.log('Cargado controller Item');
		this.control({
			
			'itemslist button[action=crear]' : {
				click : this.crearItem
			},
			'itemedit button[action=guardar]' : {
				click : this.guardarItem
			},
			
			'itemslist button[action=borrar]' : {
				click : this.borrarItem
			},
			
			'itemslist' : {
				itemdblclick : this.editarItem
			},
			
			'viewport combobox[name=proyectos]' : {
				change : this.changeProyecto
			},
			
			'itemslist combobox[name=cbFase]' : {
				change : this.changeFase
			}
		});
	},
	
	changeProyecto : function(object, newValue, oldValue, eOpts) {
//		esta mal, el ComboFase no necesariamente esta visible
//		var combo = this.getComboFase();
//		var store = this.getFasesStore();
//		if (object.getValue() == '') {
//			return;
//		}
//		proyectoId = object.getValue();
//		// combo.clearValue();
//		combo.store = store;
//		store.load({
//			params : {
//				id : object.getValue()
//			}
//		});
		// this.getEntidadesPadresStore().load();
		// object.store = this.getEntidadesPadresStore()
	},
	
	changeFase : function(object, newValue, oldValue, eOpts) {
		var itemStore = this.getItemStore();
		var fase = this.getComboFase();
		itemStore.load({
			params : {
				id : fase.getValue()
			}
		});
	},
	
	crearItem : function(button) {
		var view = Ext.widget('itemedit');
		var item = new YAPP.model.Item();
		var Fase = this.getComboFase();
		
		var faseStore = this.getFasesStore().load({
			params : {
				fase_id : Fase.getValue(),
				id : proyectoId
			},
			callback : function(records, operation, success) {
				faseAntecesora = records[0]
				if (faseAntecesora == 'undeefined' || faseAntecesora == "" || faseAntecesora == null) {
					return;
				}
				comboAntecesor.store.load({
					params : {
						id : faseAntecesora.data.id
					}
				})
			}
		});
		
		var comboPadre = this.getComboItemPadre();
		var comboAntecesor = this.getComboItemAntecesor();
		if (Fase.getValue() == '') {
			return;
		}
		
		comboPadre.store.load({
			params : {
				id : Fase.getValue()
			}
		});
		
		var store = this.getItemStore();
		store.load({
			params : {
				id : Fase.getValue()
			}
		});
		
		item.data._version = 1;
		item.data._estado = 'ACTIVO';
		item.data.accion = 'POST';
		item.data._fase = Fase.getValue();
		view.down('form').loadRecord(item);
		
		this.getFasesStore().load({
			params : {
				id : proyectoId
			},
			callback : function(records, operation, success) {
				Fase.setValue(Fase.getValue())
			}
		});
		
	},
	
	guardarItem : function(button) {
		var fase = this.getComboFase();
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		if (record.data._condicionado == 'on')
			record.data._condicionado = 'true'
		else
			record.data._condicionado = 'false'
		win.close();
		if (record.data.accion == "POST") {
			// var fecha = new Ext.Date();
			// fecha = Ext.Date.format(fecha, 'd-m-Y');
			// record.set('_fecha_inicio')
			this.getItemStore().insert(0, record);
		} else {
			this.getItemStore().load({
				params : {
					id : fase.getValue()
				}
			
			});
		}
	},
	
	editarItem : function(grid, record) {
		console.log("Editar")
		var view = Ext.widget('itemedit');
		view.setTitle('Editar Item');
		view.down('form').loadRecord(record);
		
		var Fase = this.getComboFase();
		
		if (Fase.getValue() == '') {
			return;
		}
		
		var comboAntecesor = this.getComboItemAntecesor();
		
		var faseStore = this.getFasesStore().load({
			params : {
				fase_id : Fase.getValue(),
				id : proyectoId
			},
			callback : function(records, operation, success) {
				faseAntecesora = records[0]
				if (faseAntecesora == 'undefined' || faseAntecesora == "" || faseAntecesora == null) {
					return;
				}
				comboAntecesor.store.load({
					params : {
						id : faseAntecesora.data.id
					}
				})
			}
		});
		
		var comboPadre = this.getComboItemPadre();
		var comboAntecesor = this.getComboItemAntecesor();
		if (Fase.getValue() == '') {
			return;
		}
		comboPadre.store.load({
			params : {
				id : Fase.getValue()
			},
			callback : function(records, operation, success) {
				for (record in records) {
					this.filter([ {
						filterFn : function(item) {
							console.log((item.get("id") != records[record].data.id));
							return (item.get("id") != records[record].data.id);
						}
					} ]);
				}
			}
		});
		// var store = this.getItemStore();
		// store.load({
		// params : {
		// id : Fase.getValue()
		// }
		// });
		record.data.accion = 'PUT';
		
		this.getFasesStore().load({
			params : {
				id : proyectoId
			},
			callback : function(records, operation, success) {
				Fase.setValue(Fase.getValue())
			}
		});
	},
	
	borrarItem : function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		var store = grilla.store;
		store.remove(selection);
	}
});