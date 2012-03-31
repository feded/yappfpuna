Ext.onReady(function(){
    Ext.QuickTips.init(); 
    var login = new Ext.FormPanel({ 
        labelWidth:80,
        url:'login', 
        frame:true, 
        title:'Ingreso al sistema', 
        defaultType:'textfield',
	monitorValid:true,
			items:[{ 
                fieldLabel:'Usuario', 
                name:'usuario', 
                allowBlank:false 
            },{ 
                fieldLabel:'Password', 
                name:'password', 
                inputType:'password', 
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
                        	Ext.Msg.alert('Estado', 'Acceso correcto!', function(btn, text){
                        	if (btn == 'ok'){
                        		var redirect = 'main'; 
                        		window.location = redirect;
				                        
		                                   }
					        });
                    	},
                    	failure:function(form, action){ 
                            if(action.failureType == 'server'){                       
                                Ext.Msg.alert('Error al ingresar!', obj.errors.reason); 
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
});