Ext.application({
	
    name: 'NotFound',
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    title: 'YAPP',
                    html : 'Página en desarrollo'
                }
            ]
        });
    }
});