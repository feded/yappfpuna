Ext.define('YAPP.controller.AdministrarFases', {
	extend: 'Ext.app.Controller',
	
	views: [
		'fase.ListarFase', 'fase.NuevaFase', 'fase.NuevoAtributoFase', 'fase.ListarAtributoFase'
		],
	stores:['Fases', 'AtributoFase'],
	models:['Fase', 'AtributoFase'],
	
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
            	
            	'listarfase button[action=atributo]': {
            		click: this.Atributo
            	},
            	
            	'listarfase button[action=borrar]': {
            		click: this.borrarFase
            	}
//            	'nuevoatributofase button[action=guardar]': {
//            		click: this.guardarNuevoAtributo
//            	},
            	
            	
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
		fase.data._estado = "Pendiente";
//		var fecha = new Date();
//		var hoy = Ext.Date.format(fecha,'Y-m-d, g:i a');
//		proyecto.data._fecha_creacion = hoy;
//		proyecto.data._fecha_modificacion = hoy;
//		
		view.down('form').loadRecord(fase);
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
		
//		var view = Ext.widget('nuevoatributofase');
//        var atributo = new YAPP.model.AtributoFase();
//        		
//		view.down('form').loadRecord(atributo);
		
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
	
//	guardarNuevoAtributo: function(button){
//		var win = button.up('window');
//		var form = win.down('form');
//		var record = form.getRecord();
//		var values = form.getValues();
//		record.set(values);	
//		win.close();
//		this.getAtributoFaseStore().insert(0, record);
//	},
	
	borrarFase: function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		this.getFasesStore().remove(selection)
	}
	
});