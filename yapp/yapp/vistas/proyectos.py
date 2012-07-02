from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.privilegio_dao import PrivilegioDAO
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.daos.rol_final_dao import RolFinalDAO
from yapp.daos.rol_privilegio_dao import RolPrivilegioDAO
from yapp.daos.tipo_fase_dao import TipoFaseDAO
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.filter import Validador, P_PROYECTO
from yapp.models.fase.fase import Fase
from yapp.models.fase.tipo_fase import TipoFase
from yapp.models.proyecto.proyecto import Proyecto, ProyectoDTO
from yapp.models.roles.privilegio import Privilegio
from yapp.models.roles.rol_final import RolFinal
from yapp.models.roles.rol_privilegio import RolPrivilegio
import json

@view_config(route_name='readproyectos')
def read_proyectos(request):
    """
    @summary: Maneja las solicitudes para recuperar los proyectos.
    @param request: Solicitud de recuperacion.
    @return: Retorna todos los proyectos.
    """
 
    validador = Validador(request)
    
    rd = ProyectoDAO(request)
    entidades = rd.get_all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
        buleano = validador.es_visible(entidad)
        if buleano == True:
            a = ProyectoDTO(entidad)        
            lista.append(p.flatten(a))    
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'proyectos':j_string})
    
    return Response(a_ret)

@view_config(route_name='createproyectos')
def create_proyectos(request):
    """
    @summary: Maneja las solicitudes para crear los proyectos. El proyecto nuevo se crea
            con una fase por defecto, a la cual se le asocia un tipo de item por defecto
    @param request: Solicitud de creacion.
    @return: Retorna el proyecto creado.
    """
    u = Unpickler()
    entidad = u.restore(request.json_body);
    dao = ProyectoDAO(request)
    rol_dao = RolFinalDAO(request)
    rol = rol_dao.get_query().filter(RolFinal._id == entidad["_autor_id"]).first()
    lider = rol_dao.get_query().filter(RolFinal._id == entidad["_lider_id"]).first()
    nuevo_proyecto = Proyecto(entidad["_nombre"], rol, entidad["_prioridad"], entidad["_estado"], lider, entidad["_nota"], entidad["_fecha_creacion"], entidad["_fecha_modificacion"])
    dao.crear(nuevo_proyecto)
    
    #le creamos una fase por defecto
    nombre_fase = "Fase por defecto de " + entidad["_nombre"]
    orden = 1
    comentario = "Fase creada por defecto"
    estado = "PENDIENTE"
    color = "0"
    nueva_fase = Fase(nombre_fase, nuevo_proyecto, orden, comentario, estado, color)
    dao_fase = FaseDAO(request)
    dao_fase.crear(nueva_fase)
    
    #Le asociamos un tipo de item por defecto a esa fase por defecto
#    dao_tipo_item = TipoItemDAO(request)
#    tipo_item = dao_tipo_item.get_by_id(1)
#    nuevo_tipo_fase = TipoFase(nueva_fase,tipo_item)
#    dao_tipo_fase = TipoFaseDAO(request)
#    dao_tipo_fase.crear(nuevo_tipo_fase)
    
    lista = []
    p = Pickler()
    a = ProyectoDTO(nuevo_proyecto);
    lista.append(p.flatten(a))
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'proyectos':j_string})
    
    return Response(a_ret)

@view_config(route_name='updateproyectos')
def update_proyectos(request):
    """
    @summary: Maneja las solicitudes para actualizacion de proyectos.
    @param request: Solicitud de modificacion.
    @return: Retorna el proyecto modificado.
    """
    u = Unpickler()
    dao = ProyectoDAO(request)
    entidad = u.restore(request.json_body);
    vieja = dao.get_by_id(entidad["id"])
    vieja._nombre = entidad["_nombre"]
    rol_dao = RolFinalDAO(request)
#    if (isinstance(entidad["_autor"], dict)):
#    rol = rol_dao.get_query().filter(RolFinal._id == entidad["_autor"]["_id"]).first()
#    else:
    rol = rol_dao.get_query().filter(RolFinal._id == entidad["_autor_id"]).first()
    vieja._autor = rol
    vieja._prioridad = entidad["_prioridad"]
    vieja._estado = entidad["_estado"]
    
    lider_dao = RolFinalDAO(request)
#    if (isinstance(entidad["_lider"], dict)):
#        lider = lider_dao.get_query().filter(RolFinal._id == entidad["_lider"]["_id"]).first()
#    else:
    lider = lider_dao.get_query().filter(RolFinal._id == entidad["_lider_id"]).first()
    
    
    vieja._lider = lider
    vieja._nota = entidad["_nota"]
    vieja._fecha_creacion = entidad["_fecha_creacion"]
    vieja._fecha_modificacion = entidad["_fecha_modificacion"]
    
    asignar_permiso_rol_proyecto(request, vieja._autor, vieja)
    asignar_permiso_rol_proyecto(request, vieja._lider, vieja)
    
    dao.update(vieja)
    lista = []
    p = Pickler()
    a = ProyectoDTO(vieja)
    lista.append(p.flatten(a))
    j_string = p.flatten(lista)
    return Response(json.dumps({'sucess': 'true', 'proyectos':j_string}))

def asignar_permiso_rol_proyecto(request, rol, proyecto):
    dao = RolPrivilegioDAO(request)
    dao_privilegio = PrivilegioDAO
    
    entidad = dao.get_query().filter(RolPrivilegio._rol == rol, RolPrivilegio._entidad_id == proyecto._id).first();
    if entidad == None :
        privilegio = dao_privilegio.get_query().filter(Privilegio._nombre == P_PROYECTO).first()
        nueva = RolPrivilegio(privilegio, proyecto, rol, True)
        dao.crear(nueva)

@view_config(route_name='deleteproyectos')
def delete_proyectos(request):
    """
    @summary: Maneja las solicitudes para eliminar proyectos.
    @param request: Solicitud de eliminacion.
    @return: Retorna true en caso de exito.
    """
    u = Unpickler()
    entidad = u.restore(request.json_body);
    dao = ProyectoDAO(request)
    proyecto = dao.get_by_id(entidad["id"])
    fase_dao = FaseDAO(request)
    fases = fase_dao.get_query().filter(Fase._proyecto_id == proyecto._id).all();
    for fase in fases:
        fase_dao.borrar(fase);
         
    dao.borrar(proyecto)
    return Response(json.dumps({'sucess': 'true'}))
