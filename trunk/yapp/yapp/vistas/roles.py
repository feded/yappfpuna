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
from yapp.daos.rol_rol_dao import RolRolDAO
from yapp.models.roles.rol import Rol, RolDTO, RolRol, RolDTOP
from yapp.models.roles.rol_estado import RolEstado, RolEstadoDTO
from yapp.models.roles.rol_final import RolFinal
import json


@view_config(route_name='rolesfinales')
def get_roles_finales(request):
    dao = RolFinalDAO(request);
    entidades = dao.get_all()
    lista = []
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
    
@view_config(route_name='roles')
def get_roles(request):
    """Metodo que maneja las llamadas para roles
        - Retorna una lista si se envia GET
        - Agrega si se envia POST
        - Modifica si se envia PUT
        - Elimina si se envia DELETE
    """
#    print request.json_body;
    if (request.method == 'GET'):
        if (request.GET.get('disponibles')):
            return getPadresDisponibles(request)
        rd = RolDAO(request)
        entidades = rd.get_all()
        lista = [];
        p = Pickler(False, None)
        for entidad in entidades:
            rol = crear_rol_dto(entidad)
            lista.append(p.flatten(rol))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'users':j_string})
        return Response(a_ret)
    if (request.method == 'POST'):
        
        u = Unpickler()
        entidad = u.restore(request.json_body);
        if (entidad["accion"] == "POST"):
            estado_dao = RolEstadoDAO(request);
            if (isinstance(entidad["_estado"], dict)):
                estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]["_estado"]).first()
            else:
                estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]).first()
            if (entidad["_esFinal"] == True):
                nueva_entidad = RolFinal(entidad["_nombre"], estado, entidad["_email"], entidad["_password"])
                dao = RolFinalDAO(request)
            else:
                nueva_entidad = Rol(entidad["_nombre"], estado)
                dao = RolDAO(request)
                
            
            dao.crear(nueva_entidad);
            
            rr_dao = RolRolDAO(request)
            padres = []
            for padre_id in entidad["_padres"]:
                rolrol = RolRol(nueva_entidad._id, padre_id)
                rr_dao.crear(rolrol)
                padres.append(rolrol)
            nueva_entidad._padres = padres;    
            
            p = Pickler(False, None)
            rolDTO = crear_rol_dto(nueva_entidad)
            aRet = p.flatten(rolDTO)
            p.flatten(entidad)
            return Response(json.dumps({'sucess': 'true', 'users':aRet}))
    if (request.method == 'DELETE'):
        dao = RolDAO(request)
        u = Unpickler()
        entidad = u.restore(request.json_body);
        rol = dao.get_by_id(entidad["id"])
        dao.borrar(rol)
        return Response(json.dumps({'sucess': 'true'}))
    if (request.method == 'PUT'):
        u = Unpickler()
        dao = RolDAO(request)
        id_rol = request.matchdict['id_rol']
        entidad = u.restore(request.json_body);
        rol = dao.get_by_id(id_rol)
        estado_dao = RolEstadoDAO(request);
        if (isinstance(entidad["_estado"], dict)):
            estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]["_estado"]).first()
        else:
            estado = estado_dao.get_query().filter(RolEstado._estado == entidad["_estado"]).first()
        
        rolDAO = RolDAO(request);
        rolFinalDAO = RolFinalDAO(request);
        vieja = rolDAO.get_by_id(entidad["id"]);
        p = Pickler(False, None)
        
        
        rr_dao = RolRolDAO(request)
        for padre in vieja._padres:
            rr_dao.borrar(padre);
            
        padres = []
#        print "-------------"
#        print entidad["_padres"]
#        print "-------------"
        for padre_id in entidad["_padres"]:
            rolrol = RolRol(vieja._id, padre_id)
            rr_dao.crear(rolrol)
            padres.append(rolrol)
#        vieja._padres = padres;
#            
#        for padre in vieja._padres:
#            print "-------------"
#            print padre._padre_id
#            print padre._rol_id
#            print "-------------"
        
        if (isinstance(vieja, RolFinal)):
            if (entidad["_esFinal"] == True):
#                Si ambas son finales
                vieja._nombre = entidad["_nombre"]
                vieja._password = entidad["_password"]
                vieja._email = entidad["_email"]
                vieja._estado = estado;
                rolFinalDAO.update(vieja);
                aRet = p.flatten(setear_padres_rol_y_obtener_dto(vieja, padres))
                return Response(json.dumps({'sucess': 'true', 'users':aRet}))
            else:
                nueva = Rol(vieja._nombre, estado);
                rolFinalDAO.borrar(vieja)
                rolDAO.crear(nueva);
                aRet = p.flatten(setear_padres_rol_y_obtener_dto(nueva, padres))
                return Response(json.dumps({'sucess': 'true', 'users':aRet}))
        else:
            if (entidad["_esFinal"] == True):
                nueva = RolFinal(entidad["_nombre"], estado, entidad["_email"], entidad["_password"])
                rolDAO.borrar(vieja);
                rolFinalDAO.crear(nueva)
                aRet = p.flatten(setear_padres_rol_y_obtener_dto(nueva, padres))
                return Response(json.dumps({'sucess': 'true', 'users':aRet}))
            else:
                vieja._nombre = entidad["_nombre"]
                vieja._estado = estado;
                rolDAO.update(vieja);
                aRet = p.flatten(setear_padres_rol_y_obtener_dto(vieja, padres))
                return Response(json.dumps({'sucess': 'true', 'users':aRet}))
        

@view_config(route_name='estados_roles')
def get_estado_roles(request):
    """Metodo que maneja las llamadas para estados de roles
        - Retorna una lista si se envia GET
    """
#    if (request.method == 'GET'):
    re = RolEstadoDAO(request)
    entidades = re.get_query().all()
    lista = [];
    p = Pickler()
    for entidad in entidades:
        lista.append(p.flatten(entidad))
            
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'estados':j_string})
#    print a_ret
    return Response(a_ret)
        
def getPadresDisponibles(request):
    
    rol_id = request.GET.get('id')
    #LO SIGUIENTE ES UNA ABERRACION
    rol_dao = RolDAO(request)
    rol_rol_dao = RolRolDAO(request)
    roles = rol_dao.get_all()
    baneados = []
    bandera = True
    base = None
    for rol in roles :
        print rol._id
        if str(rol._id) == str(rol_id):
            base = rol
            baneados.append(base._id)
            break
    if base == None:
        return retornador_de_roles(request, roles)
    
    roles.remove(base)
    relacionados = rol._padres
    for relacionado in relacionados:
        baneados.append(relacionado._padre_id)
    relacionados = rol_rol_dao.get_query().filter(RolRol._padre_id == base._id).all();
    for relacionado in relacionados:
        baneados.append(relacionado._rol_id)
    baneado = False
    aBorrar = []
    
    while bandera == True:
        bandera = False
        for rol in roles:
            baneado = False
            for ban in baneados:
                if rol._id == ban:
                    baneado = True
                    break
            if baneado == True:
                baneados.append(rol._id)
#                relacionados = rol._padres
#                for relacionado in relacionados:
#                    baneados.append(relacionado._padre_id);
                relacionados = rol_rol_dao.get_query().filter(RolRol._padre_id == rol._id).all()
                for relacionado in relacionados:
                    baneados.append(relacionado._rol_id);
                aBorrar.append(rol)
                break
        for borrado in aBorrar:
            roles.remove(borrado)
        aBorrar = []
    return retornador_de_roles(request, roles)

def retornador_de_roles(request, entidades):
    lista = []
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
    print a_ret
    return Response(a_ret)   

def crear_rol_dto(entidad):
    aRet = RolDTO(entidad)
    if (isinstance(entidad, RolFinal)):
        aRet._esFinal = True;
        aRet._password = entidad._password;
        aRet._email = entidad._email
    return aRet;

def setear_padres_rol_y_obtener_dto(entidad, padres):
    aRet = crear_rol_dto(entidad)
    aRet._padres = []
    for rol_padre in padres:
        aRet._padres.append(RolDTOP(rol_padre._padre))
#    entidad._padres = padres;
    return aRet;
