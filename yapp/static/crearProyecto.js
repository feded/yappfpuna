//Ext.require([
//    'Ext.form.*',
//    'Ext.layout.container.Column',
//    'Ext.tab.Panel',
//    'Ext.QuickTip'
//]);
//
//Ext.onReady(function(){
//
//	Ext.QuickTips.init();
//    var formulario = new Ext.FormPanel({ 
//        frame:true,
//        title: 'Crear proyecto',
//        bodyStyle:'padding:10px',
//        width: 1000,
//        fieldDefaults: {
//            msgTarget: 'side', //para que muestre el error al costado
//            labelWidth: 75
//        },
//        defaultType: 'textfield',
//        defaults: {
//            anchor: '100%'
//        },
//
//        items: [{
//            fieldLabel: 'Nombre del proyecto',
//            name: 'nombre',
//            allowBlank:false
//        },{
//            fieldLabel: 'Autor del proyecto',
//            name: 'autor',
//            allowBlank:false
//        }],
//
////        buttons: [{
////            text: 'Guardar',
////            href: 'main',
////            handler: function(){
////                this.up('form').getForm().submit({
////                	url: 'crearProyecto',
////                    submitEmptyText: false,
////                });
////            }
////        },{
////            text: 'Cancelar',
////            href: 'main'thod:'POST',  
////            waitMsg:'Ingresando...',
////            
////        }]
//        buttons:[{ 
//            text:'Crear',
//            formBind: true,	 
//            
//            handler:function(){ 
//            	formulario.getForm().submit({ 
//                    method:'POST',  
//                    waitMsg:'Creando...',
//
//
//                    success:function(){ 
//                    	Ext.Msg.alert('Estado', 'Acceso correcto!', function(btn, text){
//                    	if (btn == 'ok'){
//                    		var redirect = 'main'; 
//                    		window.location = redirect;
//	                        }
//				        });
//                	},
//                	failure:function(form, action){ 
//                        if(action.failureType == 'server'){                       
//                            Ext.Msg.alert('Error al ingresar!', obj.errors.reason); 
//                        }else{ 
//                            Ext.Msg.alert('Error!', 'No se puede conectar al servidor : ' + action.response.responseText); 
//                        } 
//                        formulario.getForm().reset(); 
//                    } 
//                }); 
//            } 
//        }] 
//    });
//
//    var win = new Ext.Window({
//        layout:'fit',
//        width:500,
//        height:200,
//        closable: false,
//        resizable: false,
//        plain: true,
//        border: false,
//        items: [formulario]
//	});
//    win.show()
//});
Ext.require([
    'Ext.form.*',
    'Ext.layout.container.Column',
    'Ext.tab.Panel',
    'Ext.QuickTip'
]);


Ext.onReady(function(){
    Ext.QuickTips.init();
    var login = new Ext.FormPanel({ 
    	
        labelWidth:80,
        url:'crearProyecto', 
        frame:true, 
        title:'Crear Proyecto', 
        defaultType:'textfield',
        monitorValid:true,
			items:[{ 
                fieldLabel:'Nombre', 
                name:'nombre', 
                allowBlank:false 
            },{ 
                fieldLabel:'Autor', 
                name:'autor', 
                allowBlank:false 
            }],
   
        buttons:[{ 
                text:'Ingresar',
                formBind: true,	 
                
                handler:function(){ 
                    login.getForm().submit({ 
                        method:'POST',  
                        waitMsg:'Ingresando...',
 
 
                        success:function(){ 
                        	Ext.Msg.alert('Estado', 'Proyecto creado!', function(btn, text){
                        	if (btn == 'ok'){
                        		var redirect = 'main'; 
                        		window.location = redirect;
		                        }
					        });
                    	},
                    	failure:function(form, action){ 
                            if(action.failureType == 'server'){                       
                                Ext.Msg.alert('Error al crear proyecto!', obj.errors.reason); 
                            }else{ 
                                Ext.Msg.alert('Error!', 'No se puede conectar al servidor : ' + action.response.responseText); 
                            } 
                            login.getForm().reset(); 
                        } 
                    }); 
                } 
            }] 
    });
 
 
      
    var win = new Ext.Window({
        layout:'fit',
        width:300,
        height:150,
        closable: false,
        resizable: false,
        plain: true,
        border: false,
        items: [login]
	});
	win.show();
//    win.render(document.body);
});