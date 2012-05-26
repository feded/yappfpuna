from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.recurso_dao import RecursoDAO, TipoRecursoDAO
from yapp.daos.recurso_persona_dao import RecursoPersonaDAO
from yapp.daos.recurso_bien_dao import RecursoBienDAO
from yapp.daos.recurso_material_dao import RecursoMaterialDAO
from yapp.models.recurso.recurso import Recurso
from yapp.models.recurso.recurso_persona import RecursoPersona
from yapp.models.recurso.recurso_bien import RecursoBien
from yapp.models.recurso.recurso_material import RecursoMaterial
from yapp.models.recurso.tipo_recurso import TipoRecurso

import json

@view_config(route_name='obtenercrearrecursos')
def obtener_crear_recursos(request):
    """
    @summary: Maneja las solicitudes para obtener y crear recursos.
    """
    if (request.method == 'GET'):
        rd = RecursoDAO(request)
        entidades = rd.get_all()
        lista = [];
        p = Pickler()
        for entidad in entidades:
            if(entidad._tipo._tipo == "Persona"):
                rd = RecursoPersonaDAO(request)
                e = rd.get_by_id(entidad._id)
                a = RecursosLindos(e._id, e._nombre, entidad._tipo,e._descripcion,entidad._tipo._tipo, e._costo_hora, 0, 0)
            elif(entidad._tipo._tipo == "Bien"):
                rd = RecursoBienDAO(request)
                e = rd.get_by_id(entidad._id)
                a = RecursosLindos(e._id, e._nombre, entidad._tipo,e._descripcion,entidad._tipo._tipo, 0, e._costo_cantidad, e._cantidad)
            elif(entidad._tipo._tipo == "Material"):
                rd = RecursoMaterialDAO(request)
                entidad = rd.get_by_id(entidad._id)
                a = RecursosLindos(e._id, e._nombre, entidad._tipo,e._descripcion,entidad._tipo._tipo, 0, e._costo_cantidad, e._cantidad)
#            a = RecursosLindos(entidad._id, entidad._nombre, entidad._tipo,entidad._descripcion,entidad._tipo._tipo)
            lista.append(p.flatten(a))    
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'recursos':j_string})    
        
        return Response(a_ret)
    
    else:    
        u= Unpickler()
        entidad = u.restore(request.json_body);
        
        tipo_dao = TipoRecursoDAO(request)
        tipo = tipo_dao.get_query().filter(TipoRecurso._tipo == entidad["_tipo"]).first()
        
        if (entidad["_tipo"] == "Persona"):
            nuevo_recurso = RecursoPersona(entidad["_nombre"],tipo,entidad["_descripcion"],entidad["_costo_hora"])
            dao = RecursoPersonaDAO(request)
        elif (entidad["_tipo"] == "Bien"):
            nuevo_recurso = RecursoBien(entidad["_nombre"],tipo,entidad["_descripcion"],entidad["_costo_cantidad"],entidad["_cantidad"])
            dao = RecursoBienDAO(request)
        elif (entidad["_tipo"] == "Material"):
            nuevo_recurso = RecursoMaterial(entidad["_nombre"],tipo,entidad["_descripcion"],entidad["_costo_cantidad"],entidad["_cantidad"])
            dao = RecursoMaterialDAO(request)
            
        dao.crear(nuevo_recurso)
        
        lista = []
        p = Pickler()
        lista.append(p.flatten(nuevo_recurso))
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'recurso':j_string})
    
        return Response(a_ret)

@view_config(route_name='actualizareliminarrecursos')
def actualizar_eliminar_recurso(request):
    """
    @summary: Maneja las solicitudes para actualizar y elimninar recursos.
    """
    
    if (request.method == 'DELETE'):
        u= Unpickler()
        entidad = u.restore(request.json_body);
        dao = RecursoDAO(request)
        recurso = dao.get_by_id(entidad["id"])
        
        
        if (recurso._tipo._tipo == "Persona"):
                dao = RecursoPersonaDAO(request)
                recurso = dao.get_by_id(entidad["id"])
        elif (recurso._tipo._tipo == "Bien"):
                dao = RecursoBienDAO(request)
                recurso = dao.get_by_id(entidad["id"])
        elif (recurso._tipo._tipo == "Material"):
                dao = RecursoMaterialDAO(request)
                recurso = dao.get_by_id(entidad["id"])
        
        dao.borrar(recurso)
        return Response(json.dumps({'sucess': 'true'}))
    else:
        u= Unpickler()
        dao = RecursoDAO(request)
        entidad = u.restore(request.json_body);
        vieja = dao.get_by_id(entidad["id"])
        
        if(vieja._tipo._tipo == entidad["_tipo"]):
            if (entidad["_tipo"] == "Persona"):
                dao = RecursoPersonaDAO(request)
                vieja = dao.get_by_id(entidad["id"])
                vieja._nombre = entidad["_nombre"]
                vieja._descripcion = entidad["_descripcion"]
                vieja._costo_hora = entidad["_costo_hora"]
            elif (entidad["_tipo"] == "Bien"):
                dao = RecursoBienDAO(request)
                vieja = dao.get_by_id(entidad["id"])
                vieja._nombre = entidad["_nombre"]
                vieja._descripcion = entidad["_descripcion"]
                vieja._costo_cantidad = entidad["_costo_cantidad"]
                vieja._cantidad = entidad["_cantidad"]
            elif (entidad["_tipo"] == "Material"):
                dao = RecursoMaterialDAO(request)
                vieja = dao.get_by_id(entidad["id"])
                vieja._nombre = entidad["_nombre"]
                vieja._descripcion = entidad["_descripcion"]
                vieja._costo_cantidad = entidad["_costo_cantidad"]
                vieja._cantidad = entidad["_cantidad"]
                
        dao.update(vieja)
        return Response(json.dumps({'sucess': 'true'}))

@view_config(route_name='tipos_recursos')
def get_tipos_recurso(request):
    """
    @summary: Maneja las solicitudes para recuperar los tipos de recursos.
    """
    re = TipoRecursoDAO(request)
    entidades = re.get_query().all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
        lista.append(p.flatten(entidad))
            
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'tipos':j_string})
    return Response(a_ret)

class RecursosLindos:
    """
    @summary: Unidad de transporte para recursos.         
    """
    def __init__(self, _id, nombre, tipo, descripcion,tipo_nombre,costo_hora, costo_cantidad, cantidad):
        self._id = _id;
        self._nombre = nombre;
        self._tipo = tipo;
        self._descripcion = descripcion;
        self.tipo_nombre = tipo_nombre;
        self._costo_hora = costo_hora;
        self._costo_cantidad = costo_cantidad;
        self._cantidad = cantidad