Ext.define('YAPP.controller.AdministrarFases', {
	extend: 'Ext.app.Controller',
	
	views: [
		'fase.ListarFase', 'fase.NuevaFase'
		],
	stores:['Fases'],
	models:['Fase'],
	
	init:function(){
		console.log('Cargado controller AdministrarFases');
		this.control({
//				'listarfase button[action=actualizar]': {
//                	click: this.actualizarFase
//            	},
            	'listarfase combobox': {
            		change: this.traerFase
            	},
            	
            	'listarfase button[action=crear]':{
            		click: this.crearFase
            	},
            	
            	'nuevafase button[action=guardar]': {
            		click: this.guardarNuevaFase
            	},
            	
        });
	},	
	
//	actualizarFase: function(){
//		console.log('Actualizando Fase');
//		this.getFasesStore().load();
//	},
//	
	traerFase: function(combobox){
//		console.log(combobox.getValue());
		var store = this.getStore('Fases');
		store.load({
			params: {
				id : combobox.getValue()
			}
		});
	},
	crearFase: function(button){
		var view = Ext.widget('nuevafase');
        var fase = new YAPP.model.Fase();
        		
		var win = button.up('grid');
		var cb = win.down('combobox');
		
//		console.log(cb.getValue());
		fase.data._proyecto_id = cb.getValue();  
//		var fecha = new Date();
//		var hoy = Ext.Date.format(fecha,'Y-m-d, g:i a');
//		proyecto.data._fecha_creacion = hoy;
//		proyecto.data._fecha_modificacion = hoy;
//		
		view.down('form').loadRecord(fase);
	},
	
	guardarNuevaFase: function(button){
		console.log('guardar fase');
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);	
		win.close();
		this.getFasesStore().insert(0, record);
	}
	
});