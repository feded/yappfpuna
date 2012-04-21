from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.fase_dao import FaseDAO
from yapp.models.fase.fase import Fase
import json

@view_config(route_name='readfases')
def read_fases(request):
    dao = FaseDAO()
    entidades = dao.get_all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
        entidadLinda = FaseLinda(entidad._id, entidad._nombre, entidad._proyecto._nombre)
        lista.append(p.flatten(entidadLinda))    
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'fases':j_string})
    
    return Response(a_ret)


class FaseLinda:
    def __init__(self, _id, nombre, proyecto):
        self._id = _id
        self._nombre = nombre;
        self._proyecto = proyecto;