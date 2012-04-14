Ext.define('YAPP.view.tipoItem.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.tipolist',
    width: 400,
    defaultType:'textfield',
    
    store : 'TipoItems',
    
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
					text : 'Nuevo Tipo de Item',
					scope : this,
					action : 'crear'
				}, '|', {
					iconCls : 'icon-delete',
					text : 'Eliminar Tipo de Item',
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
    
	    columns: [
	        {header: 'Nombre', sortable : true, dataIndex: '_nombre',  flex: 1},
	        {header: 'Comentario', sortable : true, dataIndex: '_comentario', flex: 1},
	        {header: 'Color', sortable : true, dataIndex: '_color', flex: 1},
	        {header: 'Prefijo', sortable : true, dataIndex: '_prefijo', flex: 1},
	        {header: 'Condicionado', sortable : true, dataIndex: '_condicionado', flex: 1},
			{header: 'Atributos', dataIndex:'id' , width: 200,
	
			  renderer: function(value, meta, record) {
			
			    var id = Ext.id();
			
			    Ext.Function.defer(function(){
	    			new Ext.Button({renderTo: id, text: 'Ver',height: 20,  width: 100, handler:function(){
	    				//handler
	    				//action: 'adminAtributosTipoItems'
	    				var tabs = Ext.getCmp('tabPrincipal');
	    				console.log(tabs);
				    	var tab = tabs.add({
				    		title: 'Atributos - Tipo de Item',
				    		xtype: 'atributosList'
				    	});
	    				tabs.setActiveTab(tab);	
		    			}  
	    			});}, 25);
			    	return '<span id="' + id + '"></span>';
			
			  } }	 
			]
		});
		this.callParent();
		this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
	},
	
});
	    

