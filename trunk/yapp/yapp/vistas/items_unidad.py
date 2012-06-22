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
from yapp.daos.unidad_trabajo_dao import UnidadTrabajoDAO


@view_config(route_name='asignarUnidadItem')
def asignar_unidad_intem(request):
    if (request.method == 'POST'):
        u = Unpickler()
        print "----------------------JSON----------------"
        print request.json_body
        entidad = u.restore(request.json_body);
        
        asignacion = ItemUnidadTrabajo(entidad["_item_id"], entidad["_unidad_id"], entidad["_cantidad"])
        dao = ItemUnidadDAO(request)
        dao.crear(asignacion);
        asignacion._item = None
        asignacion._unidad = None
        asignacion = ItemUnidadTrabajoDTO(asignacion)
        p = Pickler()
        aRet = p.flatten(asignacion)
        return Response(json.dumps({'sucess': 'true', 'lista':aRet}))
    elif (request.method == 'GET'):
        item_id = request.GET.get('_item_id');
        unidad_id = request.GET.get('_unidad_id')
        if (unidad_id == "" or unidad_id == None):
            unidad_id = None
            unidad = None
        else:
            unidadDAO = UnidadTrabajoDAO(request)
            unidad = unidadDAO.get_by_id(unidad_id)
        itemDAO = ItemDAO(request)
        item = itemDAO.get_by_id(item_id);
        dao = ItemUnidadDAO(request) 
        entidades = dao.get_query().filter(ItemUnidadTrabajo._item_id == item_id).all()
        entidadesDTO = [];
        for entidad in entidades:
            entidad._item = item
            if (unidad == None):
                unidadDAO = UnidadTrabajoDAO(request)
                unidad = unidadDAO.get_by_id(entidad._unidad_id)
            entidad._unidad = unidad
            itemUnidadDTO = ItemUnidadTrabajoDTO(entidad);
            entidadesDTO.append(itemUnidadDTO)
        p = Pickler()
        j_string = p.flatten(entidadesDTO)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
        
        return Response(a_ret)
@view_config(route_name='editarUnidadItem')
def editar_unidad_item(request):
    if (request.method == 'PUT'):
        u = Unpickler()
        
        print request.json_body
        entidad = u.restore(request.json_body);
        dao = ItemUnidadDAO(request)
        item_unidad = dao.get_by_id(entidad["id"])
        
        item_unidad._cantidad  = entidad["_cantidad"]
        
        dao.update(item_unidad);
        return Response(json.dumps({'sucess': 'true'}))
        
    elif (request.method == 'DELETE'):
        u = Unpickler()
        entidad = u.restore(request.json_body);
       
        dao = ItemUnidadDAO(request)
        item_unidad = dao.get_by_id(entidad["id"])
        dao.borrar(item_unidad)
        return Response(json.dumps({'sucess': 'true'}))
        
        