from yapp.daos.item_dao import ItemDAO
from yapp.models.item.item import Item
from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.daos.fase_dao import FaseDAO
from yapp.models.tipo_item.tipo_item import TipoItem
from yapp.models.item.item import Item
import json
from yapp.models import DBSession


@view_config(route_name='crearListarItems')
def AG_atributos_tipos_item(request): 
    if (request.method == 'GET'):        
        rd = ItemDAO()
        fase_id = request.GET.get('id')
        entidades = rd.get_query().filter(Item._fase_id == fase_id).all()
        print entidades
        lista = [];
        p = Pickler(True, None)
        for entidad in entidades:
            entidadLinda = ItemLindo(entidad._id, entidad._nombre, entidad._tipo_item, entidad._fase, entidad._duracion,entidad._condicionado, entidad._version, entidad._estado, entidad._fecha_inicio, entidad._fecha_fin, entidad._antecesor_id, entidad._padre) 
            lista.append(p.flatten(entidadLinda))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
        print a_ret
        return Response(a_ret)
    elif (request.method == 'POST'):
        u = Unpickler()
        entidad = u.restore(request.json_body);
        
        dao_fase = FaseDAO()
        fase = dao_fase.get_by_id(entidad["_fase"])
        
        dao_tipo_item = TipoItemDAO()
        tipo_item = dao_tipo_item.get_by_id(entidad["_tipo_item"])

        antecesor = entidad["_antecesor_id"]

        if(entidad["_antecesor_id"] == ""):
            antecesor = None
        if(entidad["_padre"] == ""):
            padre = None
        else:
            dao_padre = ItemDAO()
            padre = dao_padre.get_by_id(entidad["_padre"])
                                               
        nuevo_item = Item(entidad["_nombre"], tipo_item, fase, entidad["_duracion"],entidad["_condicionado"], entidad["_version"], entidad["_estado"], entidad["_fecha_inicio"], entidad["_fecha_fin"], antecesor,padre)
        itemDao = ItemDAO()
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
        atributoTipoItemDAO = AtributoTipoItemDAO();
        atributoItem =  atributoTipoItemDAO.get_by_id(entidad["id"])
        atributoItem._tipo = entidad["_tipo"]
        atributoItem._valor = entidad["_valor"]
        atributoItem._descripcion = entidad["_descripcion"]
        atributoItem._opcional = entidad["_opcional"]
        atributoItem._defecto = entidad["_defecto"]
        atributoTipoItemDAO.update(atributoItem);
        return Response(json.dumps({'sucess': 'true'}))

    elif (request.method == 'DELETE'):                            
        u = Unpickler()
        entidad = u.restore(request.json_body);
       
        print "-----ELIMINANDO ATRIBUTO-----"
        atributoItemDao = AtributoTipoItemDAO();
        atributo = atributoItemDao.get_by_id(entidad["id"])
        atributoItemDao.borrar(atributo)
        return Response(json.dumps({'sucess': 'true'}))

class ItemLindo:
    """
    @summary: Unidad de transporte para items.         
    """
    def __init__(self, _id, nombre, tipo_item, fase, duracion, condicionado, version, estado, fecha_inicio, fecha_fin, antecesor_id, padre):
        self._id = _id
        self._nombre = nombre;
        self._tipo_item = tipo_item;
        self._fase = fase;
        self._duracion = duracion;
        self._condicionado = condicionado;
        self._version = version;
        self._estado = estado;
        self._fecha_inicio = fecha_inicio;
        self._fecha_fin = fecha_fin;
        self._antecesor_id = antecesor_id;
        self._padre = padre;