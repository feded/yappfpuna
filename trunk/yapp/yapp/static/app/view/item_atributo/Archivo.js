Ext.define('YAPP.view.item_atributo.Archivo', {
	extend : 'Ext.window.Window',
	alias : 'widget.archivo',
	
	
	title : 'Subir archivo',
	layout : 'fit',
	autoShow : true,
	
	initComponent: function() {	
    	this.items = [{
    		id: 'form_adjuntar_archivo',
			xtype: 'form',
			frame : true,
			height: 267,
			fileUpload: true,
			method: 'post',
            items: [{
				xtype: 'filefield',
				id: 'archivo_adjunto',
				emptyText: 'Seleccione el archivo',
				fieldLabel: 'Archivo',
				name: 'archivo',
				buttonText: 'Buscar',
				layout:'anchor',
				anchor:'99%',
			}]
		}];
        this.buttons = [{
                text: 'Adjuntar',
                action: 'adjuntar'
            },
            {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    },
});