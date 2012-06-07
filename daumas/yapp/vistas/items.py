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
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.models import DBSession
from yapp.models.fase.fase import FaseDTO
from yapp.models.item.item import Item, Item, ItemDTO
from yapp.models.tipo_item.tipo_item import TipoItem
import json
from yapp.models import DBSession
from yapp.models.item.item_unidad_trabajo import ItemUnidadTrabajo
from yapp.daos.base_dao import BaseDAO
from yapp.daos.item_unidad_dao import ItemUnidadDAO


@view_config(route_name='crearListarItems')
def ag_atributos_tipos_item(request): 
    if (request.method == 'GET'):     
        #Parte cocho
        if request.GET.get('id_linea_base') != None:
            return get_items_con_linea_base(request)
        if request.GET.get('linea_base') == "false" and request.GET.get('id') != None:
            return get_items_sin_linea_base_con_fase(request);
        #END parte cocho
        item_dao = ItemDAO(request)
        fase_id = request.GET.get('id')
        entidades_item_id = item_dao.get_items_fase(fase_id);
        lista = [];
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
#   aca tenemos que eliminar la linea base y cambiar los estados de los demas items a activos
#        if (entidad['_action'] == "PUT"):
            
            
            
            
            
            
        dao_fase = FaseDAO(request)
        fase = dao_fase.get_by_id(entidad["_fase"])
        
        dao_tipo_item = TipoItemDAO(request)
        tipo_item = dao_tipo_item.get_by_id(entidad["_tipo_item"])

        dao_item_ante = ItemDAO(request)
        if(entidad["_antecesor"] == "" or  entidad["_antecesor"] == None):
            antecesor = None
        else:
            antecesor = dao_item_ante.get_by_id(entidad["_antecesor"])._id
        print antecesor
        dao_item_padre = ItemDAO(request)
        if(entidad["_padre"] == "" or  entidad["_padre"] == None):
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
def bm_atributo(request):
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
        if(entidad["_antecesor"] == "" or  entidad["_antecesor"] == None):
            antecesor = None
        else:
            antecesor = dao_item_ante.get_by_id(entidad["_antecesor"])._id
        print antecesor
        dao_item_padre = ItemDAO(request)
        if(entidad["_padre"] == "" or  entidad["_padre"] == None):
            padre = None
        else:
            padre = dao_item_padre.get_by_id(entidad["_padre"])._id
        item_viejo = item_dao.get_by_id(entidad["id"])
        
        nuevo_item = Item(item_viejo._item_id, entidad["_nombre"], tipo_item, fase, entidad["_duracion"], entidad["_descripcion"], entidad["_condicionado"], entidad["_version"], entidad["_estado"], entidad["_fecha_inicio"], entidad["_fecha_fin"], padre, antecesor)

        if request.method == "DELETE":
            nuevo_item._estado = "ELIMINADO"
            nuevo_item._version += 1
        item_dao.crear(nuevo_item);
        p = Pickler()
        aRet = p.flatten(ItemDTO(nuevo_item))
        return Response(json.dumps({'sucess': 'true', 'lista':aRet}))



        


def get_items_con_linea_base(request):
    print "Pide items de linea base"
    rd = ItemDAO(request)
    linea_base_id = request.GET.get('id_linea_base')
    entidades = rd.get_query().filter(Item._linea_base_id == linea_base_id).all()
    lista = [];
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
