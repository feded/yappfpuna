Ext.define('YAPP.controller.AdministrarProyectos', {
	extend: 'Ext.app.Controller',
	
	views: [
		'menus.CrearProyecto'
		],
	stores:['Proyectos'],
	models:['Proyecto'],
	
	init:function(){
		console.log('Cargado controller AdministrarProyectos');
	}

});