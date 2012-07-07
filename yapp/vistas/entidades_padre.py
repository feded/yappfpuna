'''
Created on May 4, 2012

@author: arturo
'''
from jsonpickle.pickler import Pickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.entidad_padre_dao import EntidadPadreDAO
from yapp.daos.esquema_dao import EsquemaDAO
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.item_dao import ItemDAO
from yapp.daos.privilegio_dao import PrivilegioDAO
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.filter import P_ITEM, P_ESQUEMA, P_FASE, P_PROYECTO, P_ACTIVARITEM, \
    P_INICIARPROYECTO
from yapp.models.entidad_padre import EntidadPadreDTO
from yapp.models.proyecto.proyecto import ProyectoDTO
from yapp.vistas.privilegios import get_entidades
import json
@view_config(route_name='entidades_padre')
def get_entidades_padre(request):
    """B{Metodo que retorna una lista de entidades finales}
        - B{Parametros:} 
            - B{Request:} peticion enviada por el navegador
        - B{Retorna:}
            - B{JSON:} Json compuesto, por un boolean B{sucess} 
            con el estado de la operacion y B{entidades} un json de entidades.
    """
    if (request.method == 'GET'):
        id_entidad = request.GET.get('id')
        entidadDAO = PrivilegioDAO(request);
        entidad = entidadDAO.get_by_id(id_entidad);
        if (id_entidad == '0' or id_entidad == None):
            return get_entidades(request);
        if (entidad._nombre == P_PROYECTO or entidad._nombre == P_INICIARPROYECTO):
            return get_proyectos(request);
        if (entidad._nombre == P_FASE):
            return get_fases(request)
        if (entidad._nombre == P_ESQUEMA):
            return get_esquemas(request)
        if (entidad._nombre == P_ITEM or entidad._nombre == P_ACTIVARITEM):
            return get_items(request);
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
    dao = EntidadPadreDAO(request)
    entidades = dao.get_all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
        lista.append(p.flatten(entidad))
    
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'entidades':j_string})
    return Response(a_ret)

def get_proyectos(request):
    proyectoDAO = ProyectoDAO(request);
    entidades = proyectoDAO.get_all();
    p = Pickler();
    lista = [];
    for entidad in entidades:
        lista.append(p.flatten(ProyectoDTO(entidad)));
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'entidades':j_string})
    return Response(a_ret)

def get_fases(request):
    dao = FaseDAO(request);
    entidades = dao.get_all();
    p = Pickler();
    lista = [];
    for entidad in entidades:
        lista.append(p.flatten(EntidadPadreDTO(entidad)));
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'entidades':j_string})
    return Response(a_ret)

def get_items(request):
    dao = ItemDAO(request)
    entidades = dao.get_items_globales();
    p = Pickler();
    lista = [];
    for entidad in entidades:
        lista.append(p.flatten(EntidadPadreDTO(entidad)));
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'entidades':j_string})
    return Response(a_ret)

def get_esquemas(request):
    dao = EsquemaDAO(request);
    entidades = dao.get_all();
    p = Pickler();
    lista = [];
    for entidad in entidades:
        lista.append(p.flatten(entidad));
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'entidades':j_string})
    return Response(a_ret)