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



@view_config(route_name='obtenerTipos')
def get_tipos_item(request):
    print request.method
    if (request.method == 'GET'):
        #or request.method == 'OPTIONS'  
        rd = TipoItemDAO()
        entidades = rd.get_query().all()
        lista = [];
        p = Pickler(True, None)
        for entidad in entidades:
            lista.append(p.flatten(entidad))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
        print a_ret
        return Response(a_ret)
    
@view_config(route_name='crearTipo')
def create_tipo(request):
    if (request.method == 'POST'):
        print "-------------------------"
        print "-----Recibiendo POST-----"
        print request.json_body
        print "-------------------------"
        u = Unpickler()
        entidad = u.restore(request.json_body);
        print "Entidad" + str(entidad)
        tipoItemDao = TipoItemDAO();
        nueva_entidad = TipoItem(entidad["_nombre"], entidad["_comentario"], entidad["_color"], entidad["_prefijo"], entidad["_condicionado"])
        tipoItemDao.crear(nueva_entidad);
        return Response(json.dumps({'sucess': 'true'}))
        
@view_config(route_name='eliminarTipo')
def delete_tipo(request):
        u = Unpickler()
        entidad = u.restore(request.json_body);
        
        print "Eliminando Tipo"
        tipoItemDao = TipoItemDAO();
        tipoItem = tipoItemDao.get_by_id(entidad["id"])
        tipoItemDao.borrar(tipoItem)
        return Response(json.dumps({'sucess': 'true'}))
        
@view_config(route_name='guardarTipo')
def save_tipo(request):
        u = Unpickler()
        entidad = u.restore(request.json_body);
       
           
        tipoItemDao = TipoItemDAO();
        tipoItemVieja = tipoItemDao.get_by_id(entidad["id"])
        print tipoItemVieja
        if (isinstance(vieja, TipoItem)):
                vieja._nombre = entidad["_nombre"]
                vieja._comentario = entidad["_comentariod"]
                vieja._color = entidad["_color"]
                vieja._prefijo = entidad["_prefijo"]
                vieja._condicionado = entidad["_condicionado"]
                TipoItemDAO.update(vieja);
                return Response(json.dumps({'sucess': 'true'}))


@view_config(route_name='obtenerAtributos')
def get_atributos_tipos_item(request): 
    if (request.method == 'GET'):
        #or request.method == 'OPTIONS'
        print  
        rd = AtributoTipoItemDAO()
        entidades = rd.get_query().all()
        lista = [];
        p = Pickler(True, None)
        for entidad in entidades:
            lista.append(p.flatten(entidad))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
        print a_ret
        return Response(a_ret)      
              
@view_config(route_name='crearAtributo')
def create_atributo(request):
    print "-----CREANDO ATRIBUTO-----"
    u = Unpickler()
    entidad = u.restore(request.json_body);
    atributoItemDao = AtributoTipoItemDAO();
    
    print "Entidad" + str(entidad)                                       
    nueva_entidad = AtributoTipoItem(entidad["_tipo"], entidad["_valor"], entidad["_descripcion"], entidad["_opcional"], entidad["_defecto"])
    
    print "Esta es: " + str(nueva_entidad)
    
    atributoItemDao.crear(nueva_entidad);
    return Response(json.dumps({'sucess': 'true'}))
        
@view_config(route_name='eliminarAtributo')
def delete_atributo(request):
        u = Unpickler()
        entidad = u.restore(request.json_body);
       
        print "-----ELIMINANDO ATRIBUTO-----"
        atributoItemDao = AtributoTipoItemDAO();
        atributo = atributoItemDao.get_by_id(entidad["id"])
        atributoItemDao.borrar(atributo)
        return Response(json.dumps({'sucess': 'true'}))
        
@view_config(route_name='guardarAtributo')
def save_atributo(request):
        u = Unpickler()
        entidad = u.restore(request.json_body);
        
        atributoItemDao = AtributoTipoItemDAO();
        tipoItemVieja = atributoItemDao.get_by_id(entidad["id"])
        print tipoItemVieja
        if (isinstance(vieja, TipoItem)):
                vieja._tipo = entidad["_tipo"]
                vieja._valor = entidad["_valor"]
                vieja._descripcion = entidad["_descripcion"]
                vieja._opcional = entidad["_opcional"]
                vieja._defecto = entidad["_defecto"]
                AtributoTipoItemDAO.update(vieja);
                return Response(json.dumps({'sucess': 'true'}))