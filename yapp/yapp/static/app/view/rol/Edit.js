Ext.define('YAPP.view.rol.Edit', {
	extend : 'Ext.window.Window',
	alias : 'widget.roledit',
	
	title : 'Editar Rol',
	layout : 'fit',
	autoShow : true,
	
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			items : [ this.form_comun, this.form_final, this.container ]
		} ];
		
		this.buttons = [ {
			text : 'Guardar',
			// disabled : true,
			formBind : true,
			action : 'guardar'
		}, {
			text : 'Cancel',
			scope : this,
			handler : this.close
		} ];
		
		this.callParent(arguments);
	},
	form_comun : {
		xtype : 'fieldset',
		title : 'Rol General',
		scope : this,
		items : [ {
			xtype : 'textfield',
			name : '_nombre',
			fieldLabel : 'Nombre',
			allowBlank : false
		}, {
			// store : Ext.create('YAPP.store.RolEstados'),
			xtype : 'combobox',
			fieldLabel : 'Estado',
			name : '_estado',
			// valueField : 'RolEstado',
			displayField : '_estado',
			typeAhead : true,
			queryMode : 'local',
			emptyText : 'Seleccione un estado...',
			allowBlank : false
		} ]
	},
	form_final : {
		name : 'form_final',
		xtype : 'fieldset',
		checkboxToggle : true,
		scope : this,
		collapsed : true,
		title : 'Rol Final',
		items : [ {
			xtype : 'textfield',
			name : '_email',
			fieldLabel : 'Correo',
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : '_password',
			fieldLabel : 'Contraseña',
			inputType : 'password',
			allowBlank : false
		} ],
		
		setExpanded : function(expanded) {
			var bContinue;
			if (expanded)
				bContinue = this.fireEvent('beforeexpand', this);
			else
				bContinue = this.fireEvent('beforecollapse', this);
			
			var me = this, checkboxCmp = me.checkboxCmp;
			
			expanded = !!expanded;
			
			if (checkboxCmp) {
				checkboxCmp.setValue(expanded);
			}
			
			if (expanded) {
				me.removeCls(me.baseCls + '-collapsed');
			} else {
				me.addCls(me.baseCls + '-collapsed');
			}
			me.collapsed = !expanded;
			if (expanded) {
				me.getComponentLayout().childrenChanged = true;
			}
			me.doComponentLayout();
			return me;
		},
		listeners : {
			'beforeexpand' : function(fieldset) {
				var win = fieldset.up('window');
				var form = win.down('form');
				var record = form.getRecord();
				record.data._esFinal = true;
			},
			'beforecollapse' : function(fieldset) {
				var win = fieldset.up('window');
				if (win == null)
					return true;
				var form = win.down('form');
				var record = form.getRecord();
				record.data._esFinal = false;
			}
		}
	},
	// container de roles
	container : {
		xtype : 'container',
		width : 650,
		name : 'gridDragAndDrop',
		height : 300,
		layout : {
			type : 'hbox',
			align : 'stretch',
			padding : 5
		},
		defaults : {
			flex : 1
		},
	},

});
