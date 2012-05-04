from yapp.daos.item_dao import ItemDAO
from yapp.models.item.item import Item
from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.models.tipo_item.tipo_item import TipoItem
import json
from yapp.models import DBSession


@view_config(route_name='crearListarItems')
def AG_atributos_tipos_item(request): 
    if (request.method == 'GET'):        
        rd = ItemDAO()
        fase_id = request.GET.get('id')
        entidades = rd.get_query().filter(Item._fase_id == fase_id).all()
       # entidades = rd.get_query().filter(Item._tipo_item_id == request.GET.get('id')).all()
#        entidades = rd.get_query().all()
        print entidades
        lista = [];
        p = Pickler(True, None)
        for entidad in entidades:
            lista.append(p.flatten(entidad))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
        print a_ret
        return Response(a_ret)
    elif (request.method == 'POST'):
        print "-----CREANDO ITEM-----"
        u = Unpickler()
        entidad = u.restore(request.json_body);
        itemDao = ItemDAO();
        
        print "Entidad" + str(entidad)                                       
        nueva_entidad = Item(entidad["_tipo"], entidad["_valor"], entidad["_descripcion"], entidad["_opcional"], entidad["_defecto"], entidad["_tipo_item_id"])
        
        print "Esta es: " + str(nueva_entidad)
        
        itemDao.crear(nueva_entidad);
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nueva_entidad))
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