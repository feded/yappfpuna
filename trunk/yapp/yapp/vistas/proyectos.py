from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.models.proyecto.proyecto import Proyecto, ProyectoDTO
from yapp.daos.rol_final_dao import RolFinalDAO
from yapp.daos.tipo_fase_dao import TipoFaseDAO
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.models.fase.fase import Fase
from yapp.models.fase.tipo_fase import TipoFase
from yapp.models.proyecto.proyecto import Proyecto
from yapp.models.roles.rol_final import RolFinal
import json

@view_config(route_name='readproyectos')
def read_proyectos(request):
    """
    @summary: Maneja las solicitudes para recuperar los proyectos.
    """
    
    rd = ProyectoDAO()
    entidades = rd.get_all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
#        a = ProyectosLindos(entidad._id, entidad._nombre, entidad._autor, entidad._prioridad, entidad._estado, entidad._lider, entidad._nota,entidad._fecha_creacion, entidad._fecha_modificacion,entidad._autor._nombre,entidad._lider._nombre)
        a = ProyectoDTO(entidad)        
        lista.append(p.flatten(a))    
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'proyectos':j_string})
    
    return Response(a_ret)

@view_config(route_name='createproyectos')
def create_proyectos(request):
    """
    @summary: Maneja las solicitudes para crear los proyectos. El proyecto nuevo se crea
            con una fase por defecto
    """
    u= Unpickler()
    entidad = u.restore(request.json_body);
    dao = ProyectoDAO()
    rol_dao = RolFinalDAO()
    rol = rol_dao.get_query().filter(RolFinal._id == entidad["_autor"]).first()
    lider = rol_dao.get_query().filter(RolFinal._id == entidad["_lider"]).first()
    nuevo_proyecto = Proyecto(entidad["_nombre"],rol,entidad["_prioridad"],entidad["_estado"],lider,entidad["_nota"],entidad["_fecha_creacion"],entidad["_fecha_modificacion"])
    dao.crear(nuevo_proyecto)
#    for i in range(0,3):
    nombre_fase = "Fase por defecto de " + entidad["_nombre"]
    orden = 1
    comentario = "Fase creada por defecto"
    estado = "Pendiente"
    color = "0"
    nueva_fase = Fase(nombre_fase, nuevo_proyecto, orden, comentario, estado,color)
    dao_fase = FaseDAO()
    dao_fase.crear(nueva_fase)
    
    dao_tipo_item = TipoItemDAO()
    tipo_item = dao_tipo_item.get_by_id(1)
    
    nuevo_tipo_fase = TipoFase(nueva_fase,tipo_item)
    dao_tipo_fase = TipoFaseDAO()
    dao_tipo_fase.crear(nuevo_tipo_fase)
    
    lista = []
    p = Pickler()
    a = ProyectosLindos(nuevo_proyecto._id,entidad["_nombre"],rol,entidad["_prioridad"],entidad["_estado"],lider,entidad["_nota"],entidad["_fecha_creacion"],entidad["_fecha_modificacion"],rol._nombre,lider._nombre)
    lista.append(p.flatten(a))
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'proyectos':j_string})
    
    return Response(a_ret)

@view_config(route_name='updateproyectos')
def update_proyectos(request):
    """
    @summary: Maneja las solicitudes para actualizacion de proyectos.
    """
    u= Unpickler()
    dao = ProyectoDAO()
    entidad = u.restore(request.json_body);
    vieja = dao.get_by_id(entidad["id"])
    vieja._nombre = entidad["_nombre"]
    rol_dao = RolFinalDAO()
    if (isinstance(entidad["_autor"], dict)):
        rol = rol_dao.get_query().filter(RolFinal._id == entidad["_autor"]["_id"]).first()
    else:
        rol = rol_dao.get_query().filter(RolFinal._id == entidad["_autor"]).first()
    vieja._autor = rol
    vieja._prioridad = entidad["_prioridad"]
    vieja._estado = entidad["_estado"]
    
    lider_dao = RolFinalDAO()
    if (isinstance(entidad["_lider"], dict)):
        lider = lider_dao.get_query().filter(RolFinal._id == entidad["_lider"]["_id"]).first()
    else:
        lider = lider_dao.get_query().filter(RolFinal._id == entidad["_lider"]).first()
    
    vieja._lider = lider
    vieja._nota = entidad["_nota"]
    vieja._fecha_creacion = entidad["_fecha_creacion"]
    vieja._fecha_modificacion = entidad["_fecha_modificacion"]
    
    dao.update(vieja)
    return Response(json.dumps({'sucess': 'true'}))

@view_config(route_name='deleteproyectos')
def delete_proyectos(request):
    """
    @summary: Maneja las solicitudes para eliminar proyectos. Al eliminar el proyecto
        se eliman sus fases e items.
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

class ProyectosLindos:
    """
    @summary: Unidad de transporte para proyectos.         
    """
    def __init__(self, _id, nombre, autor, prioridad, estado, lider, nota,fecha_creacion, fecha_modificacion,autor_nombre,lider_nombre):
        self._id = _id;
        self._nombre = nombre;
        self._autor = autor;
        self._prioridad = prioridad;
        self._estado = estado;
        self._lider = lider;
        self._nota = nota;
        self._fecha_creacion = fecha_creacion;
        self._fecha_modificacion = fecha_modificacion;
        self.autor_nombre = autor_nombre;
        self.lider_nombre = lider_nombre;
