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

from pyramid.view import view_config
from yapp.models import DBSession
from yapp.models.proyecto.proyecto import Proyecto
import transaction
#Ponemos nuestros View callables

@view_config(route_name='main', renderer="templates/main.pt")
def main_view(request):
    return {}

@view_config(context='pyramid.exceptions.NotFound',
             renderer='templates/notFound.pt')
def notfound_view(request):
    return {}

@view_config(route_name='crearProyecto', renderer="templates/crearProyecto.pt")
def crearProyecto_view(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        autor = request.POST.get('autor') 
        with transaction.manager:
            proyecto = Proyecto(nombre, autor)
            DBSession.add(proyecto)
            otro = DBSession.query(Proyecto).all()
            for proyecto in otro:
                print str(proyecto._id) + "\n"
    return {}
