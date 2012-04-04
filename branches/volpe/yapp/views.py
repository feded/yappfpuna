from compiler.ast import List
from jsonpickle.pickler import Pickler
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import remember, forget
from pyramid.view import view_config, forbidden_view_config
from sqlalchemy.types import Unicode
from yapp.daos import proyecto_dao
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.daos.rol_dao import RolDAO
from yapp.daos.rol_final_dao import RolFinalDAO
from yapp.models.proyecto.proyecto import Proyecto
from yapp.models.roles.rol import Rol
from yapp.models.roles.rol_final import RolFinal
from yapp.security import USERS
import json


#Ponemos nuestros View callables

@view_config(route_name='main', renderer="templates/main.pt")
def main_view(request):
    return {}

@view_config(context='pyramid.exceptions.NotFound',
             renderer='templates/notFound.pt')
def notfound_view(request):
    return {}

@view_config(route_name='login' , renderer="templates/login/login.pt")
def login_view(request):
    if request.method == 'POST':
        mail = request.POST.get("usuario")
        password = request.POST.get("password")
        rh = RolFinalDAO()
        rol = rh.get_query().filter_by(_email=mail , _password=password).first()
        if rol != None:
            print "logueando"
            return Response(json.dumps({'success': True}))
        return Response(json.dumps({'failure': True}))
    return {'success': 'ejeloguea'}



@view_config(route_name='crearProyecto', renderer="templates/crearProyecto.pt")
def crearProyecto_view(request):
    print 'Renderizando proyecto'
    if request.method == 'POST':
        print 'Creando proyecto'
        nombre = request.POST.get('nombre')
        autor = request.POST.get('autor')
        proyecto = Proyecto(nombre, autor)
        p_dao = ProyectoDAO();
        p_dao.crear(proyecto)
        return Response(json.dumps({'success': True}))
#        rh = RolDAO()
#        rol = rh.get_by_id(1)
#        rh.get_query().all()
#        print rol._nombre;
    return {}

@view_config(route_name='crearRol', renderer="templates/rol/new_rol.pt")
def crear_rol(request):
    print "Renderizando rol"
#    if request.method == 'POST':
    if request.method == 'POST':
        
        print "Creando nuevo rol"
        nombre = request.POST.get('nombre')
        estado = request.POST.get('estado')
        booleano = request.POST.get('expandido')
        if booleano == 'true':
            email = request.POST.get('email')
            password = request.POST.get('password')
            rf = RolFinal(nombre, estado, email, password)
            dao = RolFinalDAO()
            dao.crear(rf)
        else:
            rf = Rol(nombre, estado)
            dao = RolDAO()
            dao.crear(rf)
        return Response(json.dumps({'success': True}))
    
    page_name = "page_name"
    return {"page_name" : 'Crear Rol'}

@view_config(route_name='roles', renderer="templates/rol/roles.pt")
def view_roles(request):
    return {}


@view_config(route_name='getRoles')
def get_roles(request):
    rd = RolDAO()
    entidades = rd.get_query().all()
    lista = [];
    for entidad in entidades:
        lista.append({"_id": entidad._id})
        
    p = Pickler()
    j_string = p.flatten(lista)
    a_ret = json.dumps({"total":str(len(lista)), "roles":j_string})
#    a_ret = json.dumps({"total":"123", "roles":""})
    print a_ret
    return Response(json.dumps(a_ret))


@view_config(route_name='logout')
def logout(request):
    headers = forget(request)
    return HTTPFound(location=request.route_url('login'),
                     headers=headers)
    
class RolesLindos:
    def __init__(self, _id):
        self._id = _id;
class ARetornar:
    def __init__(self, roles):
        self.total = len(roles)
        self.roles = roles 