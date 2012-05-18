Ext.define('YAPP.controller.UnidadTrabajo', {
    extend: 'Ext.app.Controller',

	views: [
		'unidadTrabajo.ListarUnidadTrabajo'
		],
	stores:['UnidadTrabajo'],
	models:['UnidadTrabajo'],
	
    init: function() {
        console.log('Unidad trabajo');
//        this.control({
//            	
//        });
    }
    	
});