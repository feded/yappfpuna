from jsonpickle.pickler import Pickler
from jsonpickle.unpickler import Unpickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.permisos_dao import PermisosDAO
from yapp.daos.permisos_roles_dao import PermisosRolesDAO
from yapp.daos.rol_dao import RolDAO
from yapp.models.roles.permisos import PermisoDTO
from yapp.models.roles.permisos_roles import PermisosRoles, PermisoRolDTO
import json





@view_config(route_name='rol_permisos')
def obtener_permisos(request):
    
    user = request.session['user']
    
    r = RolDAO(request)
    rol = r.get_by_id(user._id)

    rd = PermisosRolesDAO(request)
    
    if request.GET.get('id') != None:
        permisos = rd.get_query().filter(PermisosRoles._rol_id == request.GET.get('id')).order_by(PermisosRoles._permiso_id.asc()).all()
    else:
        permisos = get_permisos_rol(request, rol, [], rd, [], r)
    lista = [];
    p = Pickler()
    for permiso in permisos:
        a = PermisoRolDTO(permiso)
        a._rol = rol
        lista.append(p.flatten(a))    
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'permisos':j_string})    
        
    return Response(a_ret)

def get_permisos_rol(request, rol, permisos, rol_permiso_dao, roles_visitados, dao_rol):
    roles_visitados.append(rol._id)
    mas_permisos = rol_permiso_dao.get_query().filter(PermisosRoles._rol == rol).all()
    for permiso in mas_permisos:
        if permiso in permisos:
            continue
        permisos.append(permiso)
    for rol_padre in rol._padres:
        if rol_padre in roles_visitados:
            continue;
#        avisitar = dao_rol.get_by_id(rol_padre._padre._id)
        avisitar = rol_padre._padre
#        avisitar = dao_rol.get_by_id(rol_padre._padre._id)
        permisos = get_permisos_rol(request, avisitar, permisos, rol_permiso_dao, roles_visitados, dao_rol)
    
    return permisos
    

@view_config(route_name='rol_permisos_rest')
def permisos_rest(request):
    if request.method == "POST" :
        u = Unpickler()
        objeto = u.restore(request.json_body);
        permiso_dao = PermisosDAO(request);
        id_permiso = objeto["_permiso"]
        permiso = permiso_dao.get_by_id(id_permiso)
        rol_dao = RolDAO(request)
        id_rol = objeto["_rol"]
        rol = rol_dao.get_by_id(id_rol)
        
        objeto = PermisosRoles(permiso, rol)
        dao = PermisosRolesDAO(request)
        dao.crear(objeto)
        dto = PermisoRolDTO(objeto);
        p = Pickler()
        aRet = p.flatten(dto)
        return Response(json.dumps({'sucess': 'true', 'permisos':aRet}))
    if request.method == "DELETE":
        id = request.matchdict['id']
        dao = PermisosRolesDAO(request)
        entidad = dao.get_by_id(id);
        dao.borrar(entidad);
        return Response(json.dumps({'sucess': 'true'}))
    return ""
    
@view_config(route_name='permisos')
def get_all_permisos(request):
    permisos_dao = PermisosDAO(request)
    permisos = permisos_dao.get_query().all()
    p = Pickler()
    lista = [];
    for permiso in permisos:
        a = PermisoDTO(permiso)
        lista.append(p.flatten(a))
    j_string = p.flatten(lista)
    a_ret = json.dumps({'sucess': 'true', 'permisos':j_string})
    return Response(a_ret)


