'''
Created on Apr 7, 2012

@author: arturo
'''
from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.entidad_padre_dao import EntidadPadreDAO
from yapp.daos.suscripcion_dao import SuscripcionDAO
import json

@view_config(route_name='suscripciones')
def suscripciones(request):
    """
    B{Metodo que maneja llamadas rest a /suscripciones/id}.
        - B{GET}: llama al afuncion L{get_suscripciones(request)}
        - B{PUT}: llama a la funcion L{crear_suscripcion(request)}
        - B{POST}: llama a la funcion L{modificar_suscripcion(request, id, json)}
        - B{DELETE}: llama a la funcion L{eliminar_suscripcion(request, id)}
        """
    if (request.method == 'GET') :
        return get_suscripciones(request);
    if (request.method == 'DELETE') :
        id_suscricpion = request.matchdict['id_suscripcion']
        return eliminar_suscripcion(request, id_suscricpion);
    return {};

def get_suscripciones(request):
    """B{Metodo que retorna una lista de suscripciones}
        - B{Parametros:} 
            - B{Request:} peticion enviada por el navegador
        - B{Retorna:}
            - B{JSON:} Json compuesto, por un boolean B{sucess} 
            con el estado de la operacion y B{suscrpciones} un json de suscripciones.
    """
    dao = SuscripcionDAO()
    entidades = dao.get_all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
        n_entidad = SuscrpcionesLindos(entidad._id, entidad._nombre, entidad._rol_final, entidad._entidad)
        lista.append(p.flatten(n_entidad))
        
    
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'suscripciones':j_string})
    return Response(a_ret)

def eliminar_suscripcion(request, id):
    """B{Metodo que elimina una suscripcion}
        - B{Parametros:} 
            - B{Request:} peticion enviada por el navegador
            - B{ID:} id de la suscripcion a eliminar
        - B{Retorna:}
            - B{JSON:} Json compuesto, por un boolean B{sucess} 
            con el estado de la operacion y B{suscrpciones} un json de suscripciones.
    """
    dao = SuscripcionDAO()
    entidad = dao.get_by_id(id)
    dao.borrar(entidad)
    lista = [];
    p = Pickler()
    j_string = p.flatten(entidad)
    a_ret = json.dumps({'sucess': 'true', 'suscripciones':j_string})
    return Response(a_ret)

@view_config(route_name='entidades_padre')
def get_entidades_padre(request):
    """B{Metodo que retorna una lista de entidades finales}
        - B{Parametros:} 
            - B{Request:} peticion enviada por el navegador
        - B{Retorna:}
            - B{JSON:} Json compuesto, por un boolean B{sucess} 
            con el estado de la operacion y B{entidades} un json de entidades.
    """
    get_entidades(request)
    if (request.method == 'GET'):
        return get_entidades(request);
    return {}
        
def get_entidades(request):
    """B{Metodo que retorna una lista de suscripciones}
        - B{Parametros:} 
            - B{Request:} peticion enviada por el navegador
        - B{Retorna:}
            - B{JSON:} Json compuesto, por un boolean B{sucess} 
            con el estado de la operacion y B{suscripciones} un json de suscripciones.
    """
    dao = EntidadPadreDAO()
    entidades = dao.get_all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
        lista.append(p.flatten(entidad))
    
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'entidades':j_string})
    return Response(a_ret)

class SuscrpcionesLindos:
    def __init__(self, _id, nombre, rol, entidad):
        self._id = _id;
        self._nombre = nombre;
        self._rol_final = rol;
        self._entidad_padre = entidad;

