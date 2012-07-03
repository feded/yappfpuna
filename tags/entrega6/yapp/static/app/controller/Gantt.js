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
				'tabSeleccionada' : this.focuseado
			},
			'viewport combobox[name=proyectos]' : {
				change : this.changeProyecto
			},
		})
	},
	focuseado : function() {
		// console.log("ENTRE");
		var combo = this.getProyectos();
		if (combo.getValue() != undefined) {
			this.cargarDiagrama(combo.getValue())
		} else {
			Ext.Msg.alert("GANTT", "Primero seleccione un proyecto")
		}
	},
	changeProyecto : function(object, newValue, oldValue, eOpts) {
		this.cargarDiagrama(newValue)
	},
	cargarDiagrama : function(id_proyecto) {
		if (document.getElementById('GanttChartDIV') != null) {
			var g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), 'day');
			JSGantt.parseXML("/gantt?id_proyecto=" + id_proyecto, g);
			// JSGantt.parseXML("/static/asd", g);
			g.Draw();
			g.DrawDependencies();
		}
	}
});
