#from pyramid.response import Response
#from pyramid.view import view_config
#
#from sqlalchemy.exc import DBAPIError
#
#from .models import (
#    DBSession
#    )
#
#@view_config(route_name='home', renderer='templates/mytemplate.pt')
#def my_view(request):
#    return 
#conn_err_msg = """\
#Pyramid is having a problem using your SQL database.  The problem
#might be caused by one of the following things:
#
#1.  You may need to run the "initialize_yapp_db" script
#    to initialize your database tables.  Check your virtual 
#    environment's "bin" directory for this script and try to run it.
#
#2.  Your database server may not be running.  Check that the
#    database server referred to by the "sqlalchemy.url" setting in
#    your "development.ini" file is running.
#
#After you fix the problem, please restart the Pyramid application to
#try it again.
#"""

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

@view_config(route_name='index', renderer="templates/index.pt")
def index_view(request):
    return {}

#@view_config(route_name='main', renderer="templates/main.pt")
#def main_view(request):
#    return {}

#@view_config(context='pyramid.exceptions.NotFound',
#             renderer='templates/notFound.pt')
#def notfound_view(request):
#    return {}

@view_config(route_name='login' , renderer="templates/login/login.pt")
def login_view(request):
    if request.method == 'POST':
        mail = request.POST.get("usuario")
        password = request.POST.get("password")
        rh = RolFinalDAO()
        rol = rh.get_query().filter_by(_email=mail , _password=password).first()
        if rol != None:
            print "logueando"
            return Response( json.dumps({'success': True}))
        return Response( json.dumps({'failure': True}))
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
        return Response( json.dumps({'success': True}))
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
        no_es_final = request.POST.get('email') != ""
        if no_es_final == True:
            email = request.POST.get('email')
            password = request.POST.get('password')
            rf = RolFinal(nombre, estado, email, password)
            dao = RolFinalDAO()
            dao.crear(rf)
        else:
            rf = Rol(nombre, estado)
            dao = RolDAO()
            dao.crear(rf)
        return HTTPFound(location=request.route_url('main'))
    return {}


#@view_config(route_name='olvide', renderer='templates/login/olvide.pt')
#def olvide(request):
#    if request.method == 'GET':
#        email = request.GET.get("email")
## enviar un mail al cliente con nueva contrasena
#        rh = RolFinalDAO()
#        rol = rh.get_query().filter_by(_email=email).first()
#        if rol != None:
#            return dict(
#                message = "Se enviara un mail con su contrasenha",
#                url = request.application_url + '/login',
#                came_from = "/",
#                usuario = rol._email,
#                password = rol._contrasenha,     
#                )
    

#@view_config(route_name='login', renderer='templates/login.pt')
#@forbidden_view_config(renderer='templates/login.pt')
#def login(request):
#    login_url = request.route_url('login')
#    referrer = request.url
#    if referrer == login_url:
#        referrer = '/' # never use the login form itself as came_from
#    came_from = request.params.get('came_from', referrer)
#    message = ''
#    usuario = ''
#    password = ''
#    if 'form.submitted' in request.params:
#        mail = request.params['usuario']
#        password = request.params['password']
#        rh = RolFinalDAO()
#        rol = rh.get_query().filter_by(_email=mail , _password=password).first()
#        if rol != None:
#            headers = remember(request, mail)
#            return HTTPFound(location = '/main',
#                             headers = headers)
#        message = 'Usuario o contrasenha incorrecta'
#
#    return dict(
#        message = message,
#        url = request.application_url + '/login',
#        came_from = came_from,
#        usuario = usuario,
#        password = password,
#        )

@view_config(route_name='logout')
def logout(request):
    headers = forget(request)
    return HTTPFound(location = request.route_url('login'),
                     headers = headers)