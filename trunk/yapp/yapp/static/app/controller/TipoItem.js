Ext.define('YAPP.controller.TipoItem', {
	extend : 'Ext.app.Controller',
	
	views: [
		'tipoItem.List',
		'tipoItem.Edit',
		'tipoItem.AtributosList',
		'tipoItem.AtributoEdit',
		'tipoItem.Importar'
		
		],
	stores:['TipoItems' , 'AtributoTipoItem' ],
	models:['TipoItem' , 'AtributoTipoItem' , 'TipoImportar' ],
	
	refs: 	[
				{
    				selector: 'tipoItemedit textfield[name=_color]',
    				ref: 'colorTexto'
				},
				{
    				selector: 'viewport combobox[name=proyectos]',
    				ref: 'proyectos'
				},
				{
    				selector: 'importar combobox',
    				ref: 'proyectoImportar'
				},
				{
	       			selector: 'importar grid[name=firstGrid]',
	       			ref: 'firstGrid'
	       		},
	       		{
	       			selector: 'importar grid[name=secondGrid]',
	       			ref: 'secondGrid'
	       		}
			],
	
	
	init:function(){
		console.log('Cargado controller tipoItem');
		this.control({
			'importar combobox' : {
				select: this.traerTiposItems
			},
			
			'importar button[action=guardar]' : {
				click: this.guardarImportar
			},
			
            'tipolist button[action=crear]': {
                click: this.crearTipoItem
            },
            'tipolist button[action=importar]': {
                click: this.importar
            },
            'tipoItemedit button[action=guardar]': {
                click: this.guardarTipoItem
            },
            'atributosList button[action=crearAtributo]': {
                click: this.crearAtributo
            },
            'atributoedit button[action=guardar]': {
                click: this.guardarAtributo
            },
            'tipolist': {
            	itemdblclick: this.editarTipoItem
        	},
        	'tipolist actioncolumn':{
                click: this.verAtributos
            },
//            'tipolist button[action=verAtributos]':{
//                click: this.verAtributos
//            },
            'tipolist button[action=borrar]' : {
				click : this.borrarTipoItem
			},
			'atributosList':{
				itemdblclick: this.editarAtributo
			},
			'atributosList button[action=borrar]':{
				click: this.borrarAtributo
			},
			
			'tipoItemedit colorpicker': {
        		select: this.seleccionoColor
            }

        });
	},
	
	importar : function(button){
		var view = Ext.widget('importar');
		
		var proyectos = this.getStore('Proyectos');
		this.getProyectoImportar().store = proyectos;
    },
    
    traerTiposItems: function(){
    	var proyecto_id = this.getProyectoImportar().getValue();
    	console.log(proyecto_id);
    	this.getFirstGrid().store.load({
			params : {
				id_proyecto :  proyecto_id
			}
		});
    },
    
    
    guardarImportar: function(button){
    	var win = button.up('window');
    	var proyecto_id = this.getProyectos().getValue();
    	
    	var tipos = this.getSecondGrid().getStore().getRange();
        var tiposDTO = new Array();
        for (var i in tipos) {
                tiposDTO[i] = tipos[i].data.id;
        }
        var record = new YAPP.model.TipoImportar();
        record.data._tipos = tiposDTO;
        record.data.id_proyecto = proyecto_id;
        var me = this;
        record.save({
                success : function(recursos) {
                        Ext.example.msg("Yapp", "Importacion correcta");
                        var store2 = me.getStore('TipoItems');
						store2.load({
							params : {
									id_proyecto :  proyecto_id
							}
						});
                        win.close();
                },
                failure : function(recursos) {
                        alert("Importacion no correcta");
                }
        });
    },
	
	seleccionoColor: function(picker, selColor){
		var texto = selColor;
		this.getColorTexto().setValue(texto);
	},
	
	verAtributos : function(grid, view, recordIndex, cellIndex, item, e){
		var tabs = Ext.getCmp('tabPrincipal');
		tipoId = this.getTipoItemsStore().getAt(recordIndex).get('id');
//		console.log(tipoId)
//		this.getAtributoTipoItemStore().clearFilter(true)
//		this.getAtributoTipoItemStore().filter('_tipo_item_id', tipoId);
//		var tab = Ext.getCmpByName('Atributos Tipo Item')
		var tab = tabs.add({
			title : 'Atributos Tipo Item',
			xtype : 'atributosList',
			closable : true
			});
		var store = this.getStore('AtributoTipoItem');
		store.load({
			params:{
				id: tipoId
				}
		});
		
		
		tabs.setActiveTab(tab);
	},
	
	crearAtributo : function(button){
		var view = Ext.widget('atributoedit');
		var atributoTipoItem = new YAPP.model.AtributoTipoItem();
		atributoTipoItem.data._tipo_item_id = tipoId;
		atributoTipoItem.data.accion = 'POST'
		view.down('form').loadRecord(atributoTipoItem);
    },
    
    guardarAtributo: function(button){
    	var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		if (record.data._opcional == 'on')record.data._opcional = 'true'
		else record.data._opcional = 'false'
		win.close();
		if (record.data.accion == "POST")
			this.getAtributoTipoItemStore().insert(0, record);
    },
    
    guardarTipoItem : function(button) {
		var win = button.up('window');
		var form = win.down('form');
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		if (record.data._condicionado == 'on'){
			record.data._condicionado = 'true'
		}
		else{
			 record.data._condicionado = 'false'
		} 
		
		var me = this;
		if (record.data.accion == "POST"){
			record.save({
				success: function(tipo){
					me.getTipoItemsStore().insert(0, tipo);
					Ext.example.msg("YAPP", "Tipo de item creado con éxito");
					win.close();	
				},
				
				failure: function(tipo){
					alert("No se puedo crear el tipo de item")
				}
			});
		}else{
			//Actualizamos
			record.save({
				success: function(tipo){
					Ext.example.msg("YAPP", "Tipo de item actualizado con éxito");
					win.close();	
				},
				
				failure: function(tipo){
					alert("No se puedo actualizar el tipo de item")
				}
			});
		}
			
	},
    crearTipoItem : function(button){
    	var view = Ext.widget('tipoItemedit');
		var tipoItem = new YAPP.model.TipoItem();
		var cb = this.getProyectos();
		tipoItem.data.accion = 'POST';
		tipoItem.data._proyecto_id = cb.getValue();
		view.down('form').loadRecord(tipoItem);
    },
    
  	editarTipoItem: function(grid, record){
		var view = Ext.widget('tipoItemedit');
		view.setTitle('Editar Tipo Item');
        view.down('form').loadRecord(record);
	},
	
	editarAtributo : function (grid, record) {
	 	var view = Ext.widget('atributoedit');
		view.setTitle('Editar Tipo Item');
	    view.down('form').loadRecord(record);
 	},
	
	borrarTipoItem: function(button) {
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		selection.data.accion = "DELETE"
		var me = this;
		selection.destroy({
			success: function(tipo){
				me.getTipoItemsStore().remove(selection)		
			},
			failure: function(tipo){
				alert("No se pudo eliminar el tipo de item")
			}
		});
		
	},
	borrarAtributo: function(button){
		var win = button.up('grid');
		var grilla = win.down('gridview')
		var selection = grilla.getSelectionModel().getSelection()[0];
		selection.data.accion = "DELETE"
		this.getAtributoTipoItemStore().remove(selection)
	}

});

