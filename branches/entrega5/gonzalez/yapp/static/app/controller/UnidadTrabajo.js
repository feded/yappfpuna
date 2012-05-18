Ext.define('YAPP.controller.UnidadTrabajo', {
    extend: 'Ext.app.Controller',

	views: [
		'unidadTrabajo.ListarUnidadTrabajo', 'unidadTrabajo.NuevaUnidadTrabajo'
		],
	stores:['UnidadTrabajo'],
	models:['UnidadTrabajo'],
	
    init: function() {
        console.log('Unidad trabajo');
        this.control({
            	'listarunidadtrabajo button[action=crear]':{
            		click: this.crearUnidadTrabajo
            	},
            	'nuevaunidadtrabajo button[action=guardar]':{
            		click: this.guardarNuevaUnidadTrabajo
            	},
        });
    },
    
    crearUnidadTrabajo: function(button){
		var view = Ext.widget('nuevaunidadtrabajo');
        var unidad_trabajo = new YAPP.model.UnidadTrabajo();
        		
		view.down('form').loadRecord(unidad_trabajo);
	},
	
	    
    guardarNuevaUnidadTrabajo: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		win.close();
		this.getUnidadTrabajoStore().insert(0, record);
	},
	
    	
});