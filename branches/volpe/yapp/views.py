from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response
from pyramid.security import forget
from pyramid.view import view_config
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.daos.rol_dao import RolDAO, RolFinalDAO
from yapp.models.proyecto.proyecto import Proyecto
from yapp.models.roles.rol import Rol
from yapp.models.roles.rol_final import RolFinal
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
    
    return {"page_name" : 'Crear Rol'}


@view_config(route_name='test', renderer="templates/test.pt")
def test(request):
    return {}
    
@view_config(route_name='logout')
def logout(request):
    headers = forget(request)
    return HTTPFound(location=request.route_url('login'),
                     headers=headers)
    
@view_config(route_name='test2')
def test2(request):
    return Response("{\"success\":true,\"message\":\"Loaded data\",\"data\":[{\"id\":1,\"first\":\"Fred\",\"last\":\"Flintstone\",\"email\":\"fred@flintstone.com\"},{\"id\":2,\"first\":\"Wilma\",\"last\":\"Flintstone\",\"email\":\"wilma@flintstone.com\"},{\"id\":3,\"first\":\"Pebbles\",\"last\":\"Flintstone\",\"email\":\"pebbles@flintstone.com\"},{\"id\":4,\"first\":\"Barney\",\"last\":\"Rubble\",\"email\":\"barney@rubble.com\"},{\"id\":5,\"first\":\"Betty\",\"last\":\"Rubble\",\"email\":\"betty@rubble.com\"},{\"id\":6,\"first\":\"BamBam\",\"last\":\"Rubble\",\"email\":\"bambam@rubble.com\"}]}")
