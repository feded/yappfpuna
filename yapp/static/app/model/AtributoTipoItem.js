Ext.define('YAPP.model.AtributoTipoItem', {
    extend: 'Ext.data.Model',								
    fields: [{name : 'id', type : 'int', mapping : '_id'}, '_tipo', '_valor', '_descripcion', '_opcional' , '_defecto', '_id_item']
});