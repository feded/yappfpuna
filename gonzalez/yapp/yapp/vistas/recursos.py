from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.recurso_dao import RecursoDAO
import json

@view_config(route_name='obtenercrearrecursos')
def obtener_crear_recursos(request):
    rd = RecursoDAO()
    entidades = rd.get_all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
        lista.append(p.flatten(entidad))    
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'recursos':j_string})    
        
    return Response(a_ret)