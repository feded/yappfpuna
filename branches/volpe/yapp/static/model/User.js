Ext.define('AM.model.User', {
    extend: 'Ext.data.Model',
//    fields: [{name: 'name', type: 'int', }, 'email', 'estado', 'esFinal']
    fields: ['_nombre', '_email', '_estado', 'esFinal']
});