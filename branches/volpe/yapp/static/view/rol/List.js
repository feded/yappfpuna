Ext.define('AM.view.rol.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.rollist',
	
	title : 'All Users',
	store : 'Roles',
	
	requires : [ 'Ext.grid.plugin.CellEditing', 'Ext.form.field.Text', 'Ext.toolbar.TextItem' ],
	
	initComponent : function() {
		
		this.editing = Ext.create('Ext.grid.plugin.CellEditing');
		
		Ext.apply(this, {
			iconCls : 'icon-grid',
			frame : true,
			plugins : [ this.editing ],
			dockedItems : [ {
				xtype : 'toolbar',
				items : [ {
					iconCls : 'icon-add',
					text : 'Nuevo Rol',
					scope : this,
					action : 'crear'
				}, '|', {
					iconCls : 'icon-delete',
					text : 'Eliminar Rol',
					disabled : true,
					itemId : 'delete',
					action : 'borrar',
					scope : this,
				} ]
			}, {
				weight : 2,
				xtype : 'toolbar',
				dock : 'bottom',
				items : [ {
					text : 'autoSync',
					enableToggle : true,
					pressed : true,
					tooltip : 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
					scope : this,
					toggleHandler : function(btn, pressed) {
						this.store.autoSync = pressed;
						console.log("Se sincronizada: " + pressed)
					}
				}, {
					text : 'batch',
					enableToggle : true,
					pressed : true,
					tooltip : 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
					scope : this,
					toggleHandler : function(btn, pressed) {
						this.store.getProxy().batchActions = pressed;
					}
				}, {
					text : 'writeAllFields',
					enableToggle : true,
					pressed : false,
					tooltip : 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
					scope : this,
					toggleHandler : function(btn, pressed) {
						this.store.getProxy().getWriter().writeAllFields = pressed;
					}
				} ]
			}, {
				weight : 1,
				xtype : 'toolbar',
				dock : 'bottom',
				ui : 'footer',
				items : [ '->', {
					iconCls : 'icon-save',
					text : 'Sync',
					scope : this,
					handler : this.onSync
				} ]
			} ],
			columns : [ {
				text : 'Nombre',
				flex : 1,
				sortable : true,
				dataIndex : '_nombre'
			}, {
				header : 'Estado',
				flex : 1,
				sortable : true,
				dataIndex : '_estado',
				field : {
					type : 'textfield'
				}
			}, {
				header : 'Final?',
				width : 40,
				flex : 0,
				sortable : true,
				dataIndex : 'esFinal'
			} ]
		});
		this.callParent();
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},

});
