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

from pyramid.view import view_config
from sqlalchemy.types import Unicode
from yapp.daos.rol_dao import RolDAO, RolFinalDAO
from yapp.models.proyecto.proyecto import Proyecto
from yapp.models.roles.rol import Rol
from yapp.models.roles.rol_final import RolFinal
from yapp.models.roles.rol_final import RolFinal
from yapp.daos.rol_final_dao import RolDAO
from pyramid.httpexceptions import HTTPFound


#Ponemos nuestros View callables

@view_config(route_name='main', renderer="templates/main.pt")
def main_view(request):
    return {}

@view_config(context='pyramid.exceptions.NotFound',
             renderer='templates/notFound.pt')
def notfound_view(request):
    return {}

@view_config(route_name='login' , renderer="templates/login.pt")
def login_view(request):
    if request.method == 'POST':
        mail = request.POST.get("")
        password = request.POST.get("")
        rh = RolDAO()
        rol = rh.get_query().filter(_email == mail , _contrasenha == password).first()
        if rol != None:
            return{'sucesss': True}
        return{'sucesss': False}



@view_config(route_name='crearProyecto', renderer="templates/crearProyecto.pt")
def crearProyecto_view(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        autor = request.POST.get('autor')
#        rh = RolDAO()
#        rol = rh.get_by_id(1)
#        rh.get_query().all()
#        print rol._nombre;
    return {}

@view_config(route_name='crearRol', renderer="templates/rol/new_rol.pt")
def crear_rol(request):
    print "Me llamaron"
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
        
    return {}