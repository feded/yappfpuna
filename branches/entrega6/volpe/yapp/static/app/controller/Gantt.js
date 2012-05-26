Ext.define('YAPP.controller.Gantt', {
	extend : 'Ext.app.Controller',
	views : [ 'gantt.View' ],
	init : function() {
		this.control({
			'ganttview' : {
				afterrender : this.traerPermiso
			},
		})
	},
	traerPermiso : function() {
		console.log("ENTRE");
		var g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), 'day');
		console.log(document.getElementById('GanttChartDIV'))
		console.log(g);
		JSGantt.parseXML("/gantt", g);
//		JSGantt.parseXML("/static/test.xml", g);
		g.Draw();
		g.DrawDependencies();
	}
});
