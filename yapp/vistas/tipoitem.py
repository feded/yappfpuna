from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.models.tipo_item.tipo_item import TipoItem
import json



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
        tipoItemDao = TipoItemDAO();
        nueva_entidad = TipoItem(entidad["_nombre"], entidad["_comentario"], entidad["_color"], entidad["_prefijo"], entidad["_condicionado"])
        tipoItemDao.crear(nueva_entidad);
        return Response(json.dumps({'sucess': 'true'}))
        
@view_config(route_name='eliminarTipo')
def delete_tipo(request):
        if (entidad["accion"] == "DELETE"):
            print "Eliminando rol"
            tipoItemDao = TipoItemDAO();
            tipoItem = dao.get_by_id(entidad["id"])
            tipoItemDao.borrar(tipoItem)
            return Response(json.dumps({'sucess': 'true'}))
        
@view_config(route_name='guardarTipo')
def save_tipo(request):
        if (entidad["accion"] == "PUT"):
           
            tipoItemDao = TipoItemDAO();
            tipoItemVieja = dao.get_by_id(entidad["id"])
            print tipoItemVieja
            if (isinstance(vieja, TipoItem)):
                    vieja._nombre = entidad["_nombre"]
                    vieja._comentario = entidad["_comentariod"]
                    vieja._color = entidad["_color"]
                    vieja._prefijo = entidad["_prefijo"]
                    TipoItemDAO.update(vieja);
                    return Response(json.dumps({'sucess': 'true'}))