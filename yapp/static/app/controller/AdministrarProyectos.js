Ext.define('YAPP.controller.AdministrarProyectos', {
	extend: 'Ext.app.Controller',
	
	views: [
		'proyecto.ListarProyecto',
		'proyecto.NuevoProyecto',
		'proyecto.EditarProyecto'
		],
	stores:['Proyectos'],
	models:['Proyecto'],
	
	init:function(){
		console.log('Cargado controller AdministrarProyectos');
		this.control({
//            'listarproyecto': {
//                selectionchange: this.habilitarEliminar
//            },
        
				'listarproyecto button[action=crear]': {
                	click: this.crearProyecto
            	},
            	
            	'listarproyecto button[action=borrar]' : {
					click : this.borrarProyecto
				},
            	
            	'listarproyecto': {
                	itemdblclick: this.editarProyecto
            	},
            	'nuevoproyecto button[action=guardar]': {
            		click: this.guardarNuevoProyecto
            	},
            	
            	'editarproyecto button[action=guardar]': {
            		click: this.guardarEditarProyecto
            	}
            	
        });
	},
	
	//habilitarEliminar: function(){
		//var tool = grid.down('toolbar');
		//console.log('habilitando eliminar');
		//grid.down('#delete').setDisabled(false);
		
	//},
	
	crearProyecto: function(){
		var view = Ext.widget('nuevoproyecto');
		//view.setTitle('Nuevo proyecto');
        var proyecto = new YAPP.model.Proyecto();
		
		proyecto.data._estado = "Elaboración";
		var fecha = new Date();
		var hoy = Ext.Date.format(fecha,'Y-m-d, g:i a');
		proyecto.data._fecha_creacion = hoy;
		proyecto.data._fecha_modificacion = hoy;
		
		view.down('form').loadRecord(proyecto);
         
         
         
	},
	
	editarProyecto: function(grid, record){
		var view = Ext.widget('editarproyecto');
		view.setTitle('Editar proyecto');
		//record.data.accion = "editar";
		var fecha = new Date();
		var hoy = Ext.Date.format(fecha,'Y-m-d, g:i a');
		record.data._fecha_modificacion = hoy;
		
        view.down('form').loadRecord(record);
	},
	
	
	borrarProyecto: function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		selection.data.accion = "eliminar"
		this.getProyectosStore().remove(selection)
	},	
	
	guardarEditarProyecto: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		win.close();
	},
	
	guardarNuevoProyecto: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);	
		win.close();
		this.getProyectosStore().insert(0, record);
	}
	
});