from pyramid.response import Response
from pyramid.view import view_config
from pyramid_mailer.message import Message
from yapp.daos.rol_final_dao import RolFinalDAO
from yapp.daos.rol_privilegio_dao import RolPrivilegioDAO
from yapp.daos.rol_rol_dao import RolRolDAO
from yapp.filter import PrivilegioHolder
from yapp.models import DBSession
from yapp.models.historial import Historial
import json
from yapp.daos.base_dao import BaseDAO


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
            session['user'] = None
            session['holder'] = None
            session.changed()
            
            
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
    

def crear(self, entidad):
    """B{Metodo que retorna crea una entidad, y almacena la creacion en la tabla de B{HISTORIAL}
    - B{Parametros:} 
        - B{entidad:} entidad a ser persistida
    - B{Retorna:}
        - B{entidad:} entidad persistida
    """
    DBSession.add(entidad)
    DBSession.flush()
    
#        lista = self.get_query().all();
#        entidad = lista[len(lista) - 1];
    if (self._request != None):
        self._request.session['holder'] = crearPrivilegioHolder(self._request, self._request.session['user'])
        #no va a tener user en caso de que venga del pyunit
        if ('user' in self._request.session):
            historia = Historial(entidad.__tablename__, entidad._id, "CREACION", self._request.session['user']._id);
            DBSession.add(historia)
            self.notificar(entidad, historia)
    return entidad;

BaseDAO.crear = crear

@view_config(route_name='logout')
def logout(request):
    request.session['rol'] = None
    request.session['holder'] = None
    request.session.invalidate()
    return Response(json.dumps({'success': True}))