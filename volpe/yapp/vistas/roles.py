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
from yapp.daos.rol_dao import RolEstadoDAO, RolDAO
from yapp.daos.rol_final_dao import RolFinalDAO
from yapp.models.roles.rol import Rol, RolDTO
from yapp.models.roles.rol_estado import RolEstado, RolEstadoDTO
from yapp.models.roles.rol_final import RolFinal
import json

@view_config(route_name='roles')
def get_roles(request):
    """Metodo que maneja las llamadas para roles
        - Retorna una lista si se envia GET
        - Agrega si se envia POST
        - Modifica si se envia PUT
        - Elimina si se envia DELETE
    """
    print request.method;
#    print request.json_body;
    if (request.method == 'GET'):
        rd = RolDAO()
        entidades = rd.get_all()
        lista = [];
        p = Pickler(False, None)
        for entidad in entidades:
            rol = RolDTO(entidad)
            if (isinstance(entidad, RolFinal)):
                rol._esFinal = True;
                rol._password = entidad._password;
                rol._email = entidad._email
            lista.append(p.flatten(rol))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'users':j_string})
        return Response(a_ret)
    if (request.method == 'POST'):
        
        u = Unpickler()
        entidad = u.restore(request.json_body);
        print request.json_body;
        print "--------------------------"
        if (entidad["accion"] == "POST"):
            estado_dao = RolEstadoDAO();
            if (isinstance(entidad["_estado"], dict)):
                estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]["_estado"]).first()
            else:
                estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]).first()
            if (entidad["_esFinal"] == True):
                nueva_entidad = RolFinal(entidad["_nombre"], estado, entidad["_email"], entidad["_password"])
                dao = RolFinalDAO()
            else:
                nueva_entidad = Rol(entidad["_nombre"], estado)
                dao = RolDAO()
            dao.crear(nueva_entidad);
            p = Pickler()
            aRet = p.flatten(nueva_entidad)
            p.flatten(entidad)
            return Response(json.dumps({'sucess': 'true', 'users':aRet}))
    if (request.method == 'DELETE'):
        dao = RolDAO()
        u = Unpickler()
        entidad = u.restore(request.json_body);
        rol = dao.get_by_id(entidad["id"])
        dao.borrar(rol)
        return Response(json.dumps({'sucess': 'true'}))
    if (request.method == 'PUT'):
        u = Unpickler()
        dao = RolDAO()
        id_rol = request.matchdict['id_rol']
        entidad = u.restore(request.json_body);
        rol = dao.get_by_id(id_rol)
        estado_dao = RolEstadoDAO();
        if (isinstance(entidad["_estado"], dict)):
            estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]["_estado"]).first()
        else:
            estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]).first()
        
        rolDAO = RolDAO();
        rolFinalDAO = RolFinalDAO();
        vieja = rolDAO.get_by_id(entidad["id"]);
        p = Pickler()
        
        if (isinstance(vieja, RolFinal)):
            if (entidad["_esFinal"] == True):
#                Si ambas son finales
                vieja._nombre = entidad["_nombre"]
                vieja._password = entidad["_password"]
                vieja._email = entidad["_email"]
                vieja._estado = estado;
                rolFinalDAO.update(vieja);
                aRet = p.flatten(vieja)
                p.flatten(entidad)
                return Response(json.dumps({'sucess': 'true'}))
            else:
                nueva = Rol(vieja._nombre, estado);
                rolFinalDAO.borrar(vieja)
                rolDAO.crear(nueva);
                aRet = p.flatten(nueva)
                p.flatten(entidad)
                return Response(json.dumps({'sucess': 'true'}))
        else:
            if (entidad["_esFinal"] == True):
                nueva = RolFinal(entidad["_nombre"], estado, entidad["_email"], entidad["_password"])
                rolDAO.borrar(vieja);
                rolFinalDAO.crear(nueva)
                aRet = p.flatten(nueva)
                p.flatten(entidad)
                return Response(json.dumps({'sucess': 'true'}))
            else:
                vieja._nombre = entidad["_nombre"]
                vieja._estado = estado;
                rolDAO.update(vieja);
                aRet = p.flatten(vieja)
                p.flatten(entidad)
                return Response(json.dumps({'sucess': 'true'}))
        

@view_config(route_name='estados_roles')
def get_estado_roles(request):
    """Metodo que maneja las llamadas para estados de roles
        - Retorna una lista si se envia GET
    """
#    if (request.method == 'GET'):
    re = RolEstadoDAO()
    entidades = re.get_query().all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
        lista.append(p.flatten(entidad))
            
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'estados':j_string})
#    print a_ret
    return Response(a_ret)
        
        
