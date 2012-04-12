Ext.define('AM.model.Rol', {
    extend: 'Ext.data.Model',
//    fields: [{name: 'name', type: 'int', }, 'email', 'estado', 'esFinal']
    fields: ['_id', '_nombre', '_email', '_estado', 'esFinal']
});