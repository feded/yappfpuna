'''
Created on Apr 7, 2012

@author: arturo
'''
from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from yapp.daos.privilegio_dao import PrivilegioDAO, EntidadDAO
from yapp.daos.rol_dao import RolFinalDAO, RolDAO
from yapp.models.roles.entidad import Entidad
from yapp.models.roles.privilegio import Privilegio
from yapp.models.roles.rol import Rol
from yapp.models.roles.rol_final import RolFinal
import json

@view_config(route_name='privilegios')
def get_privilegios(request):
    if (request.method == 'GET'):
        dao = PrivilegioDAO();
        entidades = dao.get_all()
        lista = [];
        p = Pickler()
        for entidad in entidades:
            n_entidad = PrivilegiosLindos(entidad._id, entidad._nombre, entidad._entidad)
            lista.append(p.flatten(n_entidad))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'privilegios':j_string})
        return Response(a_ret)
    if (request.method == 'POST'):
        print "ME LLAMARON"
        print request.json_body
        u = Unpickler()
        objeto = u.restore(request.json_body);
        entidad_dao = EntidadDAO();
        entidad = entidad_dao.get_query().filter(Entidad._nombre == objeto["_entidad"]).first();
        nueva_entidad = Privilegio(objeto["_nombre"], entidad);
        dao = PrivilegioDAO()
        dao.crear(nueva_entidad);
        p = Pickler(False, None)
        aRet = p.flatten(nueva_entidad)
        p.flatten(objeto)
        return Response(json.dumps({'sucess': 'true', 'privilegios':aRet}))

    
@view_config(route_name='entidades')
def get_entidades(request):
    if (request.method == 'GET'):
        dao = EntidadDAO();
        entidades = dao.get_all()
        lista = [];
        p = Pickler()
        for objeto in entidades:
            lista.append(p.flatten(objeto))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'entidades':j_string})
        return Response(a_ret)
    

class PrivilegiosLindos:
    def __init__(self, _id, nombre, entidad):
        self._id = _id;
        self._nombre = nombre;
        self._entidad = entidad;
