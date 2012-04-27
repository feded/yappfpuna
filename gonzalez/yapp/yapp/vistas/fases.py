from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.models.fase.fase import Fase
import json

@view_config(route_name='readfases')
def read_fases(request):
    """Metodo que maneja las llamadas para proyectos
        - Retorna una lista si se envia GET
    """
    
    
    proyecto_id = request.GET.get('id')
    rd = FaseDAO()
    entidades = rd.get_query().filter(Fase._proyecto_id == proyecto_id).all()
    lista = [];
    p = Pickler(False,None)
    for entidad in entidades:
        entidadLinda = FaseLinda(entidad._id, entidad._nombre, entidad._proyecto_id)
        lista.append(p.flatten(entidadLinda))    
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'fases':j_string})
    
    return Response(a_ret)

@view_config(route_name='createfases')
def create_fases(request):
    """Crea una fase """
    
    u= Unpickler()
    entidad = u.restore(request.json_body);
    
    dao = ProyectoDAO()
    proyecto = dao.get_by_id(entidad["_proyecto_id"])
    
    
    
    dao = FaseDAO()
    nueva_fase = Fase(entidad["_nombre"],proyecto)
    dao.crear(nueva_fase)

    lista = []
    p = Pickler()
    lista.append(p.flatten(nueva_fase))
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'fases':j_string})
    
    return Response(a_ret)


class FaseLinda:
    def __init__(self, _id, nombre, proyecto):
        self._id = _id
        self._nombre = nombre;
        self._proyecto_id = proyecto;
