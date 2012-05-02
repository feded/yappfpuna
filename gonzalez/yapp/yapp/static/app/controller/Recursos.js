Ext.define('YAPP.controller.Recursos', {
    extend: 'Ext.app.Controller',

	views: [
		'recurso.ListarRecurso', 'recurso.NuevoRecurso'
		],
	stores:['Recursos'],
	models:['Recurso'],
    init: function() {
        console.log('Recursos');
        this.control({
            	'nuevorecurso button[action=guardar]': {
            		click: this.guardarNuevoRecurso
            	},
            	
            	'listarrecurso button[action=crear]':{
            		click: this.crearRecurso
            	},
        });
    },
    
    guardarNuevoRecurso: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);	
//		console.log(values);
		win.close();
		this.getRecursosStore().insert(0, record);
	},
	
	crearRecurso: function(button){
		var view = Ext.widget('nuevorecurso');
        var recurso = new YAPP.model.Recurso();
        		
		var win = button.up('grid');
		view.down('form').loadRecord(recurso);
	}
});