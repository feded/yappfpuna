'''
Created on May 18, 2012

@author: arturo
'''
from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.item_dao import ItemDAO
from yapp.daos.linea_base_dao import LineaBaseDAO
from yapp.models.linea_base.linea_base import LineaBaseDTO, LineaBase
import json

@view_config(route_name='lineas_base')
def getAll(request):
    if (request.GET.get('id_fase') != None):
        return get_con_fase(request)
    dao = LineaBaseDAO(request)
    entidades = dao.get_all()
    lista = []
    p = Pickler(False, None)
    for entidad in entidades:
        dto = LineaBaseDTO(entidad)
        lista.append(p.flatten(dto))
        
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'entidades':j_string})
    return Response(a_ret)


def get_con_fase(request):
    dao = LineaBaseDAO(request)
    entidades = dao.get_query().filter(LineaBase._fase_id == request.GET.get('id_fase')).all()
    lista = []
    p = Pickler(False, None)
    for entidad in entidades:
        dto = LineaBaseDTO(entidad)
        lista.append(p.flatten(dto))
        
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'entidades':j_string})
    return Response(a_ret)


###########################
@view_config(route_name='lineas_base_rest')
def rest(request):
    
    if (request.method == 'POST'):
        try :
            u = Unpickler()
            objeto = u.restore(request.json_body);
            if (objeto['_fase'] == ''):
                raise FaseNoEncontradaException()
            fase_dao = FaseDAO(request)
            fase = fase_dao.get_by_id(objeto['_fase'])
            
            if (objeto['_items'] == None or objeto['_items'] == ''):
                raise NoItemLineaBaseException()
            item_dao = ItemDAO(request)
            items = []
            for item_id in objeto['_items']:
                items.append(item_dao.get_by_id(item_id))

            linea_base = LineaBase(objeto['_nombre'], objeto['_descripcion'], fase, items)              
            dao = LineaBaseDAO(request);
            dao.crear(linea_base);
            p = Pickler()
            aRet = p.flatten(linea_base)
            return Response(json.dumps({'sucess': 'true', 'entidades':aRet}))
        except FaseNoEncontradaException , e :
            print e
            return Response(json.dumps({'sucess': 'false'}))
        return Response(json.dumps({'sucess': 'false'}))
    if (request.method == "DELETE"):
        try:
            id_linea_base = request.matchdict['id']
            dao = LineaBaseDAO(request)
            entidad = dao.get_by_id(id_linea_base);
            dao.borrar(entidad)
            return Response(json.dumps({'sucess': 'true'}))
        except FaseNoEncontradaException , e :
            print e
            return Response(json.dumps({'sucess': 'false'}))
        return Response(json.dumps({'sucess': 'false'}))
    


class FaseNoEncontradaException(Exception):
    def __str__(self):
        return "No se envio fase"
    
class NoItemLineaBaseException(Exception):
    def __str__(self):
        return "No se enviaron items para formar parte de la linea base"
