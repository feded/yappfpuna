from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.unidad_trabajo_dao import UnidadTrabajoDAO
from yapp.models.unidad_trabajo.unidad_trabajo import UnidadTrabajo
from yapp.models.unidad_trabajo.unidad_trabajo_recurso import \
    UnidadTrabajo_Recurso
import json
from yapp.daos.recurso_dao import RecursoDAO
from yapp.daos.unidad_trabajo_recurso import UnidadTrabajoRecursoDAO


@view_config(route_name='obtenercrearunidadtrabajo')
def obtener_crear_unidad_trabajo(request):
    """
    @summary: Maneja las solicitudes para obtener y crear unidad de trabajo.
    """
    if (request.method == 'GET'):
        rd = UnidadTrabajoDAO(request)
        entidades = rd.get_all()
        lista = [];
        p = Pickler()
        for entidad in entidades:
            lista.append(p.flatten(entidad))    
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'unidadtrabajo':j_string})    
        
        return Response(a_ret)
    else:
        u= Unpickler()
        entidad = u.restore(request.json_body);
        
        nueva_unidad_trabajo = UnidadTrabajo(entidad["_nombre"],entidad["_etiqueta"],entidad["_descripcion"],entidad["_color"])
        dao = UnidadTrabajoDAO(request)
            
        dao.crear(nueva_unidad_trabajo)
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nueva_unidad_trabajo))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'unidadtrabajo':j_string})
    
        return Response(a_ret)
@view_config(route_name='asignarrecursos')
def asignar_recursos(request):
    u= Unpickler()
    entidad = u.restore(request.json_body);
    id_unidad = entidad['id_unidad_trabajo']
    dao_unidad_recurso = UnidadTrabajoRecursoDAO(request)
    entidades = dao_unidad_recurso.get_query().filter(UnidadTrabajo_Recurso._unidad_trabajo_id==id_unidad).all();
    for unidad_recurso in entidades:
        dao_unidad_recurso.borrar(unidad_recurso)
    
    for id_recurso in entidad['_recursos']:
        print str(id_unidad) + '==>' + str(id_recurso)
        
        a_guardar = UnidadTrabajo_Recurso(id_unidad, id_recurso)
        dao_unidad_recurso.crear(a_guardar)
        
    a_ret = json.dumps({'sucess': 'true', 'recursos': entidad})
    
    return Response(a_ret)