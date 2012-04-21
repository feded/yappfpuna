'''
Created on Apr 7, 2012

@author: arturo
'''
from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.privilegio_dao import PrivilegioDAO, EntidadDAO
from yapp.models.roles.entidad import Entidad
from yapp.models.roles.privilegio import Privilegio
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
        u = Unpickler()
        objeto = u.restore(request.json_body);
        entidad_dao = EntidadDAO();
        if (isinstance(objeto["_entidad"], dict)):
            entidad = entidad_dao.get_query().filter(Entidad._nombre == objeto["_entidad"]["_nombre"]).first()
        else:
            entidad = entidad_dao.get_query().filter(Entidad._nombre == objeto["_entidad"]).first()
        nueva_entidad = Privilegio(objeto["_nombre"], entidad);
        dao = PrivilegioDAO()
        dao.crear(nueva_entidad);
        p = Pickler()
        aRet = p.flatten(nueva_entidad)
        print nueva_entidad.__dict__
        return Response(json.dumps({'sucess': 'true', 'privilegios':aRet}))
    
    if (request.method == 'DELETE'):
        id_privilegio = request.matchdict['id_privilegio']
        dao = PrivilegioDAO()
        entidad = dao.get_by_id(id_privilegio);
        dao.borrar(entidad)
        return Response(json.dumps({'sucess': 'true'}))
    
    if (request.method == 'PUT') :
        u = Unpickler()
        objeto = u.restore(request.json_body)
        entidad_dao = EntidadDAO()
        print "---------------------------"
        print objeto["_entidad"]
        print "---------------------------"
        if (isinstance(objeto["_entidad"], map)):
            entidad = entidad_dao.get_query().filter(Entidad._nombre == objeto["_entidad"]["_nombre"]).first()
        else:
            entidad = entidad_dao.get_query().filter(Entidad._nombre == objeto["_entidad"]).first()
            
        dao = PrivilegioDAO()
        id_privilegio = request.matchdict['id_privilegio']
        privilegio = dao.get_by_id(id_privilegio);
        privilegio._nombre = objeto["_nombre"];
        privilegio._entidad = entidad;
        dao.update(privilegio);
        p = Pickler()
        aRet = p.flatten(privilegio)
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

def info(var):
    print "----CLASE----"
    print var.__class__
    print "---METODOS---"
    print dir (var)
    print "--ATRIBUTOS--"
    print var
    print "-------------"
