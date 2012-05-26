
from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from yapp.daos.esquema_dao import EsquemaDAO
from yapp.models.esquema.esquema import Esquema
from yapp.daos.atributo_esquema_dao import AtributoEsquemaDAO
from yapp.models.esquema.atributo_esquema import AtributoEsquema
from yapp.daos.esquema_item_dao import EsquemaItemDAO
from yapp.models.esquema.esquema_item import EsquemaItem
import json
from yapp.models import DBSession
from yapp.filter import Validador


@view_config(route_name='crearListarEsquemas')
def AG_esquemas(request): 
    if (request.method == 'GET'):        
        rd = EsquemaDAO(request)
        fase_id = request.GET.get('id')
        entidades = rd.get_query().filter(Esquema._fase_id == fase_id).all()
#        print entidades
        lista = [];
        p = Pickler(True, None)
#        val = Validador(request);
        for entidad in entidades:
#            if val.es_visible(entidad):
            lista.append(p.flatten(entidad))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
#        print a_ret
        return Response(a_ret)
    elif (request.method == 'POST'):
        print "-----CREANDO Entidad-----"
        u = Unpickler()
        entidad = u.restore(request.json_body);
        esquemaDao = EsquemaDAO(request);
        
        print "Entidad" + str(entidad)                                       
        nueva_entidad = Esquema(entidad["_nombre"], entidad["_descripcion"], entidad["_etiqueta"], entidad["_color"], entidad["_fase_id"])

        print "Esta es: " + str(nueva_entidad)
        
        esquemaDao.crear(nueva_entidad);
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nueva_entidad))
        j_string = p.flatten(lista)
        
        return Response(json.dumps({'sucess': 'true', 'lista':j_string}))
              
        
@view_config(route_name='editarEliminarEsquemas')
def BM_esquemas(request):
    if (request.method == 'PUT'):
        u = Unpickler()
        entidad = u.restore(request.json_body);
        #id = request.params.matchdict['id']
        esquemaDao = EsquemaDAO(request);
        esquema =  esquemaDao.get_by_id(entidad["id"])
        esquema._nombre = entidad["_nombre"]
        esquema._descripcion = entidad["_descripcion"]
        esquema._etiqueta = entidad["_etiqueta"]
        esquema._color = entidad["_color"]
        esquema._fase_id = entidad["_fase_id"]
        esquemaDao.update(esquema);
        return Response(json.dumps({'sucess': 'true'}))

    elif (request.method == 'DELETE'):                            
        u = Unpickler()
        entidad = u.restore(request.json_body);
       
        print "-----ELIMINANDO ESQUEMA-----"
        esquemaDao = EsquemaDAO(request);
        esquema = esquemaDao.get_by_id(entidad["id"])
        esquemaDao.borrar(esquema)
        return Response(json.dumps({'sucess': 'true'}))


@view_config(route_name='crearListarAtributosEsquemas')
def AG_atributos(request): 
    if (request.method == 'GET'):        
        rd = AtributoEsquemaDAO(request)
        esquema_id = request.GET.get('id')
        entidades = rd.get_query().filter(AtributoEsquema._esquema_id == esquema_id).all()
#        print entidades
        lista = [];
        p = Pickler(True, None)
        for entidad in entidades:
            lista.append(p.flatten(entidad))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
#        print a_ret
        return Response(a_ret)
    elif (request.method == 'POST'):
        print "-----CREANDO Entidad-----"
        u = Unpickler()
        entidad = u.restore(request.json_body);
        atributoEsquemaDao = AtributoEsquemaDAO(request);
        
        print "Entidad" + str(entidad)                                       
        nueva_entidad = AtributoEsquema(entidad["_nombre"], entidad["_descripcion"], entidad["_tipo"], entidad["_valor"], entidad["_esquema_id"])

        print "Esta es: " + str(nueva_entidad)
        
        atributoEsquemaDao.crear(nueva_entidad);
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nueva_entidad))
        j_string = p.flatten(lista)
        
        return Response(json.dumps({'sucess': 'true', 'lista':j_string}))
              
        
@view_config(route_name='editarEliminarAtributosEsquemas')
def BM_atributos(request):
    if (request.method == 'PUT'):
        u = Unpickler()
        entidad = u.restore(request.json_body);
        #id = request.params.matchdict['id']
        atributoEsquemaDao = AtributoEsquemaDAO(request);
        atributoEsquema =  atributoEsquemaDao.get_by_id(entidad["id"])
        atributoEsquema._nombre = entidad["_nombre"]
        atributoEsquema._descripcion = entidad["_descripcion"]
        atributoEsquema._etiqueta = entidad["_tipo"]
        atributoEsquema._color = entidad["valor"]
        atributoEsquema._fase_id = entidad["esquema_id"]
        atributoEsquemaDao.update(atributoEsquema);
        return Response(json.dumps({'sucess': 'true'}))

    elif (request.method == 'DELETE'):                            
        u = Unpickler()
        entidad = u.restore(request.json_body);
       
        print "-----ELIMINANDO Atributo de Esquema-----"
        atributoEsquemaDao = EsquemaDAO(request);
        atributoEsquema = atributoEsquemaDao.get_by_id(entidad["id"])
        atributoEsquemaDao.borrar(atributoEsquema)
        return Response(json.dumps({'sucess': 'true'}))
    
@view_config(route_name='crearListarItemEsquemas')
def AG_item_esquema(request): 
    if (request.method == 'GET'):        
        rd = EsquemaItemDAO(request)
        esquema_id = request.GET.get('id')
        entidades = rd.get_query().filter(EsquemaItem._esquema_id == esquema_id).all()
#        print entidades
        lista = [];
        p = Pickler(True, None)
        for entidad in entidades:
            lista.append(p.flatten(entidad))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
#        print a_ret
        return Response(a_ret)
    elif (request.method == 'POST'):
        print "-----CREANDO Entidad-----"
        u = Unpickler()
        entidad = u.restore(request.json_body);
        esquemaItemDao = EsquemaItemDAO(request);
        
        print "Entidad" + str(entidad)                                       
        nueva_entidad = EsquemaItem(entidad["_esquema_id"], entidad["_item_id"])

        print "Esta es: " + str(nueva_entidad)
        
        esquemaItemDao.crear(nueva_entidad);
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nueva_entidad))
        j_string = p.flatten(lista)
        
        return Response(json.dumps({'sucess': 'true', 'lista':j_string}))
              
        
@view_config(route_name='editarEliminarItemEsquemas')
def BM_item_esquema(request):
    if (request.method == 'PUT'):
        u = Unpickler()
        entidad = u.restore(request.json_body);
        #id = request.params.matchdict['id']
        esquemaItemDao = EsquemaItemDAO(request);
        esquemaItem =  esquemaItemDao.get_by_id(entidad["id"])
        esquemaItem._esquema_id = entidad["_esquema_id"]
        esquemaItem._item_id = entidad["_item_id"]
        esquemaItemDao.update(esquemaItem);
        return Response(json.dumps({'sucess': 'true'}))

    elif (request.method == 'DELETE'):                            
        u = Unpickler()
        entidad = u.restore(request.json_body);
       
        print "-----ELIMINANDO Item de Esquema-----"
        esquemaItemDao = EsquemaDAO(request);
        esquemaItem = esquemaItemDao.get_by_id(entidad["id"])
        esquemaItemDao.borrar(esquemaItem)
        return Response(json.dumps({'sucess': 'true'}))