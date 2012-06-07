Ext.define('YAPP.view.fase.ListarTipoFase' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.listartipofase',
    store: 'TipoFase',
    
    layout: 'fit',
    
    initComponent: function() {
		  this.dockedItems = [ {
                                xtype : 'toolbar',
                                items : [ 
                                			{
                                				xtype: 'combobox',
                                				fieldLabel: 'Tipo items',
//    											store: Ext.create('YAPP.store.TipoItems'),
    											displayField: '_nombre',
    											queryMode : 'local',
    											valueField: 'id',
    											name: 'tipoItems'
                                		   },
                        					{
                                	        	xtype: 'button',
                                    	    	text : 'Agregar',
                                        		scope : this,
                                        		action : 'agregar'
                                			}, '|',
                                			 {
                                        		xtype: 'button',
                                        		text : 'Quitar',
                                        		itemId : 'delete',
                                        		action : 'quitar',
                                        		disabled : true,
                                        		scope : this
                                			}
                                		]
                                }];
      
      
		this.columns = [
//			{header:'Tipo', dataIndex:'_tipo', renderer : renderizador}
			{header:'Tipo', dataIndex:'tipo_nombre'}
        ];   

        this.callParent(arguments);
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this); //a eliminar esta parte
    },
    //la funcion de abajo se va a pasar a view
    onSelectChange : function(selModel, selections) {
                this.down('#delete').setDisabled(selections.length === 0);
    }
});
function renderizador(val) {
	if (val == null)
		return val;
	return val._nombre
	// return ""
}
//function renderizador(value) {
//	console.log(value);
//	var store = Ext.create('YAPP.store.TipoItems');
//	//var store = this.getStore('TipoItems');
//	console.log(store);
//	t = store.findRecord('id',1);
//	return t.data._nombre
//	// return ""
//}