from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from yapp.daos.atributo_tipo_item_dao import AtributoTipoItemDAO
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.item_dao import ItemDAO
from yapp.daos.padre_item_dao import PadreItemDAO
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.models import DBSession
from yapp.models.item.item import Item, Item, ItemDTO
from yapp.models.item.padre_item import PadreItem
from yapp.models.tipo_item.tipo_item import TipoItem
import json


@view_config(route_name='crearListarItems')
def AG_atributos_tipos_item(request): 
    if (request.method == 'GET'):        
        if (request.GET.get('id_linea_base') != None):
            return get_items_con_linea_base(request)
        rd = ItemDAO(request)
        fase_id = request.GET.get('id')
        entidades = rd.get_query().filter(Item._fase_id == fase_id).all()
        print entidades
        lista = [];
        padre_dao = PadreItemDAO(request)
        p = Pickler(True, None)
        for entidad in entidades:
            rd = ItemDAO(request)
            padre = rd.get_by_id(entidad._padre_item_id)
            antecesor = rd.get_by_id(entidad._antecesor_item_id)
            entidadLinda = ItemLindo(entidad._id, entidad._nombre, entidad._tipo_item, entidad._fase, entidad._duracion, entidad._descripcion, entidad._condicionado, entidad._version, entidad._estado, entidad._fecha_inicio, entidad._fecha_fin, padre, antecesor) 
            lista.append(p.flatten(entidadLinda))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
        
        return Response(a_ret)
    elif (request.method == 'POST'):
        u = Unpickler()
        print "----------------------JSON----------------"
        print request.json_body
        entidad = u.restore(request.json_body);
        
        dao_fase = FaseDAO(request)
        fase = dao_fase.get_by_id(entidad["_fase"])
        
        dao_tipo_item = TipoItemDAO(request)
        tipo_item = dao_tipo_item.get_by_id(entidad["_tipo_item"])

        dao_item_ante = ItemDAO(request)
        if(entidad["_antecesor"] == ""):
            antecesor = None
        else:
            antecesor = dao_item_ante.get_by_id(entidad["_antecesor"])._id
        print antecesor
        dao_item_padre = ItemDAO(request)
        if(entidad["_padre"] == ""):
            padre = None
        else:
            padre = dao_item_padre.get_by_id(entidad["_padre"])._id
                                  
        nuevo_item = Item(entidad["_nombre"], tipo_item, fase, entidad["_duracion"], entidad["_descripcion"], entidad["_condicionado"], entidad["_version"], entidad["_estado"], entidad["_fecha_inicio"], entidad["_fecha_fin"], padre, antecesor)
        itemDao = ItemDAO(request)
        print "--------------------------"
        print nuevo_item._antecesor_item_id
        print "--------------------------"
        itemDao.crear(nuevo_item)
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nuevo_item))

        j_string = p.flatten(lista)
        
        return Response(json.dumps({'sucess': 'true', 'lista':j_string}))
              
        
@view_config(route_name='editarEliminarItems')
def BM_atributo(request):
    if (request.method == 'PUT'):
        u = Unpickler()
        entidad = u.restore(request.json_body);
        #id = request.params.matchdict['id'] 
        item_dao = ItemDAO(request);
        dao_fase = FaseDAO(request)
        fase = dao_fase.get_by_id(entidad["_fase"])
        
        dao_tipo_item = TipoItemDAO(request)
        tipo_item = dao_tipo_item.get_by_id(entidad["_tipo_item"])

        dao_item_ante = ItemDAO(request)
        if(entidad["_antecesor"] == ""):
            antecesor = None
        else:
            antecesor = dao_item_ante.get_by_id(entidad["_antecesor"])._id
        print antecesor
        dao_item_padre = ItemDAO(request)
        if(entidad["_padre"] == ""):
            padre = None
        else:
            padre = dao_item_padre.get_by_id(entidad["_padre"])._id
        item =  item_dao.get_by_id(entidad["id"])
        item._nombre = entidad["_nombre"] 
        item._tipo_item = tipo_item
        item._fase = fase
        item._duracion = entidad["_duracion"]
        item._descripcion = entidad["_descripcion"]
        item._condicionado = entidad["_condicionado"]
        item._version = entidad["_version"]
        item._estado = entidad["_estado"]
        item._padre_item_id = padre
        item._atencesor_item_id = antecesor
        item_dao.update(item);
        return Response(json.dumps({'sucess': 'true'}))

    elif (request.method == 'DELETE'):                            
        u = Unpickler()
        entidad = u.restore(request.json_body);
       
        print "-----ELIMINANDO ITEM-----"
        item_dao = ItemDAO(request);
        item = item_dao.get_by_id(entidad["id"])
        item_dao.borrar(item)
        return Response(json.dumps({'sucess': 'true'}))


def get_items_con_linea_base(request):
    rd = ItemDAO(request)
    linea_base_id = request.GET.get('id_linea_base')
    entidades = rd.get_query().filter(Item._linea_base_id == linea_base_id).all()
    lista = [];
    padre_dao = PadreItemDAO(request)
    p = Pickler(True, None)
    for entidad in entidades:
        padre_hijo = padre_dao.get_query().filter(PadreItem._hijo_id == entidad._id).first()
        rd = ItemDAO(request)
        padre = rd.get_by_id(padre_hijo._padre_id)
        dto = ItemDTO(entidad) 
        lista.append(p.flatten(dto))
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': True, 'lista':j_string})
    
    return Response(a_ret)

class ItemLindo:
    """
    @summary: Unidad de transporte para items.         
    """
    def __init__(self, _id, nombre, tipo_item, fase, duracion, descripcion, condicionado, version, estado, fecha_inicio, fecha_fin, padre, antecesor):
        self._id = _id
        self._nombre = nombre;
        self._tipo_item = tipo_item;
        self._fase = fase;
        self._duracion = duracion;
        self._descripcion = descripcion;
        self._condicionado = condicionado;
        self._version = version;
        self._estado = estado;
        self._fecha_inicio = fecha_inicio;
        self._fecha_fin = fecha_fin;
        self._padre = padre;
        self._antecesor = antecesor