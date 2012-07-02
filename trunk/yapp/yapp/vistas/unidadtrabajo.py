from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.unidad_trabajo_dao import UnidadTrabajoDAO
from yapp.models.unidad_trabajo.unidad_trabajo import UnidadTrabajo
from yapp.models.unidad_trabajo.unidad_trabajo_recurso import UnidadTrabajo_Recurso
import json
from yapp.daos.recurso_dao import RecursoDAO
from yapp.daos.unidad_trabajo_recurso import UnidadTrabajoRecursoDAO

from yapp.daos.item_dao import ItemDAO
from yapp.daos.item_unidad_dao import ItemUnidadDAO
from yapp.models.item.item_unidad_trabajo import ItemUnidadTrabajo

@view_config(route_name='obtenercrearunidadtrabajo')
def obtener_crear_unidad_trabajo(request):
    """
    @summary: Maneja las solicitudes para obtener y crear unidad de trabajo.
    @param request: Get para recuperar y Post para crear.
    @return: Retorna todos las unidades de trabajo en caso de recibir un Get.
        Retorna la unidad creada en caso de recibir una unidad de trabajo
    """
    if (request.method == 'GET'):
        rd = UnidadTrabajoDAO(request)
        unidades = [];
        unidades = rd.get_all()
        item_id = request.GET.get('_item_id')
        print item_id
        if (item_id !=None):
            item_dao = ItemDAO(request)
            unidades = item_dao.get_unidades_disponibles(item_dao.get_by_id(item_id))
            #####################################
            ###La parte comentada de abajo, trae las unidades como le gusta a cocho,
            ###osea, con ese return se podra asignar a cualquier item la misma unidad de trabajo
            ###si es que ya no tiene una asignada
            #####################################
            itemUnidadDao = ItemUnidadDAO(request)
            unidadesAsignadas = itemUnidadDao.get_query().filter(ItemUnidadTrabajo._item_id == item_id).all()
            for unidadAsignada in unidadesAsignadas:
                for unidad in unidades:
                    if (unidad._id == unidadAsignada._unidad_id):
                        unidades.remove(unidad)            
        lista = [];
        p = Pickler()
        for entidad in unidades:
            lista.append(p.flatten(entidad))    
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'unidadtrabajo':j_string})    
        
        return Response(a_ret)
    else:
        #Recibio un Post
        u= Unpickler()
        entidad = u.restore(request.json_body);
        
        nueva_unidad_trabajo = UnidadTrabajo(entidad["_nombre"],entidad["_etiqueta"],entidad["_descripcion"],entidad["_color"])
        dao = UnidadTrabajoDAO(request)
            
        dao.crear(nueva_unidad_trabajo)
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nueva_unidad_trabajo))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'unidadtrabajo':j_string})
    
        return Response(a_ret)
@view_config(route_name='actualizareliminarunidadtrabajo')
def actualizar_eliminar_unidad_trabajo(request):
    """
    @summary: Maneja las solicitudes para eliminar y actualizar unidades de trabajo.
    @param request: Delete para eliminar y Put para modificar.
    @return: Retorna la unidad de trabajo modificada en caso de recibir un Put.
        En caso de recibir un Delete retorna true en caso de exito.
    """    
    if (request.method == 'DELETE'):
        u= Unpickler()
        entidad = u.restore(request.json_body);
        dao = UnidadTrabajoDAO(request)
        unidad = dao.get_by_id(entidad["id"])
        
        id_unidad = entidad['id']
        
        unidad_item_dao = ItemUnidadDAO(request)
        items = unidad_item_dao.get_query().filter(ItemUnidadTrabajo._unidad_id == id_unidad).first()
        
        if items != None:
            return Response(json.dumps({'sucess': 'false' , "message": "La unidad de trabajo no se puede eliminar,debido a que esta asignado a un item" }))
        
        dao_unidad_recurso = UnidadTrabajoRecursoDAO(request)
        entidades = dao_unidad_recurso.get_query().filter(UnidadTrabajo_Recurso._unidad_trabajo_id==id_unidad).all();
        for unidad_recurso in entidades:
            dao_unidad_recurso.borrar(unidad_recurso)
        
        dao.borrar(unidad)
        return Response(json.dumps({'sucess': 'true'}))
    else:
        #Recibio un Put
        u= Unpickler()
        dao = UnidadTrabajoDAO(request)
        entidad = u.restore(request.json_body);
        vieja = dao.get_by_id(entidad["id"])
        vieja._nombre = entidad["_nombre"]
        vieja._etiqueta = entidad["_etiqueta"]
        vieja._descripcion = entidad["_descripcion"]
        vieja._color = entidad["_color"]
        
        dao.update(vieja)
        lista = []
        p = Pickler()
        lista.append(p.flatten(vieja))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'unidadtrabajo':j_string})
        return Response(a_ret)

@view_config(route_name='asignarrecursos')
def asignar_recursos(request):
    """
    @summary: Se encarga de asignar recursos a la unidad de trabajo.
    @param request: La unidad de trabajo y los recursos.
    """  
    u= Unpickler()
    entidad = u.restore(request.json_body);
    id_unidad = entidad['id_unidad_trabajo']
    dao_unidad_recurso = UnidadTrabajoRecursoDAO(request)
    entidades = dao_unidad_recurso.get_query().filter(UnidadTrabajo_Recurso._unidad_trabajo_id==id_unidad).all();
    for unidad_recurso in entidades:
        dao_unidad_recurso.borrar(unidad_recurso)
    
    for id_recurso in entidad['_recursos']:
#        print str(id_unidad) + '==>' + str(id_recurso)

        a_guardar = UnidadTrabajo_Recurso(id_unidad, id_recurso)
        dao_unidad_recurso.crear(a_guardar)
        
    a_ret = json.dumps({'sucess': 'true', 'recursos': entidad})
    
    return Response(a_ret)