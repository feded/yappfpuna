from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.models.fase.fase import Fase
from yapp.models.proyecto.proyecto import Proyecto
import json

@view_config(route_name='readproyectos')
def read_proyectos(request):
    """Metodo que maneja las llamadas para proyectos
        - Retorna una lista si se envia GET
    """
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
    """Metodo que maneja las llamadas para proyectos
        - CREATE : crea un proyecto
    """
    u= Unpickler()
    entidad = u.restore(request.json_body);
    dao = ProyectoDAO()
    nuevo_proyecto = Proyecto(entidad["_nombre"],entidad["_autor"],entidad["_prioridad"],entidad["_estado"],entidad["_lider"],entidad["_nota"],entidad["_fecha_creacion"],entidad["_fecha_modificacion"])
    dao.crear(nuevo_proyecto)
    for i in range(0,3):
        nombre_fase = "Fase " + str(i)+ " de " + entidad["_nombre"]
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
    """Metodo que maneja las llamadas para proyectos
        - PUT : modifica un proyecto
    """
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
    """Metodo que maneja las llamadas para proyectos
        - DELETE : elimina un proyecto
    """
    u= Unpickler()
    entidad = u.restore(request.json_body);
    dao = ProyectoDAO()
    proyecto = dao.get_by_id(entidad["id"])
    fase_dao = FaseDAO()
    fases = fase_dao.get_query().filter(Fase._proyecto_id==proyecto._id).all();
    for fase in fases:
        fase_dao.borrar(fase);
         
    
    dao.borrar(proyecto)
    return Response(json.dumps({'sucess': 'true'}))
