Ext.define('YAPP.view.gantt.View', {
	extend : 'Ext.form.Panel',
	alias : 'widget.ganttview',
	title : 'Diagrama de Gantt',
	// layout : 'fit',
	autoShow : true,
	// frame:true,
	
	initComponent : function() {
		this.items = [ {
			xtype : 'container',
			html : "<div style=\"position: relative\" class=\"gantt\" id=\"GanttChartDIV\">Seleccione un proyecto</div>",
		} ];
		this.callParent(arguments);
	}

});
