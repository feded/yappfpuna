Ext.define('YAPP.controller.Item', {
	extend : 'Ext.app.Controller',
	
	views : [ 'item.Edit', 'item.List',  'item.CrearItem', 'item_unidad.List', 'item_unidad.Edit' ],
	stores : [ 'Item', 'Fases', 'TipoItems', 'ItemUnidad' ],
	models : [ 'Item' , 'ItemUnidad' ],
	
	refs : [ 
	{
        selector : 'viewport combobox[name=fases]',
        ref : 'comboFase'
    },{
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
	} ,  {
		selector : 'itemslist button[name=aprobar]',
		ref : 'aprove'
	} , {
		selector : 'itemslist button[name=desaprobar]',
		ref : 'deaprove'
	} , {
		selector : 'itemslist button[name=atributos]',
		ref : 'atributos'
	} ,  {
		selector : 'itemslist button[name=borrar]',
		ref : 'delete'
	} , {
		selector : 'asignarUnidad combobox[name=_unidad_id]',
		ref : 'unidad'
	} , {
		selector : 'itemslist button[name=crear]',
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
			'itemslist button[action=desaprobar]' : {
				click : this.activarItem
			},
			'itemunidadlist button[action=asignar]' : {
				click : this.asignarRecursoItem
			},
			'itemunidadlist button[action=desasignar]' : {
				click : this.desAsignarRecursoItem
			},
			'asignarUnidad button[action=guardar]' : {
				click : this.guardarAsignacion
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
		var storeUnidadItems = this.getItemUnidadStore();
		storeUnidadItems.load();
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
		var form = win.down('form');
		
		var formRecord = form.getRecord();
		var values = form.getValues();
		formRecord.set(values);
		
		var itemSelected = this.getGridPD().getStore().getById(record.data.id);
		formRecord.data._padre = itemSelected
		console.log(itemSelected.data._nombre)
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
		var store = gridLB.store;


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
		
		if (typeof record.data._padre != "undefined" && 
				record.data._padre.data != null &&
				typeof record.data._padre.data != "undefined" ){
			record.data._padre = record.data._padre.data.id;
		}
		if (typeof record.data._antecesor != "undefined" && 
				record.data._antecesor.data != null && 
				typeof record.data._antecesor.data != "undefined" ){
			record.data._antecesor = record.data._antecesor.data.id;
		}
		if (typeof record.data._tipo_item.data != "undefined" ){
			record.data._tipo_item = record.data._tipo_item.data.id;
		}
		var accion = record.data.accion;
		var store = this.getItemStore();
		record.save(
		{	
			success : function(registro) {
//				console.log(record);
//				if (accion == "POST") {
//					store.insert(0, registro);
//				}
//				else {
//					store.remove(record);
//					store.insert(0, registro);
//				}
				store.load({
					params : {
						id : fase.getValue()
					}
				});
				win.close();
			},
			failure : function(record) {
				alert("No se pudo guardar el Item");
			}
			
		});
		
	},
	
	editarItem : function(grid, record) {
		
		if (record.data._estado == "ACTIVO" || record.data._estado == "REVISION"){
			var fase = this.getComboFase();
			console.log("Editar")
			var view = Ext.widget('crearitem');
			view.setTitle('Editar Item');
			view.down('form').loadRecord(record);
			
			var gridLB = this.getGridLB();
			var griditemLB = this.getGriditemLB();
			var gridPD = this.getGridPD();
		var store = gridLB.store;
		
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
			
			
			if (record.data._padre != null && typeof record.data._padre != "undefined" ){
				record.data.padre_nombre = record.data._padre._nombre;
			}
			if (record.data._antecesor != null && typeof record.data._antecesor != "undefined"){
				record.data.antecesor_nombre = record.data._antecesor._nombre;
			}
			
			
			record.data._version = record.data._version + 1;
			record.data.accion = 'PUT';
			record.data._tipo_item_prefijo = record.data._tipo_item._prefijo;
			view.down('form').loadRecord(record);
		}else{
			alert("El item se encuentra en estado: " + record.data._estado) + ".\n Debe estar ACTIVO para modificarlo";
		}
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
		if (record.data._estado == "ACTIVO" || record.data._estado == "REVISION"){
			record.data._estado = "APROBADO"
			record.data._version = record.data._version + 1;
			
		}else{
			alert("El item se encuentra en estado: " + record.data._estado);
		}
		console.log(record)
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
				Ext.example.msg("Item", "Aprobado con exito");
			},
			failure : function(record) {
				alert("No se pudo aprobar el Item");
			}
			
		});
	},
	
	habilitarBotones : function(estado){
		if (estado == "ACTIVO" || estado == "REVISION" ){
			this.getBtnAsignar().setDisabled(false);
			this.getDelete().setDisabled(false);
			this.getAprove().setDisabled(false);
			this.getDeaprove().setDisabled(true);
		}else if (estado == "APROBADO"){
			this.getBtnAsignar().setDisabled(true);
			this.getDelete().setDisabled(true);
			this.getAprove().setDisabled(true);
			this.getDeaprove().setDisabled(false);
		}else if (estado == "BLOQUEADO"){
			this.getBtnAsignar().setDisabled(true);
			this.getDelete().setDisabled(true);
			this.getAprove().setDisabled(true);
			this.getDeaprove().setDisabled(true);
		}
	},
	
	mostrarRecursos: function(grid, record){
		this.habilitarBotones(record.data._estado)
		
		
		var storeUnidadItems = this.getItemUnidadStore();
		storeUnidadItems.load({
			params : {
				_item_id : record.data._item_id
			}
		});
	},
	asignarRecursoItem : function(button){
		var view = Ext.widget('asignarUnidad');
		var itemUnidad = new YAPP.model.ItemUnidad();
		view.down('form').loadRecord(itemUnidad);
		var botonlist = this.getBotonList();
		var win = botonlist.up('grid');
		var grilla = win.down('gridview')
		var itemRecord = grilla.getSelectionModel().getSelection()[0];
		var unidadCombo = this.getUnidad()
		var itemUnidadStore = this.getItemUnidadStore()
		unidadCombo.store.load({
			params : {
				_item_id : itemRecord.data.id
			}
		});
	},
	
	desAsignarRecursoItem  : function(button){
		
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var record = grilla.getSelectionModel().getSelection()[0];
		var store = this.getItemUnidadStore();
		record.destroy({
			success : function(record) {
				Ext.example.msg("Unidad de Trabajo", "Desasiganda");
				store.remove(selection);
			},
			failure : function(record) {
				alert("No se pudo eliminar el Item");
			}
		});
	},
	
	activarItem : function(button) {
		if (confirm("El item pasara a estado \"ACTIVO\" \n¿Está seguro que quiere Desaprobar el Ítem?")){
			var win = button.up('grid');
			var grilla = win.down('gridview')
			var record = grilla.getSelectionModel().getSelection()[0];
			if (record.data._estado == "APROBADO" || record.data._estado == "REVISION"){
				record.data._estado = "ACTIVO"
				record.data._version = record.data._version + 1;
				
			}else{
				alert("El item se encuentra en estado: " + record.data._estado);
			}
			console.log(record)
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
					Ext.example.msg("Item", "Activado con exito");
					habilitarBotones("ACTIVO");
				},
				failure : function(record) {
					alert("No se pudo activar el Item");
				}
				
			});
		}
	},
	
	guardarAsignacion : function(button){
		var botonlist = this.getBotonList();
		var win = botonlist.up('grid');
		var grilla = win.down('gridview')
		var itemRecord = grilla.getSelectionModel().getSelection()[0];
		var fase = this.getComboFase();
		var win = button.up('window');
		var form = win.down('form');
		win.close();
		var record = form.getRecord();
		var values = form.getValues();
		console.log(form)
		record.set(values);
		record.data._item_id= itemRecord.data._item_id
		record.save(
		{	
			success : function(record) {
				if (record.data.accion == "POST") {
					this.getItemUnidadStore().insert(0, record);
				}
			},
			failure : function(record) {
				alert("No se pudo guardar la Unidad de Trabajo");
			}
			
		});
		var storeUnidadItems = this.getItemUnidadStore();
		storeUnidadItems.load({
			params : {
				_item_id : itemRecord.data._item_id
			}
		});
		
	},
});