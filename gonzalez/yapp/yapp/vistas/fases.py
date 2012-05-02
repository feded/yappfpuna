from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.atributo_fase_dao import AtributoFaseDAO
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.models.fase.fase import Fase
from yapp.models.fase.atributo_fase import AtributoFase
import json

@view_config(route_name='obtenercrearfases')
def obtener_crear_fases(request):
    if (request.method == 'GET'):
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
    else:    
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

@view_config(route_name='actualizareliminarfases')
def actualizar_eliminar_fase(request):
    u= Unpickler()
    entidad = u.restore(request.json_body);
    dao = FaseDAO()
    fase = dao.get_by_id(entidad["id"])     
    dao.borrar(fase)
    return Response(json.dumps({'sucess': 'true'}))

@view_config(route_name='obtenercrearatributofase')
def obtener_crear_atributofase(request):
    
#    id = 0;
#    rd = FaseDAO()
#    entidades = rd.get_all()
#    for entidad in entidades:
#        id = entidad._id
#    id = id + 1
    print '-----------------------------------------------'
    print '-----------------------------------------------'
    print 'estamos en atributofase'
    
    id = request.GET.get('id')
    rd = AtributoFaseDAO()
    entidades = rd.get_query().filter(AtributoFase._fase_id == id).all()
#    entidades = rd.get_query().filter(AtributoFase._fase_id == fase_id).all()
#    entidades = rd.get_all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
        lista.append(p.flatten(entidad))    
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'atributofase':j_string})

    return Response(a_ret)
   


class FaseLinda:
    def __init__(self, _id, nombre, proyecto):
        self._id = _id
        self._nombre = nombre;
        self._proyecto_id = proyecto;
