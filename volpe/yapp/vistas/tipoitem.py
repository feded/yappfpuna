from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.models.tipo_item.tipo_item import TipoItem
import json
from yapp.daos.atributo_tipo_item_dao import AtributoTipoItemDAO
from yapp.models.tipo_item.atributo_tipo_item import AtributoTipoItem
from yapp.models import DBSession



@view_config(route_name='obtenerTipos')
def get_tipos_item(request):
    """Metodo que maneja las llamadas para tipos
        - Retorna una lista si se envia GET
    """
#    print request.method
    if (request.method == 'GET'):
        #or request.method == 'OPTIONS'  
        rd = TipoItemDAO(request)
        entidades = rd.get_query().all()
        lista = [];
        p = Pickler(True, None)
        for entidad in entidades:
            lista.append(p.flatten(entidad))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
#        print a_ret
        return Response(a_ret)
    
@view_config(route_name='crearTipo')
def create_tipo(request):
    """Metodo que maneja las llamadas para tipos
        - Crea un tipo si se envia POST
    """
    if (request.method == 'POST'):
        print "-------------------------"
        print "-----Recibiendo POST-----"
        print request.json_body
        print "-------------------------"
        u = Unpickler()
        entidad = u.restore(request.json_body);
        print "Entidad" + str(entidad)
        tipoItemDao = TipoItemDAO(request);
        nueva_entidad = TipoItem(entidad["_nombre"], entidad["_comentario"], entidad["_color"], entidad["_prefijo"], entidad["_condicionado"])
        tipoItemDao.crear(nueva_entidad);
        lista = []
        p = Pickler()
        lista.append(p.flatten(nueva_entidad))
        j_string = p.flatten(lista)
        return Response(json.dumps({'sucess': 'true' , 'lista':j_string}))
        
@view_config(route_name='eliminarTipo')
def delete_tipo(request):
    """Metodo que maneja las llamadas para tipos
        - Delete un tipo si se envia DELETE
    """
    u = Unpickler()
    entidad = u.restore(request.json_body);
    
    print "Eliminando Tipo"
    tipoItemDao = TipoItemDAO(request);
    tipoItem = tipoItemDao.get_by_id(entidad["id"])
    tipoItemDao.borrar(tipoItem)
    return Response(json.dumps({'sucess': 'true'}))
        

@view_config(route_name='guardarTipo')
def save_tipo(request):
    """Metodo que maneja las llamadas para tipos
        - Delete un tipo si se envia POST
    """
    u = Unpickler()
    entidad = u.restore(request.json_body);    
    tipoItemDao = TipoItemDAO(request);
    tipoItem = tipoItemDao.get_by_id(entidad["id"])
    print tipoItem
    if (isinstance(tipoItem, TipoItem)):
            tipoItem._nombre = entidad["_nombre"]
            tipoItem._comentario = entidad["_comentario"]
            tipoItem._color = entidad["_color"]
            tipoItem._prefijo = entidad["_prefijo"]
            tipoItem._condicionado = entidad["_condicionado"]
            tipoItemDao.update(tipoItem);
            return Response(json.dumps({'sucess': 'true'}))


@view_config(route_name='crearListarAtributos')
def AG_atributos_tipos_item(request): 
    if (request.method == 'GET'):        
        rd = AtributoTipoItemDAO(request)
        entidades = rd.get_query().filter(AtributoTipoItem._tipo_item_id == request.GET.get('id')).all()

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
        print "-----CREANDO ATRIBUTO-----"
        u = Unpickler()
        entidad = u.restore(request.json_body);
        atributoItemDao = AtributoTipoItemDAO(request);
        
        print "Entidad" + str(entidad)                                       
        nueva_entidad = AtributoTipoItem(entidad["_tipo"], entidad["_valor"], entidad["_descripcion"], entidad["_opcional"], entidad["_defecto"], entidad["_tipo_item_id"])
        
        print "Esta es: " + str(nueva_entidad)
        
        atributoItemDao.crear(nueva_entidad);
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nueva_entidad))
        j_string = p.flatten(lista)
        
        return Response(json.dumps({'sucess': 'true', 'lista':j_string}))
              
        
@view_config(route_name='editarEliminarAtributos')
def BM_atributo(request):
    if (request.method == 'PUT'):
        u = Unpickler()
        entidad = u.restore(request.json_body);
        #id = request.params.matchdict['id']
        atributoTipoItemDAO = AtributoTipoItemDAO(request);
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
        atributoItemDao = AtributoTipoItemDAO(request);
        atributo = atributoItemDao.get_by_id(entidad["id"])
        atributoItemDao.borrar(atributo)
        return Response(json.dumps({'sucess': 'true'}))
        

   