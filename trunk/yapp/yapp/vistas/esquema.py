
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
import json
from yapp.models import DBSession
from yapp.filter import Validador


@view_config(route_name='crearListarEsquemas')
def AG_esquemas(request): 
    if (request.method == 'GET'):        
        rd = EsquemaDAO()
        fase_id = request.GET.get('id')
        entidades = rd.get_query().filter(Esquema._fase_id == fase_id).all()
        print entidades
        lista = [];
        p = Pickler(True, None)
        val = Validador(request);
        for entidad in entidades:
            if val.es_visible(entidad):
                lista.append(p.flatten(entidad))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
        print a_ret
        return Response(a_ret)
    elif (request.method == 'POST'):
        print "-----CREANDO Entidad-----"
        u = Unpickler()
        entidad = u.restore(request.json_body);
        esquemaDao = EsquemaDAO();
        
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
        esquemaDao = EsquemaDAO();
        esquema =  esquemaDao.get_by_id(entidad["id"])
        esquema._tipo = entidad["_tipo"]
        esquema._valor = entidad["_valor"]
        esquema._descripcion = entidad["_descripcion"]
        esquema._opcional = entidad["_opcional"]
        esquema._defecto = entidad["_defecto"]
        esquemaDao.update(esquema);
        return Response(json.dumps({'sucess': 'true'}))

    elif (request.method == 'DELETE'):                            
        u = Unpickler()
        entidad = u.restore(request.json_body);
       
        print "-----ELIMINANDO ESQUEMA-----"
        esquemaDao = EsquemaDAO();
        esquema = esquemaDao.get_by_id(entidad["id"])
        esquemaDao.borrar(esquema)
        return Response(json.dumps({'sucess': 'true'}))


@view_config(route_name='crearListarAtributosEsquemas')
def AG_atributos(request): 
    if (request.method == 'GET'):        
        rd = AtributoEsquemaDAO()
        esquema_id = request.GET.get('id')
        entidades = rd.get_query().filter(AtributoEsquema._esquema_id == esquema_id).all()
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
        print "-----CREANDO Entidad-----"
        u = Unpickler()
        entidad = u.restore(request.json_body);
        atributoEsquemaDao = AtributoEsquemaDAO();
        
        print "Entidad" + str(entidad)                                       
        nueva_entidad = AtributoEsquema(entidad["_nombre"], entidad["_descripcion"], entidad["_etiqueta"], entidad["_color"], entidad["_fase_id"])

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
        atributoEsquemaDao = AtributoEsquemaDAO();
        atributoEsquema =  atributoEsquemaDao.get_by_id(entidad["id"])
        atributoEsquema._tipo = entidad["_tipo"]
        atributoEsquema._valor = entidad["_valor"]
        atributoEsquema._descripcion = entidad["_descripcion"]
        atributoEsquema._opcional = entidad["_opcional"]
        atributoEsquema._defecto = entidad["_defecto"]
        atributoEsquemaDao.update(atributoEsquema);
        return Response(json.dumps({'sucess': 'true'}))

    elif (request.method == 'DELETE'):                            
        u = Unpickler()
        entidad = u.restore(request.json_body);
       
        print "-----ELIMINANDO ESQUEMA-----"
        atributoEsquemaDao = EsquemaDAO();
        atributoEsquema = atributoEsquemaDao.get_by_id(entidad["id"])
        atributoEsquemaDao.borrar(atributoEsquema)
        return Response(json.dumps({'sucess': 'true'}))