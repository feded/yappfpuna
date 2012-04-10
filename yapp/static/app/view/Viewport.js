Ext.define('YAPP.view.Viewport', {
    extend: 'Ext.container.Viewport',
	
	layout: 'border',

    initComponent: function() {
        this.items = [{
				region: 'north',
				title : 'Yet another project processor'
				},
				{
				region: 'west',
		        lbar: [{
		                text: 'Administrar roles',
		                textAlign: 'left'
		            },
		            {
		                text: 'Administrar privilegios',
		                textAlign: 'left'
		            },
		            {
		                text: 'Administrar proyectos',
		                textAlign: 'left'
		                
		            },
		            {
		                text: 'Administrar fases',
		                textAlign: 'left'
		                
		            },
		            {
		                text: 'Administrar esquemas',
		                textAlign: 'left'
		                
		            },
		            {
		                text: 'Administrar tipo de items',
		                textAlign: 'left'
		                
		            },
		            {
		                text: 'Administrar items',
		                textAlign: 'left'
		              
		            },
		            {
		                text: 'Linea base',
		                textAlign: 'left'
		               
		            },
		            {
		                text: 'Recursos',
		                textAlign: 'left'
		                
		            },
		            {
		                text: 'Unidad de trabajo',
		                textAlign: 'left'
		              
		            },
		            {
		                text: 'Suscripciones',
		                textAlign: 'left'
		              
		            },
		            {
		                text: 'Calculo de impacto',
		                textAlign: 'left',
		                href: 'calculoImpacto'
		            },
		            {
		                text: 'SALIR',
		                textAlign: 'left',
		                href: 'logout'
		            }
        			]
			},{
				region: 'center',
				xtype: 'tabpanel',
				activeTab: 0,
				items: {
					title: 'Principal',
					html: 'Area de trabajo'
				}
			}];

        this.callParent();
    }
});