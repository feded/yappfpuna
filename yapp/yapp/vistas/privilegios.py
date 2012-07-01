'''
Created on Apr 7, 2012

@author: arturo
'''
from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.entidad_padre_dao import EntidadPadreDAO
from yapp.daos.privilegio_dao import PrivilegioDAO
from yapp.daos.rol_privilegio_dao import RolPrivilegioDAO
from yapp.models.roles.privilegio import PrivilegioDTO
from yapp.models.roles.rol_privilegio import RolPrivilegio, RolPrivilegioDTO
import json
from yapp.daos.rol_dao import RolDAO

@view_config(route_name='rol_privilegios')
def get_privilegios(request):
    """Metodo que maneja las llamadas para privilegios
        - Retorna una lista si se envia GET
        - Agrega si se envia POST
        - Modifica si se envia PUT
        - Elimina si se envia DELETE
    """
    if (request.method == 'GET'):
        id_rol = request.GET.get('id_rol')
        dao = RolPrivilegioDAO(request);
        entidades = dao.get_query().filter(RolPrivilegio._rol_id == id_rol).all()
        lista = [];
        p = Pickler()
        for entidad in entidades:
            n_entidad = RolPrivilegioDTO(entidad)
            lista.append(p.flatten(n_entidad))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'privilegios':j_string})
        return Response(a_ret)
    
    if (request.method == 'POST'):
        u = Unpickler()
        #{"id":0,"_entidad":1,"_privilegio":1,"_permitir":true,"_rol":2}
        objeto = u.restore(request.json_body);
        if (objeto['_entidad'] == ''):
            entidad = None
        else:
            entidad = EntidadPadreDAO(request).get_by_id(objeto['_entidad']);
        privilegio = PrivilegioDAO(request).get_by_id(objeto['_privilegio']);
        rol = RolDAO(request).get_by_id(objeto['_rol']);
        nuevo = RolPrivilegio(privilegio, entidad, rol, objeto['_permitir']);
        dao = RolPrivilegioDAO(request);
        dao.crear(nuevo);
        
        p = Pickler()
        aRet = p.flatten(nuevo)
        return Response(json.dumps({'sucess': 'true', 'privilegios':aRet}))
    
    if (request.method == 'DELETE'):
        id_privilegio = request.matchdict['id_privilegio']
        dao = RolPrivilegioDAO(request)
        entidad = dao.get_by_id(id_privilegio);
        dao.borrar(entidad)
        return Response(json.dumps({'sucess': 'true'}))
    

@view_config(route_name='privilegios')
def get_entidades(request):
    """Metodo que maneja las llamadas para entidades
        - Retorna una lista si se envia GET
    """
    if (request.method == 'GET'):
        dao = PrivilegioDAO(request);
        entidades = dao.get_all()
        lista = [];
        p = Pickler()
        for objeto in entidades:
            epDAO = PrivilegioDTO(objeto);
#            print epDAO._nombre;
            lista.append(p.flatten(epDAO))
            
        j_string = p.flatten(lista)
        a_ret = json.dumps({'sucess': 'true', 'entidades':j_string})
        return Response(a_ret)

