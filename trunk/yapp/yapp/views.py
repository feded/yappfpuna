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
from pyramid.security import forget
from pyramid.view import view_config
from pyramid_mailer.message import Message
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.daos.rol_final_dao import RolFinalDAO
from yapp.daos.rol_privilegio_dao import RolPrivilegioDAO
from yapp.models.proyecto.proyecto import Proyecto
from yapp.models.roles.rol_privilegio import RolPrivilegio
import json
import yapp
from yapp.filter import PrivilegioHolder
from yapp.daos.rol_rol_dao import RolRolDAO


#Ponemos nuestros View callables

#@view_config(route_name='index', renderer="templates/index.pt")
#def index_view(request):
#    return {}

#@view_config(route_name='main', renderer="templates/main.pt")
#def main_view(request):
#    return {}

#@view_config(context='pyramid.exceptions.NotFound',
#             renderer='templates/notFound.pt')
#def notfound_view(request):
#    return {}

@view_config(route_name='login' , renderer="templates/login/login.pt")
def login_view(request):
    if request.method == 'POST' and request.POST.get("type") == 'login':
        mail = request.POST.get("usuario")
        password = request.POST.get("password")
        rh = RolFinalDAO(request)
        query = rh.get_query()
        query = query.filter_by(_email=mail , _password=password)
        query.omitir_seguridad = True
        rol = query.first()
        if rol != None:
            session = request.session
            session['user'] = rol
            session['holder'] = crearPrivilegioHolder(request, rol)
            session['holder'].imprimir()
            session.changed()
            return Response(json.dumps({'success': True}))
        return Response( json.dumps({'failure': True}))
    elif request.method == 'POST' and request.POST.get("type") == 'olvide':
        email = request.POST.get("usuario")
        rh = RolFinalDAO(request)
        rol = rh.get_query().filter_by(_email=email).first()
        # enviar un mail al cliente con nueva contrasena
        if rol != None:
            mailer = request.registry['mailer']
            message = Message(subject="Olvide - YAPP",
                      sender="yapp.server@gmail.com",
                      recipients=[rol._email],
                      body="Sr/a " + rol._nombre + " Usted ha solicitado su clave de acceso para YAPP." +
                      "\nSu clave de acceso es: " + rol._password +
                      "\nGracias por utilizar YAPP.")
            mailer.send(message)
            return Response(json.dumps({'success': True}))
        return Response( json.dumps({'failure': True}))
    return {}


def crearPrivilegioHolder(request, rol):
    dao = RolPrivilegioDAO(request)
    rr_dao= RolRolDAO(request)
#    entities = dao.get_query().filter(RolPrivilegio._rol_id==rol._id).all();
    holder = PrivilegioHolder(rol)
    
    holder.agregar_privilegios_rol(request, rol._id, rr_dao, dao)
    return holder
    


@view_config(route_name='crearProyecto', renderer="templates/crearProyecto.pt")
def crearProyecto_view(request):
    print 'Renderizando proyecto'
    if request.method == 'POST':
        print 'Creando proyecto'
        nombre = request.POST.get('nombre')
        autor = request.POST.get('autor')
        proyecto = Proyecto(nombre, autor)
        p_dao = ProyectoDAO(request);
        p_dao.crear(proyecto)
        return Response( json.dumps({'success': True}))
#        rh = RolDAO(request)
#        rol = rh.get_by_id(1)
#        rh.get_query().all()
#        print rol._nombre;
    return {}

#@view_config(route_name='olvide', renderer='templates/login/olvide.pt')
#def olvide(request):
#    if request.method == 'GET':
#        email = request.GET.get("email")
## enviar un mail al cliente con nueva contrasena
#        rh = RolFinalDAO(request)
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
#        rh = RolFinalDAO(request)
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
    request.session['rol'] = None
    request.session['holder'] = None
    request.session.invalidate()
    return Response(json.dumps({'success': True}))