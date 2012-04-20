Ext.define('YAPP.view.tipoItem.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.atributosList',
    width: 400,
    defaultType:'textfield',
    
    store : 'TipoItems',
    
    columns: [
        {header: 'Deescripcion', sortable : true, dataIndex: '_descripcion',  flex: 1},
        {header: 'Valor', sortable : true, dataIndex: '_valor', flex: 1},
        {header: 'Opcional', sortable : true, dataIndex: '_opcional', flex: 1},
        {header: 'Tipo', sortable : true, dataIndex: '_tipo', flex: 1},
        {header: 'Defecto', sortable : true, dataIndex: '_defecto', flex: 1},
        ]});
        

