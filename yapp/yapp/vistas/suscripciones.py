'''
Created on Apr 7, 2012

@author: arturo
'''
from compiler.ast import Not
from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.base_dao import SuscripcionDAO, NotificacionDAO
from yapp.daos.entidad_padre_dao import EntidadPadreDAO
from yapp.daos.rol_final_dao import RolFinalDAO
from yapp.models.historial import HistorialDTO
from yapp.models.suscripcion.notificacion import Notificacion
from yapp.models.suscripcion.suscripcion import SuscripcionDTO, Suscripcion
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
    if (request.method == 'POST'):
        return post_suscripcion(request);
    if (request.method == 'PUT'):
        return put_suscripcion(request);
    return {};

def get_suscripciones(request):
    """B{Metodo que retorna una lista de suscripciones}
        - B{Parametros:} 
            - B{Request:} peticion enviada por el navegador
        - B{Retorna:}
            - B{JSON:} Json compuesto, por un boolean B{sucess} 
            con el estado de la operacion y B{suscrpciones} un json de suscripciones.
    """
    rol = request.session['user']
    dao = SuscripcionDAO(request)
    if (rol._id == 1):
        entidades = dao.get_all()
    else:
        entidades = dao.get_query().filter(Suscripcion._rol_id == rol._id).all(); 
    lista = [];
    p = Pickler()
    for entidad in entidades:
        n_entidad = SuscripcionDTO(entidad)
        lista.append(p.flatten(n_entidad))
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'suscripciones':j_string})
    return Response(a_ret)

def post_suscripcion(request):
    u = Unpickler()
    objeto = u.restore(request.json_body);
    print "---------------"
    print request.json_body
    print "---------------"
    dao = SuscripcionDAO(request);
    if objeto['_entidad_padre'] == None:
        entidad_padre = None
    else:
        entidad_padre = EntidadPadreDAO(request).get_by_id(objeto['_entidad_padre'])
    if objeto['_rol_final'] == None:
        rol = None
    else:
        rol = RolFinalDAO(request).get_by_id(objeto['_rol_final']);
    entidad = Suscripcion(objeto['_nombre'], entidad_padre, rol)
    dao.crear(entidad);
    p = Pickler()
    aRet = p.flatten(entidad)
    return Response(json.dumps({'sucess': 'true', 'suscripciones':aRet}))

def put_suscripcion(request):
    u = Unpickler()
    objeto = u.restore(request.json_body);
    dao = SuscripcionDAO(request);
    entidad = get_entidad_padre(request, objeto)
    rol = get_rol_final(request, objeto)
    a_editar = dao.get_by_id(request.matchdict['id_suscripcion'])
    a_editar._nombre = objeto['_nombre']
    a_editar._entidad_padre = entidad
    a_editar._rol = rol
    dao.update(a_editar);
    p = Pickler()
    aRet = p.flatten(entidad)
    return Response(json.dumps({'sucess': 'true'}))

def get_entidad_padre(request, objeto):
    dao = EntidadPadreDAO(request);
    if (objeto['_entidad_padre'] == ""):
        return None
    if (isinstance(objeto['_entidad_padre'], dict)):
        return dao.get_by_id(objeto['_entidad_padre']['_id'])
    else:
        return dao.get_by_id(objeto['_entidad_padre']);

def get_rol_final(request, objeto):
    dao = RolFinalDAO(request)
    if (objeto['_rol_final'] == ""):
        return None
    if (isinstance(objeto['_rol_final'], dict)):
        return dao.get_by_id(objeto['_rol_final']['_id'])
    else:
        return dao.get_by_id(objeto['_rol_final']);

def eliminar_suscripcion(request, id):
    """B{Metodo que elimina una suscripcion}
        - B{Parametros:} 
            - B{Request:} peticion enviada por el navegador
            - B{ID:} id de la suscripcion a eliminar
        - B{Retorna:}
            - B{JSON:} Json compuesto, por un boolean B{sucess} 
            con el estado de la operacion y B{suscrpciones} un json de suscripciones.
    """
    dao = SuscripcionDAO(request)
    entidad = dao.get_by_id(id)
    dao.borrar(entidad)
    lista = [];
    p = Pickler()
    j_string = p.flatten(entidad)
    a_ret = json.dumps({'sucess': 'true', 'suscripciones':j_string})
    return Response(a_ret)


@view_config(route_name='notificaciones')
def get_notificaciones(request):
    id_suscripcion = request.GET.get('id');
    dao = NotificacionDAO(request)
    entidades = dao.get_query().filter(Notificacion._suscripcion_id == id_suscripcion, Notificacion._leido == False).all();
    lista = []
    p = Pickler(False, None)
    for notificacion in entidades:
        dto = HistorialDTO(notificacion._historial);
        lista.append(p.flatten(dto))
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'lista':j_string})
    return Response(a_ret)
