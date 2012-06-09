from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.unidad_trabajo_dao import UnidadTrabajoDAO
from yapp.models.unidad_trabajo.unidad_trabajo import UnidadTrabajo

import json
from yapp.daos.item_dao import ItemDAO
from yapp.daos.item_unidad_dao import ItemUnidadDAO
from yapp.models.item.item_unidad_trabajo import ItemUnidadTrabajo

@view_config(route_name='obtenercrearunidadtrabajo')
def obtener_crear_unidad_trabajo(request):
    """
    @summary: Maneja las solicitudes para obtener y crear unidad de trabajo.
    """
    if (request.method == 'GET'):
        rd = UnidadTrabajoDAO(request)
        unidades = [];
        unidades = rd.get_all()
        item_id = request.GET.get('_item_id')
        print item_id
        if (item_id !=None):

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