Ext.define('YAPP.controller.Esquemas', {
	extend: 'Ext.app.Controller',
	
	views: [
		'esquema.List',
		'esquema.Edit',
		'esquema.AtributoList',
		'esquema.AtributoEdit',
		'esquema.EsquemaItemList',
		'esquema.EsquemaItemCreate'
		],
	stores:['Esquemas', 'Fases', 'AtributoEsquema', 'EsquemaItem'],
	models:['Esquema', 'AtributoEsquema' , 'EsquemaItem' ],
	refs : [ {
        selector : 'esquemaslist combobox[name=fasesCombo]',
        ref : 'fasesCombo'
	}, {
    	selector: 'esquemaslist gridview',
    	ref: 'grilla'
	} 
	],
	
	
	
	init:function(){
		console.log('Cargado controller Esquemas');
		this.control({
        
				'esquemaslist button[action=crear]': {
                	click: this.crearEsquema
            	},
            	'esquemaedit button[action=guardar]': {
                    click: this.guardarEsquema
           		},
            	'esquemaslist button[action=borrar]' : {
					click : this.borrarEsquema
				},
				'esquemaslist combobox[name=proyectoCombo]': {
            		change: this.traerFases
            	},
        		'esquemaslist combobox[name=fasesCombo]': {
            		change: this.traerEsquemas	
            	},
            	'esquemaslist': {
            		itemdblclick: this.editarEsquema
            	},
            	'esquemaslist button[action=atributo]':{
            		click : this.verAtributos
            	},
            	'atributosesquemalist button[action=crearAtributo]': {
                	click: this.crearAtributo
	            },
	            'atributoesquemaedit button[action=guardarAtributo]': {
	                click: this.guardarAtributo
	            },
	            'atributosesquemalist':{
					itemdblclick: this.editarAtributo
				},
				'atributosesquemalist button[action=borrarAtributo]':{
					click: this.borrarAtributo
				},
            	'esquemaslist button[action=itemEsquema]' : {
					click : this.itemEsquema
				},
				'esquemaItemList button[action=nuevoItem]':{
					click : this.agregarItemEsquema
				},
				'esquemaItemList button[action=borrarItem]':{
					click : this.eliminarItemEsquema
				}
        });
	},
	
	
	crearEsquema: function(button){
		var view = Ext.widget('esquemaedit');
        var esquema = new YAPP.model.Esquema();
        esquema.data.accion = 'POST';
		view.down('form').loadRecord(esquema);
         
         
	},
	
	guardarEsquema : function(button){
		var win = button.up('window');
		var combo = this.getFasesCombo()
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set('_fase_id', combo.getValue());
		record.set(values);
		win.close();
		if (record.data.accion == "POST")
			this.getEsquemasStore().insert(0, record);
	},
	
	editarEsquema : function(grid, record){
		var view = Ext.widget('esquemaedit');
		view.setTitle('Editar Esquema');
	    view.down('form').loadRecord(record);
	},
	
	borrarEsquema :function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		selection.data.accion = "DELETE"
		this.getEsquemasStore().remove(selection)
	},
	traerFases: function(object, newValue, oldValue, eOpts){
		var combo = this.getFasesCombo();
        var store = this.getFasesStore();
        console.log(object.getValue())
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
	traerEsquemas : function(object, newValue, oldValue, eOpts){
		var combo = this.getFasesCombo();
		var store = this.getStore('Esquemas');
		store.load({
			params: {
				id : combo.getValue()
			}
		});
	},
	
	verAtributos : function(button){
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		esquemaId = selection.data.id;
		
		var store = this.getStore('AtributoEsquema');
		store.load({
			params: {
				id : esquemaId
			}
		});
		
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar atributos de Esquemas',
			xtype : 'atributosesquemalist',
			closable : true
		});

		tabs.setActiveTab(tab);
	},
	
	crearAtributo : function(button){
		var view = Ext.widget('atributoesquemaedit');
    	console.log('Boton crear atributo apretado');
		var atributoEsquema = new YAPP.model.AtributoEsquema();
		atributoEsquema.data._esquema_id = esquemaId;
		atributoEsquema.data.accion = 'POST'
		view.down('form').loadRecord(atributoEsquema);
    },
    
    guardarAtributo: function(button){
    	console.log('Entre a guardar')
    	var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		win.close();
		if (record.data.accion == "POST")
			this.getAtributoEsquemaStore().insert(0, record);
    },
    editarAtributo : function (grid, record) {
	 	var view = Ext.widget('atributoesquemaedit');
		view.setTitle('Editar Tipo Item');
	    view.down('form').loadRecord(record);
 	},
 	borrarAtributo: function(button){
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		selection.data.accion = "DELETE"
		this.getAtributoEsquemaStore().remove(selection)
	},
	
	itemEsquema : function(button){
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		var esquemaId = selection.data.id;
		
		var store = this.getStore('AtributoEsquema');
		store.load({
			params: {
				id : esquemaId
			}
		});
		
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar Items de Esquema',
			xtype : 'esquemaItemList',
			closable : true
		});

		tabs.setActiveTab(tab);
	},
	
	agregarItemEsquema : function(button){
		var view = Ext.widget('esquemaItemCreate');
    	console.log('Boton agregar Item apretado');
		var esquemaItem = new YAPP.model.EsquemaItem();
		esquemaItem.data._esquema_id = esquemaId;
		esquemaItem.data.accion = 'POST'
		view.down('form').loadRecord(esquemaItem);
    },
    
    guardarItemEsquema: function(button){
    	console.log('Entre a guardar')
    	var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		win.close();
		if (record.data.accion == "POST")
			this.getEsquemaItemStore().insert(0, record);
    },
	eliminarItemEsquema : function(button){
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		selection.data.accion = "DELETE"
		this.getAtributoTipoItemStore().remove(selection)
	}

	
});