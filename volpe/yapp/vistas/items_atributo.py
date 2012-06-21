from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from sqlalchemy import Sequence
from yapp.daos.atributo_tipo_item_dao import AtributoTipoItemDAO
from yapp.daos.base_dao import BaseDAO
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.item_dao import ItemDAO
from yapp.daos.item_unidad_dao import ItemUnidadDAO
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.models import DBSession, DBSession
from yapp.models.fase.fase import FaseDTO
from yapp.models.item.item import Item, Item, ItemDTO
from yapp.models.item.item_unidad_trabajo import ItemUnidadTrabajo,\
    ItemUnidadTrabajoDTO
from yapp.models.tipo_item.tipo_item import TipoItem
import json
from yapp.models.item.item_atributo import ItemAtributo, ItemAtributoDTO
from yapp.daos.item_atributo_dao import ItemAtributoDAO
from yapp.models.tipo_item.atributo_tipo_item import AtributoTipoItem


@view_config(route_name='asignarAtributoItem')
def guardar_obtener_atributo(request):
    if (request.method == 'POST'):
        u = Unpickler()
        print "----------------------JSON----------------"
        print request.json_body
        entidad = u.restore(request.json_body);
        
        asignacion = ItemAtributo(entidad["_item_id"], entidad["_atributo_id"], entidad["_valor"])
        dao = ItemAtributoDAO(request)
        dao.crear(asignacion);
        asignacion = ItemAtributoDTO(asignacion)
        p = Pickler()
        aRet = p.flatten(asignacion)
        return Response(json.dumps({'sucess': 'true', 'lista':aRet}))
    elif (request.method == 'GET'):
        item_id = request.GET.get('_item_id');
        itemDAO = ItemDAO(request)
        item = itemDAO.get_ultima_version_item_by_id(item_id);
        atributoTipoItemDAO = AtributoTipoItemDAO(request)
        atributosTipoItem = atributoTipoItemDAO.get_atributos_by_tipo_id(item._tipo_item_id)

            
        dao = ItemAtributoDAO(request) 
        entidades = dao.get_query().filter(ItemAtributo._item_id == item._id).all()
        p = Pickler()
        aRet = []
        if (len(entidades)==0):
            for atributo in atributosTipoItem:
                if atributo._opcional == False:
                    itemAtributo = ItemAtributo(item._id , atributo._id, atributo._defecto)
                    dao.crear(itemAtributo);
                    itemAtributo = ItemAtributoDTO(itemAtributo)
                    itemAtributo._item = ItemDTO(item)
                    itemAtributo._atributo = atributo
                    aRet.append(itemAtributo)
            j_string = p.flatten(aRet)
            a_ret = json.dumps({'sucess': True, 'lista':j_string})
            return Response(a_ret)
        entidadesDTO = [];
        for entidad in entidades:
            itemAtributoDTO = ItemAtributoDTO(entidad);
            itemAtributoDTO._item = ItemDTO(item)
            dao = AtributoTipoItemDAO(request)
            atributo = dao.get_by_id(entidad._atributo_id)
            itemAtributoDTO._atributo = atributo
            entidadesDTO.append(itemAtributoDTO)
        
        j_string = p.flatten(entidadesDTO)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
        
        return Response(a_ret)
@view_config(route_name='editarAtributoItem')
def editar_atributo_item(request):
    if (request.method == 'PUT'):
        u = Unpickler()
        
        print request.json_body
        entidad = u.restore(request.json_body);
        dao = ItemAtributoDAO(request)
        item_atributo = dao.get_by_id(entidad["id"])
        
        item_atributo._valor  = entidad["_valor"]
        
        dao.update(item_atributo);
        return Response(json.dumps({'sucess': 'true'}))
        
    elif (request.method == 'DELETE'):
        u = Unpickler()
        entidad = u.restore(request.json_body);
       
        dao = ItemAtributoDAO(request)
        item_unidad = dao.get_by_id(entidad["id"])
        dao.borrar(item_unidad)
        return Response(json.dumps({'sucess': 'true'}))
        
        