from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.models.tipo_item.tipo_item import TipoItem,TipoItemDTO
import json
from yapp.daos.atributo_tipo_item_dao import AtributoTipoItemDAO
from yapp.models.tipo_item.atributo_tipo_item import AtributoTipoItem
from yapp.daos.item_dao import ItemDAO
from yapp.daos.item_atributo_dao import ItemAtributoDAO
from yapp.models.item.item_atributo import ItemAtributo
from yapp.daos.tipo_fase_dao import TipoFaseDAO
from yapp.models.fase.tipo_fase import TipoFase

@view_config(route_name='obtenerTipos')
def get_tipos_item(request):
    if (request.method == 'GET'):
        proyecto_id = request.GET.get('id_proyecto')
        fase_id = request.GET.get('id_fase')
        rd = TipoItemDAO(request)
        if (fase_id!= None):
            entidades =[]
            tipo_fase_dao = TipoFaseDAO(request)
            tipos = tipo_fase_dao.get_query().filter(TipoFase._fase_id == fase_id).all()
            for tipo in tipos:
                entidades.append(tipo._tipo)
        else:
            entidades = rd.get_query().filter(TipoItem._proyecto_id == proyecto_id).all()
        lista = [];
        p = Pickler(True, None)
        for entidad in entidades:
            a = TipoItemDTO(entidad)
            lista.append(p.flatten(a))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
        return Response(a_ret)
    
@view_config(route_name='crearTipo')
def create_tipo(request):
    if (request.method == 'POST'):
        u = Unpickler()
        entidad = u.restore(request.json_body);
        tipoItemDao = TipoItemDAO(request);
        proyectoDao = ProyectoDAO(request)
        proyecto = proyectoDao.get_by_id(entidad["_proyecto_id"])
        topos_tipos = tipoItemDao.get_query().filter(TipoItem._proyecto_id == entidad["_proyecto_id"]).all()
        for tipo in topos_tipos:
            if tipo._prefijo == entidad["_prefijo"]:
                return Response(json.dumps({'sucess': 'false' , 'lista':'Prefijo ya Asignado'}))
        nueva_entidad = TipoItem(entidad["_nombre"], entidad["_comentario"], entidad["_color"], entidad["_prefijo"], entidad["_condicionado"],proyecto)
        tipoItemDao.crear(nueva_entidad);
        lista = []
        p = Pickler()
        a = TipoItemDTO(nueva_entidad)
        lista.append(p.flatten(a))
        j_string = p.flatten(lista)
        return Response(json.dumps({'sucess': 'true' , 'lista':j_string}))
        
@view_config(route_name='eliminarTipo')
def delete_tipo(request):
    u = Unpickler()
    entidad = u.restore(request.json_body);
    
    tipoItemDao = TipoItemDAO(request);
    tipoItem = tipoItemDao.get_by_id(entidad["id"])
    
    rd = TipoFaseDAO(request)
    temp = rd.get_query().filter(TipoFase._tipo_id == entidad["id"]).first()
    if temp == None:
        tipoItemDao.borrar(tipoItem)
        return Response(json.dumps({'sucess': 'true'}))
    else:
        return Response(json.dumps({'sucess': 'false' , "message": "El tipo de item se encuentra asociado a una fase" }))

@view_config(route_name='guardarTipo')
def update_tipo(request):
    u = Unpickler()
    entidad = u.restore(request.json_body);    
    tipoItemDao = TipoItemDAO(request);
    tipoItem = tipoItemDao.get_by_id(entidad["id"])
    if (isinstance(tipoItem, TipoItem)):
            tipoItem._nombre = entidad["_nombre"]
            tipoItem._comentario = entidad["_comentario"]
            tipoItem._color = entidad["_color"]
            tipoItem._prefijo = entidad["_prefijo"]
            tipoItem._condicionado = entidad["_condicionado"]
            tipoItemDao.update(tipoItem);
            lista = []
            p = Pickler()
            a = TipoItemDTO(tipoItem)
            lista.append(p.flatten(a))
            j_string = p.flatten(lista)
            return Response(json.dumps({'sucess': 'true', 'lista':j_string}))


@view_config(route_name='crearListarAtributos')
def AG_atributos_tipos_item(request): 
    if (request.method == 'GET'):
        if request.GET.get('_item_id') != None:
            item_id = request.GET.get('_item_id');
            itemDAO = ItemDAO(request)
            item = itemDAO.get_ultima_version_item_by_id(item_id);
            atributoTipoItemDAO = AtributoTipoItemDAO(request)
            atributosTipoItem = atributoTipoItemDAO.get_atributos_by_tipo_id(item._tipo_item_id)
    
                
            dao = ItemAtributoDAO(request) 
            entidades = dao.get_query().filter(ItemAtributo._item_id == item._id).all()
            p = Pickler()
            aRet = []
            aRet = atributosTipoItem
            if (request.GET.get('_no_definidos') == "true"):
                for ent in entidades:
                    for atributo in atributosTipoItem:
                        if ent._atributo_id == atributo._id:
                            aRet.remove(atributo);
            entidades = aRet
        else:        
            rd = AtributoTipoItemDAO(request)
            entidades = rd.get_atributos_by_tipo_id(request.GET.get('id'))
        lista = [];
        p = Pickler(True, None)
        for entidad in entidades:
            lista.append(p.flatten(entidad))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': True, 'lista':j_string})
        return Response(a_ret)
    elif (request.method == 'POST'):
        u = Unpickler()
        entidad = u.restore(request.json_body);
        atributoItemDao = AtributoTipoItemDAO(request);
        
        nueva_entidad = AtributoTipoItem(entidad["_tipo"], entidad["_valor"], entidad["_descripcion"], entidad["_opcional"], entidad["_defecto"], entidad["_tipo_item_id"])
        
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
       
        atributoItemDao = AtributoTipoItemDAO(request);
        atributo = atributoItemDao.get_by_id(entidad["id"])
        atributoItemDao.borrar(atributo)
        return Response(json.dumps({'sucess': 'true'}))
        
@view_config(route_name='importarTipo')
def importar(request): 
    u= Unpickler()
    entidad = u.restore(request.json_body);
    id_proyecto = entidad['id_proyecto']
    proyectoDao = ProyectoDAO(request)
    proyecto = proyectoDao.get_by_id(id_proyecto)
    
    tipoItemDao = TipoItemDAO(request);
    for id_tipo in entidad['_tipos']:
        tipoItem = tipoItemDao.get_by_id(id_tipo)
        nueva_entidad = TipoItem(tipoItem._nombre, tipoItem._comentario, tipoItem._color, tipoItem._prefijo,tipoItem._condicionado,proyecto)
        tipoItemDao.crear(nueva_entidad)
        
    a_ret = json.dumps({'sucess': 'true', 'tipos': entidad})
    
    return Response(a_ret)
