Ext.define('YAPP.store.Proyectos', {
	extend: 'Ext.data.Store',
	model: 'YAPP.model.Proyecto',
	
	data: [
		{nombre: 'Proyecto 1', autor: 'Uriel'}
	]
});