Ext.define('YAPP.controller.Recursos', {
    extend: 'Ext.app.Controller',

	views: [
		'recurso.ListarRecurso'
		],
	stores:['Recursos'],
	models:['Recurso'],
    init: function() {
        console.log('Recursos');
    }
});