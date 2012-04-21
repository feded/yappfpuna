from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.models.proyecto.proyecto import Proyecto
from yapp.daos.fase_dao import FaseDAO
from yapp.models.fase.fase import Fase
import json

@view_config(route_name='readproyectos')
def read_proyectos(request):
    rd = ProyectoDAO()
    entidades = rd.get_all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
        lista.append(p.flatten(entidad))    
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'proyectos':j_string})
    
    return Response(a_ret)

@view_config(route_name='createproyectos')
def create_proyectos(request):
    u= Unpickler()
    entidad = u.restore(request.json_body);
    dao = ProyectoDAO()
    nuevo_proyecto = Proyecto(entidad["_nombre"],entidad["_autor"],entidad["_prioridad"],entidad["_estado"],entidad["_lider"],entidad["_nota"],entidad["_fecha_creacion"],entidad["_fecha_modificacion"])
    dao.crear(nuevo_proyecto)
    nombre_fase = "Fase por defecto de " + entidad["_nombre"]
    nueva_fase = Fase(nombre_fase, nuevo_proyecto)
    dao_fase = FaseDAO()
    dao_fase.crear(nueva_fase)
    
    lista = []
    p = Pickler()
    lista.append(p.flatten(nuevo_proyecto))
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'proyectos':j_string})
    
    return Response(a_ret)

@view_config(route_name='updateproyectos')
def update_proyectos(request):
    u= Unpickler()
    dao = ProyectoDAO()
    entidad = u.restore(request.json_body);
    vieja = dao.get_by_id(entidad["id"])
    vieja._nombre = entidad["_nombre"]
    vieja._autor = entidad["_autor"]
    vieja._prioridad = entidad["_prioridad"]
    vieja._estado = entidad["_estado"]
    vieja._lider = entidad["_lider"]
    vieja._nota = entidad["_nota"]
    vieja._fecha_creacion = entidad["_fecha_creacion"]
    vieja._fecha_modificacion = entidad["_fecha_modificacion"]
    
    dao.update(vieja)
    return Response(json.dumps({'sucess': 'true'}))

@view_config(route_name='deleteproyectos')
def delete_proyectos(request):
    u= Unpickler()
    entidad = u.restore(request.json_body);
    dao = ProyectoDAO()
    proyecto = dao.get_by_id(entidad["id"])
    dao.borrar(proyecto)
    return Response(json.dumps({'sucess': 'true'}))
    

#@view_config(route_name='proyectos')
#def get_proyectos(request):
#    if (request.method == 'GET'):
#        rd = ProyectoDAO()
#        entidades = rd.get_all()
#        lista = [];
#        p = Pickler()
#        for entidad in entidades:
#            lista.append(p.flatten(entidad))
#            
#        j_string = p.flatten(lista)
#        a_ret = json.dumps({'sucess': 'true', 'proyectos':j_string})
#        return Response(a_ret)
#    if(request.method == 'POST'):
#        u= Unpickler()
#        entidad = u.restore(request.json_body);
#        dao = ProyectoDAO()
#        if (entidad["accion"] == "crear"):
#            nueva_entidad = Proyecto(entidad["_nombre"],entidad["_autor"])
#            dao.crear(nueva_entidad)
#        if (entidad["accion"] == "editar"):
#            vieja = dao.get_by_id(entidad["id"])
#            vieja._nombre = entidad["_nombre"]
#            vieja._autor = entidad["_autor"]
#            dao.update(vieja)
#        if (entidad["accion"] == "eliminar"):
#            proyecto = dao.get_by_id(entidad["id"])
#            dao.borrar(proyecto)
#        return Response(json.dumps({'sucess': 'true'}))
#        
