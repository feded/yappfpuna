Ext.define('YAPP.controller.AdministrarProyectos', {
	extend: 'Ext.app.Controller',
	
	views: [
		'menus.CrearProyecto',
		'menus.EditarProyecto'
		],
	stores:['Proyectos'],
	models:['Proyecto'],
	
	init:function(){
		console.log('Cargado controller AdministrarProyectos');
		this.control({
        //    'crearproyecto': {
        //        selectionchange: this.habilitarEliminar
        //    }
        
				'crearproyecto button[action=crear]': {
                	click: this.crearProyecto
            	}
        });
	},
	
	//habilitarEliminar: function(panel){
	//	panel.down('#delete').setDisabled(false);
	//}
	crearProyecto: function(grid, record){
		 var view = Ext.widget('editarproyecto');
         view.down('form').loadRecord(record);
	}

});