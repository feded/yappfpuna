Ext.define('YAPP.view.menus.CrearProyecto' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.crearproyecto',
    
    defaultType:'textfield',

    initComponent: function() {
      
			this.items = [{ 
                fieldLabel:'Proyecto', 
                name:'nombre', 
                allowBlank:false 
            },{ 
                fieldLabel:'Autor', 
                name:'autor', 
                allowBlank:false 
            }];   

        this.callParent(arguments);
    }
});