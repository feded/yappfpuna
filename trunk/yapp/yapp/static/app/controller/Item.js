Ext.define('YAPP.controller.Item', {
	extend: 'Ext.app.Controller',
	
	views: [
		'item.List',
		'item.Edit'
		],
	stores:['Item', 'Fases', 'TipoItems'],
	models:['Item'],
	
	init:function(){
		console.log('Cargado controller Item');
		this.control({
        
				'itemslist button[action=crear]': {
                	click: this.crearItem
            	},
            	 'itemedit button[action=guardar]': {
                	click: this.guardarItem
           		 },
            	
            	'itemslist button[action=borrar]' : {
					click : this.borrarItem
				},
            	
            	'itemslist': {
            		itemdblclick: this.editarItem
            	},
            	
        });
	},
	
	
	crearItem: function(button){
		console.log('hola');
		var view = Ext.widget('itemedit');
        var item = new YAPP.model.Item();
		
		item.data._version = 1;
		item.data._estado = 'ACTIVO';
		item.data.accion = 'POST';
		view.down('form').loadRecord(item);
         
         
	},
	
	guardarItem : function(button){
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
//			var fecha = new Ext.Date();
//			fecha = Ext.Date.format(fecha, 'd-m-Y');
//			record.set('_fecha_inicio')
			this.getTipoItemsStore().insert(0, record);
	},
	
	editarItem : function(button){
		var view = Ext.widget('itemedit');
		view.setTitle('Editar Item');
	    view.down('form').loadRecord(record);
	},
	
	borrarItem: function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		selection.data.accion = "DELETE"
		this.getTipoItemsStore().remove(selection)
	},
	

	
});