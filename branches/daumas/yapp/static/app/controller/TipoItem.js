Ext.define('YAPP.controller.TipoItem', {
	extend : 'Ext.app.Controller',
	
	views: [
		'tipoItem.List',
		'tipoItem.Edit',
		],
	stores:['TipoItems'],
	models:['TipoItem'],
	
	init:function(){
		console.log('Cargado controller tipoItem');
		this.control({
            'tipolist button[action=crear]': {
                click: this.crearTipoItem
            },
            'tipoItemedit button[action=guardar]': {
                click: this.guardarTipoItem
            },
        });
	},
	
	adminAtributoTipoItem : function(button){
    	var tabs = Ext.getCmp('tabPrincipal');
    	var tab = tabs.add({
    		title: 'Administrar Atributos - Tipo de Item',
    		xtype: 'AtributoList'
    	});
    	tabs.setActiveTab(tab);
    },
    guardarTipoItem : function(button) {
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
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
    
  

});

