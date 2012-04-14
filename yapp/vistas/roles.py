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
from yapp.daos.rol_dao import RolFinalDAO, RolEstadoDAO, RolDAO
from yapp.models.roles.rol import Rol
from yapp.models.roles.rol_estado import RolEstado
from yapp.models.roles.rol_final import RolFinal
import json

@view_config(route_name='roles')
def get_roles(request):
    print request.method;
#    print request.json_body;
    if (request.method == 'GET'):
        rd = RolDAO()
        entidades = rd.get_all()
        lista = [];
        p = Pickler()
        for entidad in entidades:
            rol = RolesLindos(entidad._id, entidad._nombre, entidad._estado)
            if (isinstance(entidad, RolFinal)):
                rol._esFinal = True;
                rol._password = entidad._password;
                rol._email = entidad._email
            lista.append(p.flatten(rol))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'users':j_string})
        return Response(a_ret)
    if (request.method == 'POST'):
        print "-------------------------"
        print "-----Recibiendo POST-----"
        print request.json_body
        print "-------------------------"
        u = Unpickler()
        entidad = u.restore(request.json_body);
        if (entidad["accion"] == "POST"):
            estado_dao = RolEstadoDAO();
            estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]).first();
            if (entidad["_esFinal"] == True):
                nueva_entidad = RolFinal(entidad["_nombre"], estado, entidad["_email"], entidad["_password"])
                dao = RolFinalDAO()
            else:
                nueva_entidad = Rol(entidad["_nombre"], estado)
                dao = RolDAO()
            dao.crear(nueva_entidad);
            p = Pickler(False, None)
            aRet = p.flatten(nueva_entidad)
            p.flatten(entidad)
            return Response(json.dumps({'sucess': 'true', 'users':aRet}))
        if (entidad["accion"] == "DELETE"):
            print "Eliminando rol"
            dao = RolDAO()
            rol = dao.get_by_id(entidad["id"])
            dao.borrar(rol)
            return Response(json.dumps({'sucess': 'true'}))
        if (entidad["accion"] == "PUT"):
            estado_dao = RolEstadoDAO();
            estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]["_estado"]).first();
            
            rolDAO = RolDAO();
            rolFinalDAO = RolFinalDAO();
            vieja = rolDAO.get_by_id(entidad["id"]);
            print vieja._id
            if (isinstance(vieja, RolFinal)):
                if (entidad["_esFinal"] == True):
#                Si ambas son finales
                    vieja._nombre = entidad["_nombre"]
                    vieja._password = entidad["_password"]
                    vieja._email = entidad["_email"]
                    vieja._estado = estado;
                    rolFinalDAO.update(vieja);
                    return Response(json.dumps({'sucess': 'true'}))
                else:
                    nueva = Rol(vieja._nombre, estado);
                    rolFinalDAO.borrar(vieja)
                    rolDAO.crear(nueva);
                    return Response(json.dumps({'sucess': 'true'}))
            else:
                if (entidad["_esFinal"] == True):
                    nueva = RolFinal(entidad["_nombre"], estado, entidad["_email"], entidad["_password"])
                    rolDAO.borrar(vieja);
                    rolFinalDAO.crear(nueva)
                    return Response(json.dumps({'sucess': 'true'}))
                else:
                    vieja._nombre = entidad["_nombre"]
                    vieja._estado = estado;
                    rolDAO.update(vieja);
                    return Response(json.dumps({'sucess': 'true'}))
        

@view_config(route_name='estados_roles')
def get_estado_roles(request):
    if (request.method == 'GET'):
        re = RolEstadoDAO()
        entidades = re.get_query().all()
        lista = [];
        p = Pickler(False, None)
        for entidad in entidades:
            lista.append(p.flatten(entidad))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'estados':j_string})
        print a_ret
        return Response(a_ret)
        
    
class RolesLindos:
    def __init__(self, _id, nombre, estado):
        self._id = _id;
        self._nombre = nombre;
        self._esFinal = False;
        self._estado = estado;
        
def info(var):
    print "----CLASE----"
    print var.__class__
    print "---METODOS---"
    print dir (var)
    print "--ATRIBUTOS--"
    print var
    print "-------------"

