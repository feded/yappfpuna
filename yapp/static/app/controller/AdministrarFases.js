Ext.define('YAPP.controller.AdministrarFases', {
	extend: 'Ext.app.Controller',
	
	views: [
		'fase.ListarFase', 'fase.NuevaFase', 'fase.NuevoAtributoFase', 'fase.ListarAtributoFase',
		'fase.NuevoAtributoFase', 'fase.EditarAtributoFase', 'fase.ListarTipoFase', 'fase.EditarFase'
		],
	stores:['Fases', 'AtributoFase'],
	models:['Fase', 'AtributoFase'],
	
	refs: [	{
    			selector: 'listarfase gridview',
    			ref: 'grilla'
			},
			{
    			selector: 'viewport combobox[name=proyectos]',
    			ref: 'proyectos'
			}
	],
		
	init:function(){
		console.log('Cargado controller AdministrarFases');
		this.control({
//				'listarfase button[action=actualizar]': {
//                	click: this.actualizarFase
//            	},
//            	'listarfase combobox': {
//            		change: this.traerFase
//            	},
            	
//            	'listarfase': {
//            		render: this.traerFase
//            	},
            	
            	
            	'listarfase button[action=crear]':{
            		click: this.crearFase
            	},
            	
            	'nuevafase button[action=guardar]': {
            		click: this.guardarNuevaFase
            	},
            	
            	'listarfase button[action=atributo]': {
            		click: this.Atributo
            	},
            	
            	'listarfase button[action=borrar]': {
            		click: this.borrarFase
            	},
            	
            	'listaratributofase button[action=crear]': {
            		click: this.crearAtributo
            	},
            	
            	'listaratributofase button[action=borrar]': {
            		click: this.borrarAtributoFase
            	},
            	'listartipofase button[action=agregar]': {
            		click: this.agregarTipo
            	},
            	'listartipofase button[action=quitar]': {
            		click: this.quitarTipo
            	},
            	'nuevoatributofase button[action=guardar]': {
            		click: this.guardarNuevoAtributoFase
            	},
            	'listaratributofase': {
            		itemdblclick: this.editarAtributoFase
            	},
            	'editaratributofase button[action=guardar]': {
            		click: this.guardarEditarAtributoFase
            	},
            	'listarfase button[action=tipo]': {
            		click: this.Tipo
            	},
            	'listarfase': {
            		itemdblclick: this.editarFase
            	},
            	'editarfase button[action=guardar]': {
            		click: this.guardarEditarFase
            	}
            	
        });
	},	
	
//	actualizarFase: function(){
//		console.log('Actualizando Fase');
//		this.getFasesStore().load();
//	},
//	
//	traerFase: function(){
//		var combobox = this.getProyectos();
//	
//		var store = this.getStore('Fases');
//		store.load({
//			params: {
//				id : combobox.getValue()
//			}
//		});
//	},
	agregarTipo: function(button){
//        var tipofase = new YAPP.model.TipoFase();
        
        		
		var win = button.up('grid');
		var cb = win.down('combobox');
		
		var storeTipo = cb.getStore();
		var tipo = storeTipo.findRecord('id',cb.getValue());
		
		var g = this.getGrilla();
		var fase = g.getSelectionModel().getSelection()[0];

 		var tipoFase = Ext.create('YAPP.model.TipoFase', {
    		_tipo : tipo.data.id,
    		tipo_nombre : tipo.data._nombre,
    		_fase  : fase.data.id
		});
		
//		console.log (tipoFase);
		var storeTipoFase = win.getStore();
		storeTipoFase.insert(0, tipoFase);
		
		
	},
	
	quitarTipo: function(button){
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		var storeTipoFase = win.getStore()
		storeTipoFase.remove(selection)	
	},
	
	
	
	crearFase: function(button){
		var view = Ext.widget('nuevafase');
        var fase = new YAPP.model.Fase();
        		
//		var win = button.up('grid');
		var cb = this.getProyectos();
		
//		console.log(cb.getValue());
		fase.data._proyecto_id = cb.getValue();
		fase.data._estado = "Pendiente";
//		var fecha = new Date();
//		var hoy = Ext.Date.format(fecha,'Y-m-d, g:i a');
//		proyecto.data._fecha_creacion = hoy;
//		proyecto.data._fecha_modificacion = hoy;
//		
		view.down('form').loadRecord(fase);
	},
	
	crearAtributo: function(button){
		var view = Ext.widget('nuevoatributofase');
        var atributofase = new YAPP.model.AtributoFase();
        
       	var g = this.getGrilla();
       	var selection = g.getSelectionModel().getSelection()[0];
       	
       	atributofase.data._fase_id = selection.data.id;
	
        
		view.down('form').loadRecord(atributofase);
	},
	
	Atributo: function(button){
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		
		
		var store = this.getStore('AtributoFase');
		store.load({
			params: {
				id : selection.data.id
			}
		});
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar atributos fases',
			xtype : 'listaratributofase',
			closable : true
		});

		tabs.setActiveTab(tab);
	},
	
	Tipo: function(button){
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		
		
		var store = this.getStore('TipoFase');
		store.load({
			params: {
				id : selection.data.id
			}
		});
		var tabs = Ext.getCmp('tabPrincipal');
		
		var tab = tabs.add({
			title : 'Administrar tipos fase',
			xtype : 'listartipofase',
			closable : true
		});

		tabs.setActiveTab(tab);
	},
	
	guardarNuevaFase: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);	
		win.close();
		this.getFasesStore().insert(0, record);
//		this.getAtributoFaseStore().sync();
	},
	
	guardarNuevoAtributoFase: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);	
		win.close();
		this.getAtributoFaseStore().insert(0, record);
	},
	
	borrarFase: function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		this.getFasesStore().remove(selection)
	},
	
	borrarAtributoFase: function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		this.getAtributoFaseStore().remove(selection)
	},
	editarAtributoFase: function(grid, record){
		var view = Ext.widget('editaratributofase');
        view.down('form').loadRecord(record);
	},
	
	guardarEditarAtributoFase: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		win.close();
	},
	
	editarFase: function(grid, record){
		var view = Ext.widget('editarfase');
        view.down('form').loadRecord(record);
	},
	
	guardarEditarFase: function(button){
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		win.close();
	},
	
});