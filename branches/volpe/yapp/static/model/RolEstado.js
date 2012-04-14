Ext.define('AM.model.RolEstado', {
    extend: 'Ext.data.Model',
// fields: [{name: 'name', type: 'int', }, 'email', 'estado', 'esFinal']
    fields: ['_id', '_estado'],
    toString : function(){ return this._estado;}

});