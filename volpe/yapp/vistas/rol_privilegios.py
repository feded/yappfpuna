'''
Created on May 4, 2012

@author: arturo
'''

from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from yapp.daos.rol_privilegio_dao import RolPrivilegioDAO
from yapp.models.roles.rol_privilegio import RolPrivilegio, RolPrivilegioDTO
import json

@view_config(route_name='rolPrivilegios')
def get_roles(request):
    """Metodo que maneja las llamadas para los privilegios de un rol
    """
    if (request.method == 'GET'):
        dao = RolPrivilegioDAO()
        if (request.GET.get('id') != None):
            id = request.GET.get('id')
            entidades = dao.get_query().filter(RolPrivilegio._rol_id == id).all()
        else:
            entidades = dao.get_all()
        lista = [];
        p = Pickler()
        for entidad in entidades:
            dto = RolPrivilegioDTO(entidad)
            lista.append(p.flatten(dto))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'lista':j_string})
        return Response(a_ret)
#    if (request.method == 'POST'):
#        
#        u = Unpickler()
#        entidad = u.restore(request.json_body);
#        print request.json_body;
#        print "--------------------------"
#        if (entidad["accion"] == "POST"):
#            estado_dao = RolEstadoDAO();
#            if (isinstance(entidad["_estado"], dict)):
#                estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]["_estado"]).first()
#            else:
#                estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]).first()
#            if (entidad["_esFinal"] == True):
#                nueva_entidad = RolFinal(entidad["_nombre"], estado, entidad["_email"], entidad["_password"])
#                dao = RolFinalDAO()
#            else:
#                nueva_entidad = Rol(entidad["_nombre"], estado)
#                dao = RolDAO()
#            dao.crear(nueva_entidad);
#            p = Pickler()
#            aRet = p.flatten(nueva_entidad)
#            p.flatten(entidad)
#            return Response(json.dumps({'sucess': 'true', 'users':aRet}))
#    if (request.method == 'DELETE'):
#        dao = RolDAO()
#        u = Unpickler()
#        entidad = u.restore(request.json_body);
#        rol = dao.get_by_id(entidad["id"])
#        dao.borrar(rol)
#        return Response(json.dumps({'sucess': 'true'}))
#    if (request.method == 'PUT'):
#        u = Unpickler()
#        dao = RolDAO()
#        id_rol = request.matchdict['id_rol']
#        entidad = u.restore(request.json_body);
#        rol = dao.get_by_id(id_rol)
#        estado_dao = RolEstadoDAO();
#        if (isinstance(entidad["_estado"], dict)):
#            estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]["_estado"]).first()
#        else:
#            estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]).first()
#        
#        rolDAO = RolDAO();
#        rolFinalDAO = RolFinalDAO();
#        vieja = rolDAO.get_by_id(entidad["id"]);
#        p = Pickler()
#        
#        if (isinstance(vieja, RolFinal)):
#            if (entidad["_esFinal"] == True):
##                Si ambas son finales
#                vieja._nombre = entidad["_nombre"]
#                vieja._password = entidad["_password"]
#                vieja._email = entidad["_email"]
#                vieja._estado = estado;
#                rolFinalDAO.update(vieja);
#                aRet = p.flatten(vieja)
#                p.flatten(entidad)
#                return Response(json.dumps({'sucess': 'true'}))
#            else:
#                nueva = Rol(vieja._nombre, estado);
#                rolFinalDAO.borrar(vieja)
#                rolDAO.crear(nueva);
#                aRet = p.flatten(nueva)
#                p.flatten(entidad)
#                return Response(json.dumps({'sucess': 'true'}))
#        else:
#            if (entidad["_esFinal"] == True):
#                nueva = RolFinal(entidad["_nombre"], estado, entidad["_email"], entidad["_password"])
#                rolDAO.borrar(vieja);
#                rolFinalDAO.crear(nueva)
#                aRet = p.flatten(nueva)
#                p.flatten(entidad)
#                return Response(json.dumps({'sucess': 'true'}))
#            else:
#                vieja._nombre = entidad["_nombre"]
#                vieja._estado = estado;
#                rolDAO.update(vieja);
#                aRet = p.flatten(vieja)
#                p.flatten(entidad)
#                return Response(json.dumps({'sucess': 'true'}))
