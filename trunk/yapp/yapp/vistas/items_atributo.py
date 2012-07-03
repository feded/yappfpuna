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
#        print "----------------------JSON----------------"
        
#        print request.json_body
        entidad = u.restore(request.json_body);
        dao = ItemAtributoDAO(request)
        item_dao = ItemDAO(request)
        item = item_dao.get_by_id(entidad["_item_id"])
        a_tipo_dao = AtributoTipoItemDAO(request)
#        print "--------------------------VALOR-------------------"
#        print entidad["_valor"]
        
        asignacion = ItemAtributo(entidad["_item_id"], entidad["_atributo_id"], entidad["_valor"] )
        dao.crear(asignacion);
        asignacion._item = item
        atributo = a_tipo_dao.get_by_id(entidad["_atributo_id"])
        asignacion._atributo = atributo 
        asignacion = ItemAtributoDTO(asignacion)
        p = Pickler(True, None)
        aRet = p.flatten(asignacion)
        item_dao.actualizarReferenciasItemNuevaVersion(item._id)
        return Response(json.dumps({'sucess': 'true', 'lista':aRet}))
    elif (request.method == 'GET'):
        item_id = request.GET.get('_item_id');
        p = Pickler(True, None)
#        print "--------ITEM ID-----------------------------------------------------------------------------------------------------"
#        print item_id
        if (item_id == 0 or item_id == "0" or item_id == None):
            j_string = p.flatten([])
            a_ret = json.dumps({'sucess': True, 'lista':j_string})
            return Response(a_ret)
        itemDAO = ItemDAO(request)
        item = itemDAO.get_by_id(item_id);
        atributoTipoItemDAO = AtributoTipoItemDAO(request)
        atributosTipoItem = atributoTipoItemDAO.get_atributos_by_tipo_id(item._tipo_item_id)
#        lista=[]
#        for atributo in atributosTipoItem:
#            dao = ItemAtributoDAO(request) 
#            actual = dao.get_query().filter(ItemAtributo._item_id == item.id , ItemAtributo._atributo_id == atributo._id).order_by(ItemAtributo._version.desc()).first();
#            if actual != None:
#                lista.append(actual)
#        aRet = []
#        print "'-------------------llnlistas---------------"
#        print len(lista)
#        if (len(lista)==0):

            
        dao = ItemAtributoDAO(request) 
        entidades = dao.get_query().filter(ItemAtributo._item_id == item._id).all()
       
        aRet = entidades
        
        for atributov in atributosTipoItem:
            if atributov._opcional == False:
                itemAtributo = ItemAtributo(item.id , atributov._id, atributov._defecto)
#                itemAtributo._item = item
#                itemAtributo._atributo = atributo
#                itemAtributoDTO = ItemAtributoDTO(itemAtributo)
                if len(entidades)==0:
                    dao.crear(itemAtributo);
                    aRet.append(itemAtributo)
#                else:
#                    for entidad in entidades:
#                        if (itemAtributo._atributo_id != entidad._atributo_id):
#                            aRet.append(itemAtributo)
        entidadesDTO = [];
        for entidad in aRet:
            dao = AtributoTipoItemDAO(request)
            atributo = dao.get_by_id(entidad._atributo_id)
            entidad._item = item
            entidad._atributo = atributo
            itemAtributoDTO = ItemAtributoDTO(entidad);
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
        item_dao = ItemDAO(request)
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
        
        