Ext.define('YAPP.controller.Item', {
	extend : 'Ext.app.Controller',
	
	views : [ 'item.Edit', 'item.CrearItem', 'item_unidad.List' ],
	stores : [ 'Item', 'Fases', 'TipoItems', 'ItemUnidad' ],
	models : [ 'Item' ],
	
	refs : [ 
	{
            selector : 'viewport combobox[name=fases]',
            ref : 'comboFase'
    },
	
	
	{
		selector : 'crearitem gridpanel[name=gridLB]',
		ref : 'gridLB'
	}, {
		selector : 'crearitem gridpanel[name=gridItemLB]',
		ref : 'griditemLB'
	}, {
		selector : 'crearitem gridpanel[name=gridPD]',
		ref : 'gridPD'
	}, {
		selector : 'crearitem gridpanel[name=gridTipo]',
		ref : 'gridTipo'
	}, {
		selector : 'itemedit combobox[name=_padre]',
		ref : 'comboItemPadre'
	}, {
		selector : 'itemedit combobox[name=_antecesor]',
		ref : 'comboItemAntecesor'
	} , {
		selector : 'viewport combobox[name=proyectos]',
		ref : 'proyectos'
	} , {
		selector : 'itemunidadlist button[name=btnAsignar]',
		ref : 'btnAsignar'
	} , {
		selector : 'asignarUnidad combobox[name=_unidad]',
		ref : 'unidad'
	} , {
		selector : 'itemslist button[action=crear]',
		ref : 'botonList'
	}
	],
	
	init : function() {
		console.log('Cargado controller Item');
		this.control({
			
			'itemslist button[action=crear]' : {
				click : this.crearItem
			},
			'itemslist' :{
				render : this.onRender,
				itemdblclick : this.editarItem,
				itemclick : this.mostrarRecursos
				//itemclick : this.mostrarAtributos
			},
			'itemedit button[action=guardar]' : {
				click : this.guardarItem
			},
			
			'itemslist button[action=borrar]' : {
				click : this.borrarItem
			},
			'itemslist button[action=aprobar]' : {
				click : this.aprobarItem
			},
			'itemunidadlist button[action=asignar]' : {
				click : this.asignarRecursoItem
			},
			'crearitem gridpanel[name=gridTipo]' :{
				itemclick : this.cargarTipo
			},
			'crearitem gridpanel[name=gridPD]' :{
				itemclick : this.cargarPadre
			},
			'crearitem gridpanel[name=gridItemLB]' :{
				itemclick : this.cargarAntecesor
			},
			'crearitem gridpanel[name=gridLB]' :{
				itemclick : this.lineaBaseClick
			},
			'crearitem button[action=guardar]' : {
				click : this.guardarItem
			},
			
			'viewport combobox[name=proyectos]' : {
				change : this.changeProyecto
			},
			
			'viewport combobox[name=fases]' : {
				change : this.changeFase
			}
		});
	},
	
	onRender : function() {
		var fase = this.getComboFase().getValue();
		var itemStore = this.getItemStore();
		var store = this.getFasesStore();
		var object = this.getProyectos().getValue();
		if (object == '' || fase == '') {
			return;
		}
		itemStore.store = store;
		itemStore.load({
			params : {
				id : fase
			}
		});
	},
	
	changeProyecto : function(object, newValue, oldValue, eOpts) {
		var fase = this.getComboFase().getValue();
		var itemStore = this.getItemStore();
		if (fase == null)
			return;
		var store = this.getFasesStore();
		if (store == null)
			return;
		if (object.getValue() == '') {
			return;
		}
		itemStore.load({
			params : {
				id : fase
			}
		});
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
	
	lineaBaseClick : function(grid, record) {
		var store = this.getGriditemLB().getStore();
		store.load({
			params : {
				id_linea_base : record.get('id')
			}
		});
	},
	
	cargarTipo : function(grid, record){
		
		var item = new YAPP.model.Item();
		var win = grid.up('window');
		//win.down('form').loadRecord(item);
		var form = win.down('form');
	
		var formRecord = form.getRecord();
		var values = form.getValues();
		formRecord.set(values);
		
		var tipo = this.getTipoItemsStore().getById(record.data.id);
		formRecord.data._tipo_item = tipo
		formRecord.data._tipo_item_prefijo = tipo.data._prefijo
		win.down('form').loadRecord(formRecord); 
	},
	
	cargarAntecesor : function(grid, record){
		
		var item = new YAPP.model.Item();
		var win = grid.up('window');
		//win.down('form').loadRecord(item);
		var form = win.down('form');
		
		var formRecord = form.getRecord();
		var values = form.getValues();
		formRecord.set(values);
		
		var itemSelected = this.getGriditemLB().getStore().getById(record.data.id);
		formRecord.data._antecesor = itemSelected
		formRecord.data.antecesor_nombre = itemSelected.data._nombre
		win.down('form').loadRecord(formRecord); 
	},
	
	cargarPadre : function(grid, record){
		
		var item = new YAPP.model.Item();
		var win = grid.up('window');
		//win.down('form').loadRecord(item);
		var form = win.down('form');
		
		var formRecord = form.getRecord();
		var values = form.getValues();
		formRecord.set(values);
		
		var itemSelected = this.getGridPD().getStore().getById(record.data.id);
		formRecord.data._padre = itemSelected
		formRecord.data.padre_nombre = itemSelected.data._nombre
		win.down('form').loadRecord(formRecord); 
	},
	
	crearItem : function(button) {
		var view = Ext.widget('crearitem');
		var item = new YAPP.model.Item();
		var fase = this.getComboFase();
			
		var gridLB = this.getGridLB();
		var griditemLB = this.getGriditemLB();
		var gridPD = this.getGridPD();
//		griditemLB.store.removeAll();
//		gridPD.store.removeAll();
		var store = gridLB.store;


		store.load({
			params : {
				id : fase.getValue(),
				linea_base : "false"
			}
		});
		
		var storePadre = gridPD.getStore();
		storePadre.load({
			params : {
				id : fase.getValue()
			}
		});
		item.data._version = 1;
		item.data._estado = 'ACTIVO';
		item.data.accion = 'POST';
		item.data._fase = fase.getValue();
		view.down('form').loadRecord(item);
		
		
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
		
		// var fecha = new Ext.Date();
		// fecha = Ext.Date.format(fecha, 'd-m-Y');
		// record.set('_fecha_inicio')
		
		if (typeof record.data._padre != "undefined" && typeof record.data._padre.data != "undefined" ){
			record.data._padre = record.data._padre.data.id;
		}
		if (typeof record.data._antecesor != "undefined" && typeof record.data._antecesor.data != "undefined" ){
			record.data._antecesor = record.data._antecesor.data.id;
		}
		if (typeof record.data._tipo_item.data != "undefined" ){
			record.data._tipo_item = record.data._tipo_item.data.id;
		}
		record.save(
		{	
			success : function(record) {
				if (record.data.accion == "POST") {
					this.getItemStore().insert(0, record);
				}
			},
			failure : function(record) {
				alert("No se pudo guardar el Item");
			}
			
		});
		this.getItemStore().load({
			params : {
				id : fase.getValue()
			}
		
		});
		
	},
	
	editarItem : function(grid, record) {
		
//		
//		filtro para el edit
//		comboPadre.filterBy(function filtro(record, id){
//			
//		});
		var fase = this.getComboFase();
		console.log("Editar")
		var view = Ext.widget('crearitem');
		view.setTitle('Editar Item');
		view.down('form').loadRecord(record);
		
		var gridLB = this.getGridLB();
		var griditemLB = this.getGriditemLB();
		var gridPD = this.getGridPD();
//		griditemLB.store.removeAll();
//		gridPD.store.removeAll();
		var store = gridLB.store;
//		store.load({
//			params : {
//				id : fase.getValue(),
//				linea_base : "false"
//			}
//		});
		
		var faseStore = new YAPP.store.Fases().load({
			params : {
				fase_id : fase.getValue(),
				id : this.getProyectos().getValue()
			},
			callback : function(records, operation, success) {
				faseAntecesora = records[0]
				if (faseAntecesora == 'undefined' || faseAntecesora == "" || faseAntecesora == null) {
					return;
				}
				store.load({
					params : {
						id : faseAntecesora.data.id,
						linea_base : "false"
					}
				})
			}
		});
		
		
		
		var storePadre = gridPD.getStore();
		console.log(storePadre);
		console.log(fase.getValue());
		storePadre.load({
			params : {
				id : fase.getValue()
			},
			callback : function(records, operation, success) {
				storePadre.filterBy(function filtro(rec, id){
					if (record.get('id') == rec.get('id')){
						return false
					}
					return true
				});
			}
		});
		record.data._version = record.data._version + 1;
		record.data.accion = 'PUT';
		record.data.antecesor_nombre = record.data._antecesor._nombre;
		record.data._antecesor = record.data._antecesor.id;
		record.data.padre_nombre = record.data._padre._nombre;
		record.data._padre = record.data._padre.id;
		record.data._tipo_item_prefijo = record.data._tipo_item._prefijo;
		view.down('form').loadRecord(record);
	
//		var comboAntecesor = this.getComboItemAntecesor();
//		
//		var faseStore = this.getFasesStore().load({
//			params : {
//				fase_id : fase.getValue(),
//				id : this.getProyectos().getValue()
//			},
//			callback : function(records, operation, success) {
//				faseAntecesora = records[0]
//				if (faseAntecesora == 'undefined' || faseAntecesora == "" || faseAntecesora == null) {
//					return;
//				}
//				comboAntecesor.store.load({
//					params : {
//						id : faseAntecesora.data.id
//					}
//				})
//			}
//		});
//		
//		var comboPadre = this.getComboItemPadre();
//		var comboAntecesor = this.getComboItemAntecesor();
//		if (fase.getValue() == '') {
//			return;
//		}
//		comboPadre.store.load({
//			params : {
//				id : fase.getValue()
//			},
//			callback : function(records, operation, success) {
//				for (record in records) {
//					this.filter([ {
//						filterFn : function(item) {
//							console.log((item.get("id") != records[record].data.id));
//							return (item.get("id") != records[record].data.id);
//						}
//					} ]);
//				}
//			}
//		});
// 		var store = this.getItemStore();
// 		store.load({
// 		params : {
//		 id : fase.getValue()
//		 }
//		 });	
//		this.getFasesStore().load({
//			params : {
//				id : this.getProyectos().getValue()
//			},
//			callback : function(records, operation, success) {
//				fase.setValue(fase.getValue())
//			}
//		});

//		this.getItemStore().load({
//					params : {
//						id : fase.getValue()
//					}
//				
//				});
//		},
	},

	
	borrarItem : function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var record = grilla.getSelectionModel().getSelection()[0];
		var store = this.getItemStore();
		record.destroy({
			success : function(linea_base) {
				Ext.example.msg("Item", "Eliminado con exito");
				store.remove(selection);
			},
			failure : function(linea_base) {
				alert("No se pudo eliminar el Item");
			}
		});
		
	},
	
	aprobarItem : function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var record = grilla.getSelectionModel().getSelection()[0];
		if (record.data._estado == "ACTIVO" || record.data._estado == "REVISION")
			record.data._estado = "APROBADO"
		record.save(
		{	
			success : function(record) {
				Ext.example.msg("Item", "Aprobado con exito");
			},
			failure : function(record) {
				alert("No se pudo aprobar el Item");
			}
			
		});
	},
	
	asignarRecursoItem : function(button){
		botonlist = this.getBotonList();
		var win = botonlist.up('grid');
		var grilla = win.down('gridview')
		var itemRecord = grilla.getSelectionModel().getSelection()[0];
		var unidadID = this.getUnidad().getValue();
		
	}
});