Ext.define('YAPP.controller.AdministrarFases', {
	extend: 'Ext.app.Controller',
	
	views: [
		'fase.ListarFase'
		],
	stores:['Fases'],
	models:['Fase'],
	
	init:function(){
		console.log('Cargado controller AdministrarFases');
		this.control({
				'listarfase button[action=actualizar]': {
                	click: this.actualizarFase
            	}
            	
        });
	},	
	
	actualizarFase: function(){
		console.log('Actualizando Fase');
		this.getFasesStore().load();
	}
});