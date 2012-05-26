Ext.define('YAPP.model.Esquema', {
    extend: 'Ext.data.Model',
    fields: [{name : 'id', type : 'int', mapping : '_id'}, '_nombre', '_descripcion', '_etiqueta', '_color' , '_fase_id', 'accion']
});