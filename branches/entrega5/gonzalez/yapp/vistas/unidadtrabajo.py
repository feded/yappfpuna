from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.unidad_trabajo_dao import UnidadTrabajoDAO
from yapp.models.unidad_trabajo.unidad_trabajo import UnidadTrabajo

import json

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