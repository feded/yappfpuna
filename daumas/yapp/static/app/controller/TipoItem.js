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
            'tipolist button[action=borrar]' : {
				click : this.borrarTipoItem
			},

        });
	},
	
	verAtributos : function(button){
		var tabs = Ext.getCmp('tabPrincipal');
//		var store = this.getTipoItemsStore()
//		console.log(record);
//		console.log(this.getAtributoTipoItemsStore().load({params:{id:record}}))
		
			
		var tab = tabs.add({
			title : 'Atributos Tipo Item',
			xtype : 'atributosList'
		});
		
		tabs.setActiveTab(tab);
	},
	
	crearAtributo : function(button){
		var view = Ext.widget('atributoedit');
    	console.log('Boton crear atributo apretaRdo');
		var tipoItem = new YAPP.model.AtributoTipoItem();
		tipoItem.data.accion = "POST";
		view.down('form').loadRecord(tipoItem);
    },
    
    guardarAtributo: function(button){
    	var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		if (record.data._opcional == 'on')record.data._opcional = 'true'
		else record.data._opcional = 'false' 
		console.log(record);
		win.close();
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
		console.log(record);
		win.close();
		this.getTipoItemsStore().insert(0, record);
			
	},
    crearTipoItem : function(button){
    	var view = Ext.widget('tipoItemedit');
    	console.log('Boton crear apretaRdo');
		var tipoItem = new YAPP.model.TipoItem();
		tipoItem.data.accion = "POST";
		view.down('form').loadRecord(tipoItem);
    },
    
  	editarTipoItem: function(grid, record){
//		var store = this.getTipoItemsStore()
//		console.log(record);
//		this.getAtributoTipoItemStore().load({params:{id:record.data.id}})
//  		this.getAtributoTipoItemStore().each(function(record)  
//		{  
//		 console.log(record); 
//		},this)
  		
  		
		var view = Ext.widget('tipoItemedit');
		view.setTitle('Editar Tipo Item');
		record.data.accion = "PUT";
//		var fecha = new Date();
//		var hoy = Ext.Date.format(fecha,'Y-m-d, g:i a');
//		record.data._fecha_modificacion = hoy;
		
        view.down('form').loadRecord(record);
	},
	
	borrarTipoItem: function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		selection.data.accion = "DELETE"
		this.getTipoItemsStore().remove(selection)
	},

});

