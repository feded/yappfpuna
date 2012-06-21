Ext.define('YAPP.view.item.DetalleItem', {
	extend : 'Ext.window.Window',
	alias : 'widget.detalleitem',
	layout : 'fit',
	store : 'Item',
	autoShow : true,
	title : 'Detalle Item',
	
	initComponent : function() {
		this.items = [ {
			xtype : 'form',
			layout : {
				type : 'table',
				columns : 2,
				padding: 5
			},
			defaults: {
	       		 bodyStyle: 'padding:20px'
    		},
			width:650,
			height : 250,
			type : 'hbox',
			items : [ {
				xtype : 'displayfield',
				name : '_nombre',
				padding: .5,
				fieldLabel : 'Nombre',
				allowBlank : false
			}, {
				xtype : 'displayfield',
				name : '_descripcion',
				fieldLabel : 'Descripcion',
				allowBlank : false
			},
			{
				xtype : 'displayfield',
				name : '_duracion',
				fieldLabel : 'Duracion en dias',
				typeAhead : true,
				allowBlank : false
			},
			{
				name : '_fecha_inicio',
                xtype: 'displayfield',
                fieldLabel: 'Fecha de Inicio',
                format : 'd/m/Y',        
                submitFormat:'Y-m-d' 
			},
			{
				xtype : 'displayfield',
				name : '_condicionado',
				fieldLabel : 'Condicionado',
				typeAhead : true,
				allowBlank : false
			}, 
			{
				xtype: 'fieldcontainer',
				fieldLabel: 'Color',
				colspan : 2,
				items: [
						{
							xtype: 'textfield',
							name : '_color',
							//itemId : 'color',
						}
						//,colorPicker
						]
			},
			{
				xtype : 'displayfield',
				name : '_tipo_item_prefijo',
				fieldLabel : 'Prefijo Tipo de Item ',
				allowBlank : false
			},
			{
				xtype : 'displayfield',
				name : 'antecesor_nombre',
				fieldLabel : 'Antecesor',
				
			},
			{
				xtype : 'displayfield',
				name : 'padre_nombre',
				fieldLabel : 'Padre',
				
			},
		],}]
		this.layout = {
			type : 'vbox',
			align : 'stretch',
			padding : 5
		};
		this.defaults = {
			flex : 1
		};
		this.width = 650;
		this.height = 550;
		this.buttons = [{
			text : 'Cerrar',
			scope : this,
			handler : this.close
		} ];
		
		this.callParent(arguments);
	}

});




