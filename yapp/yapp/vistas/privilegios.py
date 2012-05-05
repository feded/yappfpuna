'''
Created on Apr 7, 2012

@author: arturo
'''
from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.entidad_dao import EntidadDAO
from yapp.daos.entidad_padre_dao import EntidadPadreDAO
from yapp.daos.privilegio_dao import PrivilegioDAO
from yapp.models.entidad_padre import EntidadPadre, EntidadPadreDTO
from yapp.models.roles.entidad import EntidadDTO
from yapp.models.roles.privilegio import Privilegio, PrivilegioDTO
import json

@view_config(route_name='privilegios')
def get_privilegios(request):
    """Metodo que maneja las llamadas para privilegios
        - Retorna una lista si se envia GET
        - Agrega si se envia POST
        - Modifica si se envia PUT
        - Elimina si se envia DELETE
    """
    if (request.method == 'GET'):
        dao = PrivilegioDAO();
        entidades = dao.get_all()
        lista = [];
        p = Pickler()
        for entidad in entidades:
            n_entidad = PrivilegioDTO(entidad)
            lista.append(p.flatten(n_entidad))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'privilegios':j_string})
        return Response(a_ret)
    
    if (request.method == 'POST'):
        print "-------------------"
        print request.json_body
        print "-------------------"
        u = Unpickler()
        objeto = u.restore(request.json_body);
        if (objeto['_entidad_padre'] == ''):
            entidad_padre = None
        else:
            entidad_padre = EntidadPadreDAO().get_by_id(objeto['_entidad_padre']);
        if (objeto['_entidad'] == ''):
            entidad = None
        else:
            entidad = EntidadDAO().get_by_id(objeto['_entidad']);
        privilegio = Privilegio(objeto['_nombre'], entidad, entidad_padre);
        dao = PrivilegioDAO();
        dao.crear(privilegio);
        
#        nueva_entidad = Privilegio(objeto["_nombre"], entidad);
#        dao = PrivilegioDAO()
#        dao.crear(nueva_entidad);
        p = Pickler()
        aRet = p.flatten(privilegio)
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
        entidad = get_entidad_padre(objeto)
        dao = PrivilegioDAO()
        id_privilegio = request.matchdict['id_privilegio']
        privilegio = dao.get_by_id(id_privilegio);
        privilegio._nombre = objeto["_nombre"];
        privilegio._entidad = entidad;
        dao.update(privilegio);
        p = Pickler()
        aRet = p.flatten(privilegio)
        return Response(json.dumps({'sucess': 'true'}))


def get_entidad_padre(objeto):
    entidad_dao = EntidadPadreDAO();
    if (objeto["_entidad"] == ""):
        return None;
    if (isinstance(objeto["_entidad"], dict)):
        entidad = entidad_dao.get_query().filter(EntidadPadre._id == objeto["_entidad"]["_id"]).first()
    else:
        entidad = entidad_dao.get_query().filter(EntidadPadre._id == objeto["_entidad"]).first()
    return entidad;

@view_config(route_name='entidades')
def get_entidades(request):
    """Metodo que maneja las llamadas para entidades
        - Retorna una lista si se envia GET
    """
    if (request.method == 'GET'):
        dao = EntidadDAO();
        entidades = dao.get_all()
        lista = [];
        p = Pickler()
        for objeto in entidades:
            epDAO = EntidadDTO(objeto);
#            print epDAO._nombre;
            lista.append(p.flatten(epDAO))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'entidades':j_string})
        return Response(a_ret)

def info(var):
    print "----CLASE----"
    print var.__class__
    print "---METODOS---"
    print dir (var)
    print "--ATRIBUTOS--"
    print var
    print "-------------"
