Ext.define('YAPP.view.item_atributo.ListarArchivo' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.listararchivo',
    store: 'Archivos',
    
    layout: 'fit',
    
//    title: 'Archivos relacionados',

    initComponent: function() {
    	this.dockedItems = [{
				xtype : 'toolbar',
				title: 'Atributos Particulares',
				items : [ 
				{
					xtype: 'button',
                    text : 'Archivos Relacionados al Item',
					scope : this,
					action : 'archivos',
					disabled : true,
					name : 'btnListarArchivos'
                }]
		}];
    	
		this.columns = [
			{header:'Archivo', dataIndex:'_nombre'},
        ];   
		
        this.callParent(arguments);
    },
});

