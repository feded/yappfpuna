Ext.require([ 'Ext.data.*', 'Ext.tip.QuickTipManager', 'Ext.window.MessageBox' ]);
Ext.define('AM.view.rol.Edit', {
	extend : 'Ext.form.Panel',
	alias : 'widget.roledit',
	
	title : 'Editar Rol',
	// layout : 'fit',
	autoShow : true,
	
	// requires: ['Ext.form.field.Text'],
	
	initComponent : function() {
		this.addEvents('create');
		Ext.apply(this, {
			activeRecord : null,
			iconCls : 'icon-user',
			frame : true,
			title : 'Roles',
			defaultType : 'textfield',
			bodyPadding : 5,
			// fieldDefaults : {
			// anchor : '100%',
			// labelAlign : 'right'
			// },
			items : [ {
				fieldLabel : 'Nombre',
				name : '_nombre',
				allowBlank : false
			}, {
				fieldLabel : 'Email',
				name : '_email',
				allowBlank : false
			// vtype : 'email'
			}, {
				fieldLabel : 'Estado',
				name : '_estado',
				allowBlank : true
			} ],
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'bottom',
				ui : 'footer',
				items : [ '->', {
					itemId : 'save',
					text : 'Save',
					disabled : true,
					scope : this,
					action : 'save'
				}, {
					text : 'Create',
					scope : this,
					action : 'crear'
				}, {
					text : 'Reset',
					scope : this,
					action : 'resetear'
				} ]
			} ]
		});
		this.callParent();
	},
//	
// setActiveRecord : function(record) {
// this.activeRecord = record;
// if (record) {
// this.down('#save').enable();
// this.getForm().loadRecord(record);
// } else {
// this.down('#save').disable();
// this.getForm().reset();
// }
// },

// onSave : function() {
// var active = this.activeRecord, form = this.getForm();
//		
// if (!active) {
// return;
// }
// if (form.isValid()) {
// form.updateRecord(active);
// this.onReset();
// }
// },
//	
// onCreate : function() {
// var form = this.getForm();
//		
// if (form.isValid()) {
// this.fireEvent('create', this, form.getValues());
// form.reset();
// }
//		
// },
//	
// onReset : function() {
// this.setActiveRecord(null);
// this.getForm().reset();
// }
});

//	
// initComponent : function() {
// this.items = [ {
// xtype : 'form',
// items : [ {
// xtype : 'textfield',
// name : 'name',
// fieldLabel : 'Name'
// }, {
// xtype : 'textfield',
// name : 'email',
// fieldLabel : 'Email'
// } ]
// } ];
//		
// this.buttons = [ {
// text : 'Save',
// action : 'save'
// }, {
// text : 'Cancel',
// scope : this,
// handler : this.close
// } ];
//		
// this.callParent(arguments);
// }
// });
