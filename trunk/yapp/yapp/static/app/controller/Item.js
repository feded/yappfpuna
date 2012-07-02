Ext.define('YAPP.controller.Item', {
	extend : 'Ext.app.Controller',
	
	views : [  'item.List',  'item.CrearItem', 'item.RevertirItem', 'item_atributo.Edit',
	 'item_unidad.List', 'item_unidad.Edit', 'item.RevivirItem', 'item_atributo.List', 'item_atributo.Agregar', 
	 'item_atributo.Archivo', 'item_atributo.ListarArchivo'],
	stores : [ 'Item', 'Fases', 'TipoItems', 'ItemUnidad', 'ItemAtributo', 'AtributoTipoItem', 'Archivos' ],
	models : [ 'Item' , 'ItemUnidad', 'ItemAtributo' ],
	
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
	},{
		selector : 'revivirItems gridpanel[name=gridEliminados]',
		ref : 'gridEliminados'
	},{
		selector : 'revivirItems gridpanel[name=gridARevivir]',
		ref : 'gridARevivir'
	},
	
	{
		selector : 'revivirItems gridpanel[name=gridItem]',
		ref : 'gridDetalleItem'
	},
	{
		selector : 'revertirItems gridpanel[name=gridVersionesItem]',
		ref : 'gridVersionesItem'
	},
	
	 {
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
	} , {
		selector : 'atributositemlist button[name=atributos]',
		ref : 'btnAtributosItemList'
	} ,{
		selector : 'listararchivo button[name=btnListarArchivos]',
		ref : 'btnListarArchivos'
	} ,
	{
		selector : 'listararchivo button[name=btnEliminarArchivo]',
		ref : 'btnEliminarArchivo'
	} ,
	{
		selector : 'itemslist button[name=borrar]',
		ref : 'delete'
	} , {
		selector : 'itemunidadlist combobox[name=_unidad_id]',
		ref : 'unidad'
	} , {
		selector : 'itemslist button[name=crear]',
		ref : 'botonList'
	} , {
		selector : 'itemslist button[name=revivir]',
		ref : 'revivir'
	} , {
		selector : 'itemslist button[name=versiones]',
		ref : 'versiones'
	}, {
		selector : 'agregaratributo combobox[name=_atributo_id]',
		ref : 'atributoCombo'
	}, {
		selector: 'itemslist gridview',
		ref: 'grilla'
	},
	{
		selector: 'listararchivo gridview',
		ref: 'grilla2'
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
				itemclick : this.mostrarDatos
			},
			
			'itemsabm':{
        		'tabSeleccionada' : this.onRender
        	},
			
			'atributositemlist' : {
				itemdblclick : this.editarAtributo,
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
			'itemslist button[action=revivir]' : {
				click : this.revivirItemView
			},
			
			'revivirItems button[action=revivirItems]' : {
				click : this.botonRevivirApretado
			},
			'revivirItems gridpanel[name=gridEliminados]' : {
				select : this.agregarDetalle,
				deselect : this.sacarDetalle,
			},
			'revivirItems gridpanel[name=gridARevivir]': {
				drop : this.sacarDetalle,
			},
			'revertirItems button[action=revertirItems]' : {
				click : this.revertirItem
			},
			
			'itemslist button[action=versiones]' : {
				click : this.verVersiones
			},
			
			'itemunidadlist button[action=desasignar]' : {
				click : this.desAsignarRecursoItem
			},
			'itemunidadlist button[action=guardar]' : {
				click : this.guardarAsignacion
			},
			'revertirItems gridpanel[name=gridVersionesItem]' :{
				itemclick : this.habilitarBoton
			},
			'atributositemlist button[action=atributos]' :{
				click : this.asignarAtributos
			
			},
			'agregaratributo button[action=guardar]' : {
				click : this.guardarValorAtributo
			},
			
			'asignarAtributo button[action=guardar]' : {
				click : this.guardarValorAtributo
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
			'crearitem button[action=eliminar_antecesor]' : {
				click : this.eliminarRelacionAntecesor
			},
			'crearitem button[action=eliminar_padre]' : {
				click : this.eliminarRelacionPadre
			},
			'viewport combobox[name=fases]' : {
				change : this.changeFase
			},
			'listararchivo button[action=archivos]':{
				click: this.archivos
			},
			
			'archivo button[action=adjuntar]' :{
				click: this.adjuntar
			},
			
			'listararchivo' :{
				itemdblclick  : this.download,
				itemclick: this.habilitarEliminarArchivo
			},
			'listararchivo button[action=eliminarArchivo]':{
				click: this.eliminarArchivo
			},
		});
	},
	
	habilitarEliminarArchivo: function(){
		var botonlist = this.getBotonList();
		var win = botonlist.up('grid');
		var grilla = win.down('gridview')
		var itemRecord = grilla.getSelectionModel().getSelection()[0];
		if(itemRecord.data._estado == 'ACTIVO' || itemRecord.data._estado == 'REVISION'){
			this.getBtnEliminarArchivo().setDisabled(false);
		}
	},
	
	eliminarArchivo: function(button){
		var grid = button.up('grid');
		var grilla = grid.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		
		var g = this.getGrilla();
		var item = g.getSelectionModel().getSelection()[0];
		var me = this;
		selection.data._item_id = item.data.id
		selection.destroy({
//			params:{
//				id_item : item.data.id
//			},
			success: function(fase){
				me.getArchivosStore().remove(selection);
				Ext.example.msg("YAPP", "Se elimino con éxito el archivo");
			},
			
			failure: function(fase){
				Ext.Msg.alert("No se elimino el archivo");
			}
		});
		
	},
	
	download:function(){
		var g2 = this.getGrilla2();
		var archivo = g2.getSelectionModel().getSelection()[0];
		
		var form = Ext.create('Ext.form.Panel', {
			fileUpload: true,
			method: 'post',
            items: [{
				xtype: 'filefield',
			}]
		});
	
		form.submit({
			url: '/download',
			clientValidation: true,
			params:{
				archivo_id : archivo.data.id
			}
		});
		
	},
	
	
	
	onRender : function(item_id) {
		var fase = this.getComboFase().getValue();
		var itemStore = this.getItemStore();
		var store = this.getFasesStore();
		var object = this.getProyectos().getValue();
		var me = this
		if (object == '' || fase == '') {
			return;
		}
		//itemStore.store = store;
		itemStore.load({
			params : {
				id : fase
			},
			callback: function(records, operation, success) {
				if (typeof item_id!="undefined" && !isNaN(item_id)){
					var posicion = itemStore.findExact('id', item_id)
					var grid = me.getGrilla();
					var record =  records[posicion];
					grid.fireEvent('itemclick', grid, record);
				}else{
					var storeUnidadItems = me.getItemUnidadStore();
					storeUnidadItems.load();
					var storeAtributoItems = me.getItemAtributoStore();
					storeAtributoItems.load();
					var storeArchivosItems = me.getArchivosStore();
					storeArchivosItems.load();
				}
			}
		});
		
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
		formRecord.data.padre_nombre = itemSelected.data._nombre
		win.down('form').loadRecord(formRecord); 
	},
	
	eliminarRelacionPadre: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var formRecord = form.getRecord();
		var values = form.getValues();
		formRecord.set(values);
		formRecord.data._padre = null;
		formRecord.data.padre_nombre = ""
		win.down('form').loadRecord(formRecord);
	},
	
	eliminarRelacionAntecesor: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var formRecord = form.getRecord();
		var values = form.getValues();
		formRecord.set(values);
		formRecord.data._antecesor = null
		formRecord.data.antecesor_nombre = ""
		win.down('form').loadRecord(formRecord);
	},
	
	crearItem : function(button) {
		
		
		var view = Ext.widget('crearitem');
		var item = new YAPP.model.Item();
		var fase = this.getComboFase();
			
		var gridLB = this.getGridLB();
		var griditemLB = this.getGriditemLB();
		var gridPD = this.getGridPD();
		var gridTipo = this.getGridTipo();
		
		gridTipo.store.load({
			params : {
				id_fase : fase.getValue()
			},
		});
		
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
	
	setearPadresTipoAntecesor : function (record){
		if (record.data._padre!= null && typeof record.data._padre != "undefined" ){
			if(record.data._padre.data != null && typeof record.data._padre.data != "undefined" ){
				posible = record.data._padre.data._id;
				if (typeof posible === "undefined"){
					posible = record.data._padre.data.id;
				}
				record.data._padre = posible
			}else if (record.data._padre._id != null && typeof record.data._padre._id != "undefined"){
				record.data._padre = record.data._padre._id;
			}
			
		}
		if (record.data._antecesor!= null  && typeof record.data._antecesor != "undefined"  ){
			if(record.data._antecesor.data != null && typeof record.data._antecesor.data != "undefined" ){
				posible = record.data._antecesor.data._id;
				if (typeof posible === "undefined"){
					posible = record.data._antecesor.data.id;
				}
				record.data._antecesor = posible
			}else if (record.data._antecesor._id != null && typeof record.data._antecesor._id != "undefined"){
				record.data._antecesor = record.data._antecesor._id;
			}
			
		}
		if (typeof record.data._tipo_item.data != "undefined" ){
			var id = record.data._tipo_item.data.id;
			record.data._tipo_item = record.data._tipo_item.data;
			record.data._tipo_item._id = id; 
		}
	},
	
	guardarItem : function(button) {
		var fase = this.getComboFase();
		var win = button.up('window');
		var form = win.down('form');
		if(!form.getForm().isValid()){
			Ext.example.msg("Item", "Complete correctamente el formulario");
			return
		}
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		if (record.data._condicionado == 'on')
			record.data._condicionado = 'true'
		else
			record.data._condicionado = 'false'
		this.setearPadresTipoAntecesor(record);
		
		var accion = record.data.accion;
		var me = this;
		var store = this.getItemStore();
		record.save(
		{	
			params : {
				actualizar : "true"
			},
			success : function(registro) {
				Ext.example.msg("Item", "Guardado con exito");
				store.load({
					params : {
						id : fase.getValue(),
					}
				});
				win.close();
				me.onRender(registro.data.id);
			},
			failure : function(record) {
				Ext.Msg.alert("No se pudo guardar el Item");
			}
			
		});
		
	},
	
	editarItem : function(grid, record) {
		
		if (record.data._estado == "ACTIVO" || record.data._estado == "REVISION"){
			var fase = this.getComboFase();
			var view = Ext.widget('crearitem');
			view.setTitle('Editar Item');
			view.down('form').loadRecord(record);
			
			var gridLB = this.getGridLB();
			var griditemLB = this.getGriditemLB();
			var gridPD = this.getGridPD();
			var store = gridLB.store;
			var gridTipo = this.getGridTipo();
		
			gridTipo.store.load({
				params : {
					id_proyecto : this.getProyectos().getValue()
				},
			});
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
			Ext.Msg.alert("El item se encuentra en estado: " + record.data._estado) + ".\n Debe estar ACTIVO para modificarlo";
		}
	},

	
	borrarItem : function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var record = grilla.getSelectionModel().getSelection()[0];
		var store = this.getItemStore();
		var me = this
		record.destroy({
			success : function(linea_base) {
				Ext.example.msg("Item", "Eliminado con exito");
				store.remove(record);
				me.onRender();
			},
			failure : function(linea_base) {
				Ext.Msg.alert("No se pudo eliminar el Item");
			}
		});
		
	},
	
	aprobarItem : function(button) {
		var fase = this.getComboFase();
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var record = grilla.getSelectionModel().getSelection()[0];
		var me = this
		
		if (record.data._estado == "ACTIVO" || record.data._estado == "REVISION"){
			var faseStore = new YAPP.store.Fases().load({
				params : {
					fase_id : fase.getValue(),
					id : this.getProyectos().getValue()
				},
				callback : function(records, operation, success) {
					faseAntecesora = records[0]
					if (!(typeof faseAntecesora == 'undefined' || faseAntecesora == "" || faseAntecesora == null)) {				
						if (typeof record.data._antecesor_item_id === "undefined" ||
							 record.data._antecesor_item_id == "" ||
							 record.data._antecesor_item_id == null){
							Ext.Msg.alert("El item no tiene antecesor");
							
						}
					}else{
						record.data._estado = "APROBADO"
						record.data._version = record.data._version + 1;
						me.setearPadresTipoAntecesor(record);
						var store = me.getItemStore();
						record.save(
						{	
							success : function(record) {
								store.load({
									params : {
										id : fase.getValue()
									}
								});
								Ext.example.msg("Item", "Aprobado con exito");
								me.onRender(record.data.id)
								//habilitarBotones("APROBADO");
							},
							failure : function(record) {
								Ext.Msg.alert("No se pudo aprobar el Item");
							}
							
						});
						//me.habilitarBotones("");
					}
					
				}
			});
			
			
		}else{
			Ext.Msg.alert("El item se encuentra en estado: " + record.data._estado);
		}
		
	},
	
	habilitarBotones : function(estado){
		if (estado == "ACTIVO" || estado == "REVISION" ){
			this.getBtnAtributosItemList().setDisabled(false);
			this.getBtnAsignar().setDisabled(true);
			this.getUnidad().setDisabled(false);
			this.getDelete().setDisabled(false);
			this.getAprove().setDisabled(false);
			this.getDeaprove().setDisabled(true);
			this.getVersiones().setDisabled(false);
			this.getBtnListarArchivos().setDisabled(false);
		}else if (estado == "APROBADO"){
			this.getBtnAtributosItemList().setDisabled(true);
			this.getBtnAsignar().setDisabled(true);
			this.getUnidad().setDisabled(true);
			this.getDelete().setDisabled(true);
			this.getAprove().setDisabled(true);
			this.getDeaprove().setDisabled(false);
			this.getVersiones().setDisabled(false);
			this.getBtnListarArchivos().setDisabled(true);
			this.getBtnEliminarArchivo().setDisabled(true);
		}else if (estado == "BLOQUEADO"){
			this.getBtnAtributosItemList().setDisabled(true);
			this.getBtnAsignar().setDisabled(true);
			this.getUnidad().setDisabled(true);
			this.getDelete().setDisabled(true);
			this.getAprove().setDisabled(true);
			this.getDeaprove().setDisabled(true);
			this.getVersiones().setDisabled(true);
			this.getBtnListarArchivos().setDisabled(true);
			this.getBtnEliminarArchivo().setDisabled(true);
		}else{
			this.getBtnAtributosItemList().setDisabled(true);
			this.getBtnAsignar().setDisabled(true);
			this.getUnidad().setDisabled(true);
			this.getDelete().setDisabled(true);
			this.getAprove().setDisabled(true);
			this.getDeaprove().setDisabled(true);
			this.getVersiones().setDisabled(true);
			this.getBtnListarArchivos().setDisabled(true);
			this.getBtnEliminarArchivo().setDisabled(true);
		}
	},
	
	mostrarDatos: function(grid,record){
		this.mostrarRecursos(grid, record);
		this.mostrarAtributos(grid, record);
		this.habilitarBotones(record.data._estado);
		this.mostarUnidades(grid, record);
		this.mostrarArchivos(grid, record);
		grid.getSelectionModel().select(record, false, false)
	},
	
	mostrarArchivos: function(grid, record){
		var storeArchivos = this.getArchivosStore();
		storeArchivos.load({
			params : {
				_item_id : record.data.id
			}
		});
	},
	
	mostrarAtributos: function(grid, record){
		var storeAtributoItems = this.getItemAtributoStore();
		storeAtributoItems.load({
			params : {
				_item_id : record.data.id
			}
		});
	},
	
	mostrarRecursos: function(grid, record){
		var storeUnidadItems = this.getItemUnidadStore();
		storeUnidadItems.load({
			params : {
				_item_id : record.data.id
			}
		});
	},
	mostarUnidades : function(grid, record){
		var unidadCombo = this.getUnidad()
		var itemUnidadStore = this.getItemUnidadStore()
		unidadCombo.store.load({
			params : {
				_item_id : record.data.id
			},
			callback: function(records, operation, success) {
					if (Ext.typeOf(unidadCombo.getPicker().loadMask) !== "boolean") {
				        unidadCombo.getPicker().loadMask.hide();
				    }
				}
		});
	},
	
	desAsignarRecursoItem  : function(button){
		var botonlist = this.getBotonList();
		var win = botonlist.up('grid');
		var grilla = win.down('gridview')
		var itemRecord = grilla.getSelectionModel().getSelection()[0];
		var ItemStore = this.getItemStore()
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var record = grilla.getSelectionModel().getSelection()[0];
		var store = this.getItemUnidadStore();
		var fase = this.getComboFase();
		
		this.setearPadresTipoAntecesor(itemRecord);
		itemRecord.data._version = itemRecord.data._version + 1 
		var storeUnidadItems = this.getItemUnidadStore();
		var store = this.getItemStore();
		var me = this
		itemRecord.save({
			success : function(nuevoItemRecord){
				itemRecord = nuevoItemRecord
				record.data._item_id= nuevoItemRecord.data.id
				record.destroy({
					success : function(rec) {
						Ext.example.msg("Unidad de Trabajo", "Desasiganda");
						store.remove(record);
						me.onRender(nuevoItemRecord.data._id);
					},
					failure : function(rec) {
						Ext.Msg.alert("No se pudo Desasinar la Unidad");
					}
				});
				
				ItemStore.load({
					params : {
						id : fase.getValue()
					}
				});
			},
			failure : function(nuevoItemRecord){
				Ext.Msg.alert("No se pudo guardar la Unidad de Trabajo");
			}
		})
		
	
		
	},
	
	activarItem : function(button) {
		Ext.Msg.confirm("Items","El ítem pasara a estado \"ACTIVO\" \n ¿Está seguro que quiere Desaprobar el Ítem?",function(boton){
			if (boton === 'yes'){
				var win = button.up('grid');
				var grilla = win.down('gridview')
				var record = grilla.getSelectionModel().getSelection()[0];
				if (record.data._estado == "APROBADO" || record.data._estado == "REVISION"){
					record.data._estado = "ACTIVO"
					record.data._version = record.data._version + 1;
					
				}else{
					Ext.Msg.alert("El item se encuentra en estado: " + record.data._estado);
				}
				this.setearPadresTipoAntecesor(record);
				var store = this.getItemStore();
				var fase = this.getComboFase();
				var me = this;
				record.save(
				{	
					success : function(record) {
						
						store.load({
							params : {
								id : fase.getValue()
							}
						});
						Ext.example.msg("Item", "Activado con exito");
						me.onRender(record.data.id)
					},
					failure : function(record) {
						Ext.Msg.alert("No se pudo activar el Item");
					}
					
				});
				this.habilitarBotones("");
			}
		}, this)
	},
	
	guardarAsignacion : function(button){
		var botonlist = this.getBotonList();
		var win = botonlist.up('grid');
		var grilla = win.down('gridview')
		var itemRecord = grilla.getSelectionModel().getSelection()[0];
		var fase = this.getComboFase();
		var unidadId = this.getUnidad().getValue();
		var record = new YAPP.model.ItemUnidad();
		record.data._unidad_id = unidadId;
		this.setearPadresTipoAntecesor(itemRecord);
		itemRecord.data._version = itemRecord.data._version + 1 
		var storeUnidadItems = this.getItemUnidadStore();
		var store = this.getItemStore();
		var me = this
		itemRecord.save({
			success : function(nuevoItemRecord){
				itemRecord = nuevoItemRecord
				record.data._item_id= nuevoItemRecord.data.id
				record.save(
				{	
					success : function(record) {
						Ext.example.msg("Unidad de Trabajo", "Agregada con exito");
						me.onRender(nuevoItemRecord.data.id);
					},
					failure : function(record) {
						Ext.Msg.alert("No se pudo guardar la Unidad de Trabajo");
					}
					
				});
				
				store.load({
					params : {
						id : fase.getValue()
					}
				});
			},
			failure : function(nuevoItemRecord){
				Ext.Msg.alert("No se pudo guardar la Unidad de Trabajo");
			}
		})
		
		
	},
	
	
	
	revivirItemView : function(button){
	
		var fase = this.getComboFase();
		var view = Ext.widget('revivirItems');
		view.setTitle('Revivir Items');
		var store = this.getGridEliminados().getStore();
		store.load({
			params : {
				id : fase.getValue(),
				tipo : "ELIMINADO"
			}
		});
		
	},
	
	botonRevivirApretado : function(button) {
		var win = button.up('window');
		var grid2 = this.getGridARevivir();
		if (grid2.store.count() == 0) {
			Ext.Msg.alert("Seleccione al menos un item para revivir");
			return;
		}
		var fase = this.getComboFase();
		var items = grid2.store.getRange();
		
		var store = this.getItemStore();
		var me = this
		for (record in items){
			record = items[record]
			record.data._estado = "REVISION";
			record.data._version = record.data._version + 1 
			record.save(
			{	
				params: {
					actualizar : "true",
					rev: "true"
				},
				success : function(registro) {
					store.load({
						params : {
							id : fase.getValue()
						}
					});
					Ext.example.msg("Item", "Revivido con exito");
					me.onRender(registro.data.id)
				},
				failure : function(record) {
					Ext.Msg.alert("No se pudo revivir el Item: " + record.data._nombre);
				}
				
			});
		}
		
		win.close();
		
		
	},
	
 	agregarDetalle : function(grid, record){
		var gridDetallesItems = this.getGridDetalleItem();
		var store = gridDetallesItems.store;
		store.add(record);
 	},
 	
 	sacarDetalle : function(grid, record){
		var gridDetallesItems = this.getGridDetalleItem();
		var store = gridDetallesItems.store;
		store.remove(record);
 	},
	
	verVersiones : function(button){
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var record = grilla.getSelectionModel().getSelection()[0];
		var fase = this.getComboFase();
		var view = Ext.widget('revertirItems');
		view.setTitle('Revertir Item');
		var store = this.getGridVersionesItem().getStore();
		store.load({
			params : {
				id : fase.getValue(),
				tipo : "VERSIONES",
				item_id : record.data._item_id
			}
		});
		
	}, 
	habilitarBoton : function(grid, record){
		var win = grid.up('window');
		win.down('#revertirItems').setDisabled(false);
 	},
 	
 	revertirItem : function(button){
 		var fase = this.getComboFase();
		var win = button.up('window');
		var grilla = win.down('gridview')
		var record = grilla.getSelectionModel().getSelection()[0];
		var fase = this.getComboFase();
		var store = this.getItemStore();
		var recordActual = store.getAt(
			store.findBy(
				function(rec, id){
					if (rec.data._item_id == record.data._item_id){
						return rec
					}		
				}
			)
		);
		var versionActual = recordActual.data._version;
		recordActual = record;
		recordActual.data._version = versionActual +1;
		recordActual.data._estado = "REVISION";
		var me = this
		recordActual.save(
		{	
			params: {
				actualizar:"true",
				rev: "true"
			},
			success : function(registro) {
				store.load({
					params : {
						id : fase.getValue()
					}
				});
				win.close();
				Ext.example.msg("Item", "Revertido con exito");
				me.onRender(registro.data.id);
			},
			failure : function(record) {
				Ext.Msg.alert("No se pudo guardar el Item");
			}
			
		});
		
	},
	
	asignarAtributos : function (button){
		var view = Ext.widget('agregaratributo');
		var itemAtributo = new YAPP.model.ItemAtributo();
		view.down('form').loadRecord(itemAtributo);
		var botonlist = this.getBotonList();
		var win = botonlist.up('grid');
		var grilla = win.down('gridview')
		var itemRecord = grilla.getSelectionModel().getSelection()[0];
		var atributosCombo = this.getAtributoCombo();
		atributosCombo.store.load({
			params : {
				_item_id : itemRecord.data._item_id,
				_no_definidos : true
			}
		});
	}, 
	
	editarAtributo :  function(grid, record) {
		var view = Ext.widget('asignarAtributo');
		var itemAtributo = new YAPP.model.ItemAtributo();
		form = view.down('form');
		form.loadRecord(record)
		var botonlist = this.getBotonList();
		var win = botonlist.up('grid');
		var grilla = win.down('gridview')
		var itemRecord = grilla.getSelectionModel().getSelection()[0];
		var atributosCombo = this.getAtributoCombo();
		//var itemAtributoStore = this.getAtributoTipoItemStore();
//		atributosCombo.store.load({
//			params : {
//				
//				_item_id : itemRecord.data._item_id,
//				_no_definidos : true
//			}
//		});
		
	},
	
	guardarValorAtributo : function(button){
		var botonlist = this.getBotonList();
		var win = botonlist.up('grid');
		var grilla = win.down('gridview')
		var itemRecord = grilla.getSelectionModel().getSelection()[0];
		var fase = this.getComboFase();
		var win = button.up('window');
		var form = win.down('form');
		win.close();
		var record = new YAPP.model.ItemAtributo();
		var recordForm = form.getRecord();
		var values = form.getValues();
		recordForm.set(values)
		record.set(values);
		record.data._atributo_id = recordForm.data._atributo_id 
		this.setearPadresTipoAntecesor(itemRecord);
		itemRecord.data._version = itemRecord.data._version + 1 
		var storeAtributosItems = this.getItemAtributoStore();
		var store = this.getItemStore();
		var me = this;
		itemRecord.save({
			success : function(nuevoItemRecord){
				itemRecord = nuevoItemRecord
				record.data._item_id= nuevoItemRecord.data.id
				record.save(
				{	
					success : function(record) {
						//storeAtributosItems.insert(0, record);
						Ext.example.msg("Atributo", "Guardado con exito");
						me.onRender(nuevoItemRecord.data.id);
					},
					failure : function(record) {
						Ext.Msg.alert("No se pudo guardar el Atributo");
					}
					
				});
				
			},
			failure : function(nuevoItemRecord){
				Ext.Msg.alert("No se pudo guardar el Atributo");
			}
		})
		
	},
	
	archivos: function(){
		var view = Ext.widget('archivo');		
	},

	
	adjuntar: function(button){
		var win = button.up('window');
		var form = win.down('form');
		
		var g = this.getGrilla();
		var item = g.getSelectionModel().getSelection()[0];
		item.data._version = item.data._version +1; 
		var me = this;
		item.save({
			success : function(nuevoItemRecord){
				item = nuevoItemRecord
				form.submit({
					url: '/upload',
					clientValidation: true,
					params:{
						id_item : nuevoItemRecord.data.id
					},
					success : function() {
						Ext.example.msg("YAPP", "Archivo subido correctamente");
						win.close();
						me.onRender(nuevoItemRecord.data.id)
					},
					failure : function() {
						Ext.Msg.alert('No se pudo alzar el archivo');
					}
				});
				
			},
			failure : function(nuevoItemRecord){
				Ext.Msg.alert("No se pudo guardar el Atributo");
			}
		})
		
	},
	
});