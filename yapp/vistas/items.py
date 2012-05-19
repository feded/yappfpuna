from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from sqlalchemy import Sequence
from yapp.daos.atributo_tipo_item_dao import AtributoTipoItemDAO
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.item_dao import ItemDAO
from yapp.daos.padre_item_dao import PadreItemDAO
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.models import DBSession
from yapp.models.fase.fase import FaseDTO
from yapp.models.item.item import Item, Item, ItemDTO
from yapp.models.item.padre_item import PadreItem
from yapp.models.tipo_item.tipo_item import TipoItem
import json
from yapp.models import DBSession


@view_config(route_name='crearListarItems')
def AG_atributos_tipos_item(request): 
    if (request.method == 'GET'):     
        #Parte cocho
        if request.GET.get('id_linea_base') != None:
            return get_items_con_linea_base(request)
        if request.GET.get('linea_base') == "false" and request.GET.get('id') != None:
            return get_items_sin_linea_base_con_fase(request);
        #END parte cocho
        rd = ItemDAO(request)
        fase_id = request.GET.get('id')
        entidades = rd.get_query().filter(Item._fase_id == fase_id).distinct(Item._item_id).all()
        entidades_item_id = []
        print "------------------"
        print "------------------"
        print "------------------"
        print len(entidades)
        print "------------------"
        print "------------------"
        for entidad in entidades:
            posible_actual = rd.get_query().filter(Item._item_id == entidad._item_id).order_by(Item._version.desc()).first();
            print "------------------"
            print "------------------"
            print "------------------"
            print posible_actual._item_id
            print posible_actual._estado
            
            print "------------------"
            print "------------------"
            if (posible_actual._estado != "ELIMINADO"):            
                if (len(entidades_item_id) == 0):
                    entidades_item_id.append(posible_actual)
                elif (entidades_item_id.count(posible_actual) == 0):
                    entidades_item_id.append(posible_actual)
             
        print entidades_item_id
        lista = [];
        padre_dao = PadreItemDAO(request)
        p = Pickler(True, None)
        for entidad in entidades_item_id:
            rd = ItemDAO(request)
            padre = rd.get_by_id(entidad._padre_item_id)
            antecesor = rd.get_by_id(entidad._antecesor_item_id)
            entidadLinda = ItemDTO(entidad)
            if padre != None:
                entidadLinda._padre = ItemDTO(padre)
            if antecesor != None:
                entidadLinda._antecesor = ItemDTO(antecesor)
            
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
        seq = Sequence('item_id_seq')
        item_id = DBSession.execute(seq)
        
        nuevo_item = Item(item_id, entidad["_nombre"], tipo_item, fase, entidad["_duracion"], entidad["_descripcion"], entidad["_condicionado"], entidad["_version"], entidad["_estado"], entidad["_fecha_inicio"], entidad["_fecha_fin"], padre, antecesor)
        itemDao = ItemDAO(request)
        itemDao.crear(nuevo_item)
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nuevo_item))

        j_string = p.flatten(lista)
        
        return Response(json.dumps({'sucess': 'true', 'lista':j_string}))
              
        
@view_config(route_name='editarEliminarItems')
def BM_atributo(request):
    if (request.method == 'PUT' or request.method == 'DELETE'):
        u = Unpickler()
        
        print "-------------JSONBODY-----------"
        print request.json_body
        
        entidad = u.restore(request.json_body);
        #id = request.params.matchdict['id'] 
        item_dao = ItemDAO(request);
        dao_fase = FaseDAO(request)
        print "------------------------"
        print entidad["_fase"]
        fase = dao_fase.get_by_id(entidad["_fase"]["_id"])
        
        dao_tipo_item = TipoItemDAO(request)
        tipo_item = dao_tipo_item.get_by_id((entidad["_tipo_item"]["_id"]))

        dao_item_ante = ItemDAO(request)
        if(entidad["_antecesor"] == ""):
            antecesor = None
        else:
            antecesor = dao_item_ante.get_by_id(entidad["_antecesor"]["_id"])._id
        print antecesor
        dao_item_padre = ItemDAO(request)
        if(entidad["_padre"] == ""):
            padre = None
        else:
            padre = dao_item_padre.get_by_id(entidad["_padre"]["_id"])._id
        item_viejo = item_dao.get_by_id(entidad["id"])
        
        nuevo_item = Item(item_viejo._item_id, entidad["_nombre"], tipo_item, fase, entidad["_duracion"], entidad["_descripcion"], entidad["_condicionado"], entidad["_version"], entidad["_estado"], entidad["_fecha_inicio"], entidad["_fecha_fin"], padre, antecesor)

        if request.method == "DELETE":
            nuevo_item._estado = "ELIMINADO"
            nuevo_item._version += 1
        item_dao.crear(nuevo_item);
        p = Pickler()
        aRet = p.flatten(ItemDTO(nuevo_item))
        return Response(json.dumps({'sucess': 'true', 'lista':aRet}))

#    elif (request.method == 'DELETE'):                            
#        u = Unpickler()
#        entidad = u.restore(request.json_body);
#       
#        print "-----ELIMINANDO ITEM-----"
#        item_dao = ItemDAO(request);
#        item = item_dao.get_by_id(entidad["id"])
#        item._estado = "ELIMINADO"
#        item._version = entidad["_version"] + 1
#        item_dao.crear(item)
#        return Response(json.dumps({'sucess': 'true'}))


def get_items_con_linea_base(request):
    print "Pide items de linea base"
    rd = ItemDAO(request)
    linea_base_id = request.GET.get('id_linea_base')
    entidades = rd.get_query().filter(Item._linea_base_id == linea_base_id).all()
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

def get_items_sin_linea_base_con_fase(request):
    rd = ItemDAO(request)
    linea_base_id = request.GET.get('id_linea_base')
    fase_id = request.GET.get('id')
    entidades = rd.get_query().filter(Item._linea_base_id == None, Item._fase_id == fase_id).all()
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
