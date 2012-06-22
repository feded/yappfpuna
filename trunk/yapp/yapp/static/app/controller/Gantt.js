Ext.define('YAPP.controller.Gantt', {
	extend : 'Ext.app.Controller',
	views : [ 'gantt.View' ],
	refs : [ {
		selector : 'viewport combobox[name=proyectos]',
		ref : 'proyectos'
	} ],
	init : function() {
		this.control({
			'ganttview' : {
				afterrender : this.traerPermiso
			},
		})
	},
	traerPermiso : function() {
		// console.log("ENTRE");
		var combo = this.getProyectos();
		if (combo.getValue() != undefined) {
			var g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), 'day');
			JSGantt.parseXML("/gantt?id_proyecto=" + combo.getValue(), g);
			g.Draw();
			g.DrawDependencies();
		}
	}
});
