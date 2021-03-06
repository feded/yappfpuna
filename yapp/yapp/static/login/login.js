Ext.require([ 'Ext.form.*', 'Ext.layout.container.Column', 'Ext.tab.Panel', 'Ext.QuickTip' ]);

Ext.onReady(function() {
	Ext.QuickTips.init();
	var logo = new Ext.Component({
		autoEl : {
			tag : 'img',
			src : '/static/logo_yapp_mini.png'
		},
		style : 'text-align:center; padding-bottom: 5px;'
	});
	
	var login = new Ext.FormPanel({
		id : 'login',
		name : 'login',
		labelWidth : 200,
		url : '/',
		frame : true,
		style : 'text-align:center',
		title : 'Ingreso al sistema',
		defaultType : 'textfield',
		monitorValid : true,
		items : [ logo, {
			fieldLabel : 'Correo electrónico',
			name : 'usuario',
			allowBlank : false
		}, {
			id : 'login_password_field',
			fieldLabel : 'Contraseña',
			name : 'password',
			allowBlank : false,
			inputType : 'password'
		
		} ],
		
		buttons : [ {
			
			text : 'Ingresar',
			formBind : true,
			handler : handle
		
		}, {
			text : 'Olvide',
			
			formBind : true,
			handler : function() {
				Ext.getCmp("login").add({
					name : 'type',
					xtype : 'hidden',
					value : 'olvide'
				});
				Ext.getCmp("login").doLayout();
				
				login.getForm().submit({
					waitMsg : 'Procesando su solicitud...',
					method : 'POST',
					
					success : function() {
						Ext.Msg.alert('Olvidé contraseña!', 'Su contraseña de acceso se ha enviado a su correo electrónico con el que se registro', function(btn, text) {
							if (btn == 'ok') {
							}
						});
					},
					failure : function() {
						Ext.Msg.alert('Error!', 'No se encuentra registrado en el sistema');
						login.getForm().reset();
					}
				
				});
			}
		
		} ],
		listeners : {
			afterRender : function(thisForm, options) {
				this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
					enter : handle,
					scope : this
				});
			}
		},
	});
	
	function handle() {
		Ext.getCmp("login").add({
			name : 'type',
			xtype : 'hidden',
			value : 'login'
		});
		Ext.getCmp("login").doLayout();
		var passwordTF = Ext.getCmp("login_password_field");
		var pass_plain = passwordTF.getValue()
		passwordTF.setValue(md5(passwordTF.getValue()))
//		console.log(passwordTF.getValue());
		login.getForm().submit(submit);
//		passwordTF.setValue(pass_plain)
	}
	
	var submit = {
		method : 'POST',
		waitMsg : 'Ingresando...',
		
		success : function(response, options) {
			Ext.example.msg("YAPP", "Bienvenido");
			// var redirect = 'index';
			// window.location = redirect;
			Ext.application({
				name : 'YAPP',
				
				appFolder : '/static/app',
				
				autoCreateViewport : true,
				
				controllers : [ 'Menus', 
				                'AdministrarProyectos', 
				                'AdministrarFases', 
				                'Roles', 
				                'TipoItem', 
				                'Suscripciones', 
				                'Item', 
				                'Recursos', 
				                'Esquemas', 
				                'LineasBase',
				                'UnidadTrabajo',
				                'CalculoImpactos',
				                'Gantt'
				],
				
				launch : function() {
					win.hide();
					return

				}
			});
		},
		failure : function(form, action) {
			if (action.failureType == 'server') {
				Ext.Msg.alert('Error al ingresar!', 'Usuario y/o contraseña inválidos');
			} else {
				Ext.Msg.alert('Error!', 'No se puede conectar al servidor. ' + action.response.responseText);
			}
			login.getForm().reset();
		}
	};
	
	var win = new Ext.Window({
		layout : 'fit',
		width : 300,
		height : 220,
		closable : false,
		resizable : true,
		plain : true,
		border : false,
		items : [ login ]
	});
	win.show();
	// win.render(document.body);
});