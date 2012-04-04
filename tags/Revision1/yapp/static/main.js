Ext.require([
    'Ext.panel.*',
    'Ext.toolbar.*',
    'Ext.button.*',
    'Ext.container.ButtonGroup',
    'Ext.layout.container.Table'
]);

Ext.onReady(function() {
	
    var PanelPrincipal = Ext.extend(Ext.Panel, {
        width    : 1000,
        height   : 600,
        style    : 'margin-top:15px',
        bodyStyle: 'padding:10px',
        renderTo : Ext.getBody(),
        html     : 'Area de trabajo aun no disponible',
        autoScroll: true
    });

    new PanelPrincipal({
        title: 'Yet another project processor',
        lbar: [{
                xtype:'splitbutton',
                text: 'Administrar roles',
                textAlign: 'left',
                menu: [{text: 'Crear',
                		href: 'crearRol'},
                		{text: 'Editar',
                		 href: 'editarRol'},
                		{text: 'Eliminar',
                		 href: 'eliminarRol'}]
            },
            {
                xtype:'splitbutton',
                text: 'Administrar privilegios',
                textAlign: 'left',
                menu: [{text: 'Crear',
                		href: 'crearPrivilegio'},
                		{text: 'Editar',
                		 href: 'editarPrivilegio'},
                		{text: 'Eliminar',
                		 href: 'eliminarPrivilegio'}]
            },
            {
                xtype:'splitbutton',
                text: 'Administrar proyectos',
                textAlign: 'left',
                menu: [{text: 'Crear',
                		href: 'crearProyecto'},
                		{text: 'Editar',
                		 href: 'editarProyecto'},
                		{text: 'Eliminar',
                		 href: 'eliminarProyecto'}]
            },
            {
            	xtype:'splitbutton',
                text: 'Administrar fases',
                textAlign: 'left',
                menu: [{text: 'Crear',
                		href: 'crearFase'},
                		{text: 'Editar',
                		 href: 'editarFase'},
                		{text: 'Eliminar',
                		 href: 'eliminarFases'}]
            },
            {
            	xtype:'splitbutton',
                text: 'Administrar esquemas',
                textAlign: 'left',
                menu: [{text: 'Crear',
                		href: 'crearEsquema'},
                		{text: 'Editar',
                		href: 'editarEsquema'},
                		{text: 'Eliminar',
                		href: 'eliminarEsquema'}]
            },
            {
            	xtype:'splitbutton',
                text: 'Administrar tipo de items',
                textAlign: 'left',
                menu: [{text: 'Crear',
                		href: 'crearTipoItem'},
                		{text: 'Editar',
                		href: 'editarTipoItem'},
                		{text: 'Eliminar',
                		href: 'eliminarTipoItem'}]
            },
            {
            	xtype:'splitbutton',
                text: 'Administrar items',
                textAlign: 'left',
                menu: [{text: 'Crear',
                		href: 'crearItem'},
                		{text: 'Editar',
                		href: 'editarItem'},
                		{text: 'Eliminar',
                		href: 'eliminarItem'},
                		{text: 'Revertir',
                		href: 'revertirItem'},
                		{text: 'Revivir',
                		href: 'revivirItem'}]
            },
            '-',
            {
            	xtype:'splitbutton',
                text: 'Linea base',
                textAlign: 'left',
                menu: [{text: 'Generar',
                		href: 'GenerarLB'},
                		{text: 'Romper',
                		href: 'RomperLB'}]
            },
            '-',
            {
            	xtype:'splitbutton',
                text: 'Recursos',
                textAlign: 'left',
                menu: [{text: 'Crear',
                		href: 'crearRecurso'},
                		{text: 'Editar',
                		href: 'editarRecurso'},
                		{text: 'Eliminar',
                		href: 'eliminarRecurso'}]
            },
            {
            	xtype:'splitbutton',
                text: 'Unidad de trabajo',
                textAlign: 'left',
                menu: [{text: 'Crear',
                		href: 'crearUnidadTrabajo'},
                		{text: 'Editar',
                		href: 'editarUnidadTrabajo'},
                		{text: 'Eliminar',
                		href: 'eliminarUnidadTrabajo'},
                		{text: 'Asignar',
                		href: 'asignarUnidadTrabajo'}]
            },
            {
            	xtype:'splitbutton',
                text: 'Suscripciones',
                textAlign: 'left',
                menu: [{text: 'Crear',
                		href: 'crearSuscripcion'},
                		{text: 'Editar notificacion',
                		href: 'editarNotificacion'},
                		{text: 'Eliminar',
                		href: 'eliminarSuscripcion'}]
            },
            {
                text: 'Calculo de impacto',
                textAlign: 'left',
                href: 'calculoImpacto'
            }
        ]
    });
});
