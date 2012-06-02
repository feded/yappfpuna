from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.rol_dao import RolDAO
from yapp.daos.permisos_roles_dao import PermisosRolesDAO
from yapp.models.roles.permisos_roles import PermisosRoles

import json

@view_config(route_name='obtenerpermisos')
def obtener_permisos(request):
    
    user = request.session['user']
    
    r = RolDAO(request)
    rol = r.get_by_id(user._id)
    

    rd = PermisosRolesDAO(request)
    permisos = rd.get_query().filter(PermisosRoles._rol == rol).all()
    lista = [];
    p = Pickler()
    for permiso in permisos:
        a = PermisosLindos(permiso._permiso._nombre)
        lista.append(p.flatten(a))    
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'permisos':j_string})    
        
    return Response(a_ret)

    


class PermisosLindos:
    def __init__(self, nombre):
        self._nombre = nombre;