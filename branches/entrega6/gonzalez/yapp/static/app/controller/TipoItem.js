Ext.define('YAPP.controller.TipoItem', {
	extend : 'Ext.app.Controller',
	
	views: [
		'tipoItem.List',
		'tipoItem.Edit',
		'tipoItem.AtributosList',
		'tipoItem.AtributoEdit'
		
		],
	stores:['TipoItems' , 'AtributoTipoItem' ],
	models:['TipoItem' , 'AtributoTipoItem' ],
	
	refs: 	[
				{
    				selector: 'tipoItemedit textfield[name=_color]',
    				ref: 'colorTexto'
				}
			],
	
	
	init:function(){
		console.log('Cargado controller tipoItem');
		this.control({
            'tipolist button[action=crear]': {
                click: this.crearTipoItem
            },
            'tipoItemedit button[action=guardar]': {
                click: this.guardarTipoItem
            },
            'atributosList button[action=crearAtributo]': {
                click: this.crearAtributo
            },
            'atributoedit button[action=guardar]': {
                click: this.guardarAtributo
            },
            'tipolist': {
            	itemdblclick: this.editarTipoItem
        	},
        	'tipolist actioncolumn':{
                click: this.verAtributos
            },
//            'tipolist button[action=verAtributos]':{
//                click: this.verAtributos
//            },
            'tipolist button[action=borrar]' : {
				click : this.borrarTipoItem
			},
			'atributosList':{
				itemdblclick: this.editarAtributo
			},
			'atributosList button[action=borrar]':{
				click: this.borrarAtributo
			},
			
			'tipoItemedit colorpicker': {
        		select: this.seleccionoColor
            }

        });
	},
	
	seleccionoColor: function(picker, selColor){
		var texto = selColor;
		this.getColorTexto().setValue(texto);
	},
	
	verAtributos : function(grid, view, recordIndex, cellIndex, item, e){
		var tabs = Ext.getCmp('tabPrincipal');
		tipoId = this.getTipoItemsStore().getAt(recordIndex).get('id');
//		console.log(tipoId)
//		this.getAtributoTipoItemStore().clearFilter(true)
//		this.getAtributoTipoItemStore().filter('_tipo_item_id', tipoId);
//		var tab = Ext.getCmpByName('Atributos Tipo Item')
		var tab = tabs.add({
			title : 'Atributos Tipo Item',
			xtype : 'atributosList',
			closable : true
			});
		var store = this.getStore('AtributoTipoItem');
		store.load({
			params:{
				id: tipoId
				}
		});
		
		
		tabs.setActiveTab(tab);
	},
	
	crearAtributo : function(button){
		var view = Ext.widget('atributoedit');
    	console.log('Boton crear atributo apretaRdo');
		var atributoTipoItem = new YAPP.model.AtributoTipoItem();
		atributoTipoItem.data._tipo_item_id = tipoId;
		atributoTipoItem.data.accion = 'POST'
		view.down('form').loadRecord(atributoTipoItem);
    },
    
    guardarAtributo: function(button){
    	console.log('Entre a guardar')
    	var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		if (record.data._opcional == 'on')record.data._opcional = 'true'
		else record.data._opcional = 'false'
		win.close();
		if (record.data.accion == "POST")
			this.getAtributoTipoItemStore().insert(0, record);
    },
    
    guardarTipoItem : function(button) {
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		if (record.data._condicionado == 'on')record.data._condicionado = 'true'
		else record.data._condicionado = 'false' 
		win.close();
		console.log(record.data.accion)
		if (record.data.accion == "POST")
			this.getTipoItemsStore().insert(0, record);
			
	},
    crearTipoItem : function(button){
    	var view = Ext.widget('tipoItemedit');
    	console.log('Boton crear apretaRdo');
		var tipoItem = new YAPP.model.TipoItem();
		tipoItem.data.accion = 'POST';
		view.down('form').loadRecord(tipoItem);
    },
    
  	editarTipoItem: function(grid, record){
		var view = Ext.widget('tipoItemedit');
		view.setTitle('Editar Tipo Item');
        view.down('form').loadRecord(record);
	},
	
	editarAtributo : function (grid, record) {
	 	var view = Ext.widget('atributoedit');
		view.setTitle('Editar Tipo Item');
	    view.down('form').loadRecord(record);
 	},
	
	borrarTipoItem: function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		selection.data.accion = "DELETE"
		this.getTipoItemsStore().remove(selection)
	},
	borrarAtributo: function(button){
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		selection.data.accion = "DELETE"
		this.getAtributoTipoItemStore().remove(selection)
	}

});

