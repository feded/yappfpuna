Ext.define('YAPP.controller.Recursos', {
    extend: 'Ext.app.Controller',

	views: [
		'recurso.ListarRecurso', 'recurso.NuevoRecurso', 'recurso.EditarRecurso'
		],
	stores:['Recursos'],
	models:['Recurso'],
	
	refs: [{
    			selector: 'editarrecurso numberfield[name=_costo_hora]',
    			ref: 'costoHora'
			},
			{
    			selector: 'editarrecurso numberfield[name=_costo_cantidad]',
    			ref: 'costoCantidad'
			},
			{
    			selector: 'editarrecurso numberfield[name=_cantidad]',
    			ref: 'cantidad'
			}
	],
    init: function() {
        console.log('Recursos');
        this.control({
            	'nuevorecurso button[action=guardar]': {
            		click: this.guardarNuevoRecurso
            	},
            	
            	'listarrecurso button[action=crear]':{
            		click: this.crearRecurso
            	},
            	
            	'listarrecurso':{
            		itemdblclick: this.editarRecurso
            	},
            	
            	'editarrecurso button[action=guardar]':{
            		click: this.guardarEditarRecurso
            	},
            	'listarrecurso button[action=borrar]': {
            		click: this.borrarRecurso
            	},
            	
        });
    },
    
    guardarNuevoRecurso: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		record.set('tipo_nombre',record.data._tipo);
		console.log(record);
		win.close();
		this.getRecursosStore().insert(0, record);
	},
	
	crearRecurso: function(button){
		var view = Ext.widget('nuevorecurso');
        var recurso = new YAPP.model.Recurso();
        		
		var win = button.up('grid');
		view.down('form').loadRecord(recurso);
	},
	
	editarRecurso: function(grid, record){
		var view = Ext.widget('editarrecurso');
        view.down('form').loadRecord(record);
        
        if (record.data.tipo_nombre == "Persona")
        {
        	var costo_hora = this.getCostoHora();
        	costo_hora.setVisible(true);	
        }else{
        	var costo_cantidad = this.getCostoCantidad();
        	costo_cantidad.setVisible(true);
        	var cantidad = this.getCantidad();
        	cantidad.setVisible(true);
        }
	},
	
	guardarEditarRecurso: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		win.close();
	},
	
	borrarRecurso: function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		this.getRecursosStore().remove(selection)
	},
	
	
});