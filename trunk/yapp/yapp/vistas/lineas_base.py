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
from yapp.models.item.item import Item
from yapp.models.linea_base.linea_base import LineaBaseDTO, LineaBase
from yapp.vistas.items import actualizar_referencias_item
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

            dao_item = ItemDAO(request)
            nItems = []
            for item in items:
                n_item = Item(
                    item._item_id,
                    item._nombre,
                    item._tipo_item,
                    item._fase,
                    item._duracion,
                    item._descripcion,
                    item._condicionado,
                    item._version + 1,
                    "BLOQUEADO",
                    item._fecha_inicio,
                    item._completado, 
                    item._padre_item_id,
                    item._antecesor_item_id,
                    item._color)
                dao_item.crear(n_item)
                nItems.append(n_item)
                actualizar_referencias_item(n_item, item_dao, item._id, False)
                item_dao.actualizarEstadosFaseyProyecto(n_item)
                item_dao.actualizarReferenciasItemNuevaVersion(n_item._id)
            
            linea_base = LineaBase(objeto['_nombre'], objeto['_descripcion'], fase, nItems)              
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
            item_dao = ItemDAO(request)
            romper_linea_base(request, id_linea_base, item_dao)
            return Response(json.dumps({'sucess': 'true'}))
        except FaseNoEncontradaException , e :
            print e
            return Response(json.dumps({'sucess': 'false'}))
        return Response(json.dumps({'sucess': 'false'}))
    

def romper_linea_base(request, id_linea_base, item_dao, estado="ACTIVO"):
    dao = LineaBaseDAO(request)
    entidad = dao.get_by_id(id_linea_base);
    if entidad == None:
        return
    bases_afectadas = []
    for item in entidad._items:
        n_item = Item(
            item._item_id,
            item._nombre,
            item._tipo_item,
            item._fase,
            item._duracion,
            item._descripcion,
            item._condicionado,
            item._version + 1,
            estado,
            item._fecha_inicio,
            item._completado, 
            item._padre_item_id,
            item._antecesor_item_id,
            item._color)
        item_dao.crear(n_item)
        actualizar_referencias_item(n_item, item_dao, item._id, False)
        item_dao.actualizarEstadosFaseyProyecto(n_item)
        item_dao.actualizarReferenciasItemNuevaVersion(n_item._id)
        sucesores = item_dao.get_query().filter(Item._antecesor_item_id == n_item._id).all()
        for sucesor in sucesores:
            if sucesor._linea_base_id not in bases_afectadas:
                bases_afectadas.append(sucesor._linea_base_id)
            
    for id_linea_base in bases_afectadas:
        
        romper_linea_base(request, id_linea_base, item_dao, "REVISION")
    
    dao.borrar(entidad)


class FaseNoEncontradaException(Exception):
    def __str__(self):
        return "No se envio fase"
    
class NoItemLineaBaseException(Exception):
    def __str__(self):
        return "No se enviaron items para formar parte de la linea base"
