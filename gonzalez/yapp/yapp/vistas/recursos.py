from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.recurso_dao import RecursoDAO, TipoRecursoDAO
from yapp.models.recurso.recurso import Recurso
from yapp.models.recurso.tipo_recurso import TipoRecurso

import json

@view_config(route_name='obtenercrearrecursos')
def obtener_crear_recursos(request):
    if (request.method == 'GET'):
        rd = RecursoDAO()
        entidades = rd.get_all()
        lista = [];
        p = Pickler()
        for entidad in entidades:
            a = RecursosLindos(entidad._id, entidad._nombre, entidad._tipo,entidad._descripcion)
            lista.append(p.flatten(a))    
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'recursos':j_string})    
        
        return Response(a_ret)
    
    else:    
        u= Unpickler()
        entidad = u.restore(request.json_body);
        
        tipo_dao = TipoRecursoDAO()
        tipo = tipo_dao.get_query().filter(TipoRecurso._tipo == entidad["_tipo"]).first()
    
        dao = RecursoDAO()
        nuevo_recurso = Recurso(entidad["_nombre"],tipo,entidad["_descripcion"])
        dao.crear(nuevo_recurso)
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nuevo_recurso))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'recurso':j_string})
    
        return Response(a_ret)

@view_config(route_name='tipos_recursos')
def get_tipos_recurso(request):
    re = TipoRecursoDAO()
    entidades = re.get_query().all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
        lista.append(p.flatten(entidad))
            
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'tipos':j_string})
    return Response(a_ret)

class RecursosLindos:
    """Unidad de transporte para roles"""
    def __init__(self, _id, nombre, tipo, descripcion):
        self._id = _id;
        self._nombre = nombre;
        self._tipo = tipo;
        self._descripcion = descripcion;
        