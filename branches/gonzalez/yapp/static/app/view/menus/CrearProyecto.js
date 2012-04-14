Ext.define('YAPP.view.menus.CrearProyecto' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.crearproyecto',
    store: 'Proyectos',

    initComponent: function() {
      
			this.columns = [
				{header:'Proyecto', dataIndex:'nombre'},
				{header:'Autor', dataIndex:'autor'},
            ];   

        this.callParent(arguments);
    }
});