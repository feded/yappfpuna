Ext.define('YAPP.controller.UnidadTrabajo', {
    extend: 'Ext.app.Controller',

	views: [
		'unidadTrabajo.ListarUnidadTrabajo', 
		'unidadTrabajo.NuevaUnidadTrabajo',
		'unidadTrabajo.EditarUnidadTrabajo',
		'unidadTrabajo.Asignar'
		],
	stores:['UnidadTrabajo'],
	models:['UnidadTrabajo', 'UnidadTrabajoRecurso'],
	
	refs: [
	       	{
	       		selector: 'nuevaunidadtrabajo textfield[name=_color]',
	       		ref: 'colorTextoNuevo'
	       	},
	       	{
	       		selector: 'editarunidadtrabajo textfield[name=_color]',
	       		ref: 'colorTextoEditar'
	       	},
	       	{
	       		selector: 'asignarrecursos grid[name=firstGrid]',
	       		ref: 'firstGrid'
	       	},
	       	{
	       		selector: 'asignarrecursos grid[name=secondGrid]',
	       		ref: 'secondGrid'
	       	},
	       	{
    			selector: 'listarunidadtrabajo gridview',
    			ref: 'grilla'
			},
	      ],
	
    init: function() {
        console.log('Unidad trabajo');
        this.control({
            	'listarunidadtrabajo button[action=crear]':{
            		click: this.crearUnidadTrabajo
            	},
            	'listarunidadtrabajo' :{
            		itemdblclick : this.editarUnidadTrabajo
            	},
            	'nuevaunidadtrabajo button[action=guardar]':{
            		click: this.guardarNuevaUnidadTrabajo
            	},
            	'nuevaunidadtrabajo colorpicker': {
            		select: this.seleccionoColorNuevo
            	},
            	'editarunidadtrabajo colorpicker': {
            		select: this.seleccionoColorEditar
            	},
            	'editarunidadtrabajo button[action=guardar]':{
            		click: this.guardarEditarUnidadTrabajo
            	},
            	'listarunidadtrabajo button[action=asignarRecursos]':{
            		click: this.asignarRecursos
            	},
            	'asignarrecursos button[action=guardar]':{
            		click: this.guardarAsignacion
            	},
            	'listarunidadtrabajo button[action=borrar]': {
            		click: this.borrarUnidadTrabajo
            	},
        });
    },
    
   	borrarUnidadTrabajo: function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		this.getUnidadTrabajoStore().remove(selection)
	},
    
    editarUnidadTrabajo: function(grid, record){
    	var view = Ext.widget('editarunidadtrabajo');
        view.down('form').loadRecord(record);
    },
    
    guardarAsignacion: function(button){
    	var win = button.up('window');
    	var g = this.getGrilla();
       	var unidadtrabajo = g.getSelectionModel().getSelection()[0];
    	var id_unidad_trabajo = unidadtrabajo.data.id;
    	
    	var recursos = this.getSecondGrid().getStore().getRange();
        var recursosDTO = new Array();
        for (var i in recursos) {
                recursosDTO[i] = recursos[i].data.id;
        }
        var record = new YAPP.model.UnidadTrabajoRecurso();
        record.data._recursos = recursosDTO;
        record.data.id_unidad_trabajo =  id_unidad_trabajo;
        
//        var store = this.getRolesStore()
        record.save({
                success : function(recursos) {
                        Ext.example.msg("Yapp", "Asignacion correcta");
                        win.close();
                },
                failure : function(rol) {
                        Ext.example.msg("Yapp", "Asignacion no correcta");
                }
        });
    },
    
    asignarRecursos: function(button){
    	var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		
		
    	var view = Ext.widget('asignarrecursos');
    	this.getFirstGrid().store.load({
			params : {
					operacion : 'DISPONIBLES',
					id_unidad: selection.data.id  
			}
		});
		this.getSecondGrid().store.load({
			params : {
					operacion : 'NODISPONIBLES',
					id_unidad: selection.data.id  
			}
		});
    },
    
	seleccionoColorNuevo: function(picker, selColor){
		var texto = selColor;
		this.getColorTextoNuevo().setValue(texto);
	},
    
    seleccionoColorEditar: function(picker, selColor){
		var texto = selColor;
		this.getColorTextoEditar().setValue(texto);
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
	
	guardarEditarUnidadTrabajo: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		win.close();
	}
	
    	
});