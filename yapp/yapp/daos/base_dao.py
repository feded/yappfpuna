'''
Created on Mar 31, 2012

@author: arturo
'''
from sqlalchemy.orm.query import Query
from sqlalchemy.orm.scoping import instrument
from yapp.models import DBSession
from yapp.models.entidad_padre import EntidadPadre
from yapp.models.historial import Historial
from yapp.models.suscripcion.notificacion import Notificacion
from yapp.models.suscripcion.suscripcion import Suscripcion
import abc
import transaction
import types

class BaseDAO :
    
    def __init__(self, request):
        self._request = request
    
    @abc.abstractmethod
    def get_clase(self):
        """B{Metodo que retorna la entidad que maneja el DAO (Data Access Object)}
        - B{Retorna:}
            - B{Clase:} clase que es manejada.
        """
        return BaseDAO;
    
    def get_by_id(self, id):
        """B{Metodo que retorna una entidad segun su ID}
        - B{Parametros:} 
            - B{id:} id de la entidad a buscar.
        - B{Retorna:}
            - B{Entidad:} Entidad con ID pedido, o None.
        """
        entidad = self.get_query().filter_by(_id=id).first();
        return entidad;

    def get_all(self):
        """B{Metodo que retorna una lista de entidades}
        - B{Retorna:}
            - B{List<Entidad>: Todas} las entidades de una tabla.
        """
        return self.get_query().all()
    
    def get_query(self):
        """B{Metodo que retorna una query para que se le pueda aplicar filtros}
        - B{Retorna:} query que puese ser usado para aplicar metodos como 
            - filter
            - first()
            - all()
        """
        
#        queryReal = DBSession.query(self.get_clase())
#        print queryReal
        query = DBSession.query(self.get_clase())
        if self._request != None:
            query.sesion_yapp = self._request.session
        query.clase = self.get_clase()
        return query
    
    def crear(self, entidad):
        """B{Metodo que retorna crea una entidad, y almacena la creacion en la tabla de B{HISTORIAL}
        - B{Parametros:} 
            - B{entidad:} entidad a ser persistida
        - B{Retorna:}
            - B{entidad:} entidad persistida
        """
        DBSession.add(entidad)
        DBSession.flush()
        lista = self.get_query().all();
        entidad = lista[len(lista) - 1];
        if (self._request != None):
            #no va a tener user en caso de que venga del pyunit
            if ('user' in self._request.session):
                historia = Historial(entidad.__tablename__, entidad._id, "CREACION", self._request.session['user']._id);
                DBSession.add(historia)
                self.notificar(entidad, historia)
        return entidad;
         
    def borrar(self, entidad):
        """B{Metodo que retorna elimina permanentemente una entidad y almacena su eliminacion en el historial}
        - B{Parametros:} 
            - B{entidad:} entidad a ser eliminada
        """
        DBSession.delete(entidad);
        if (self._request != None):
            #no va a tener user en caso de que venga del pyunit
            if ('user' in self._request.session):
                historia = Historial(entidad.__tablename__, entidad._id, "ELIMINACION", self._request.session['user']._id);
                DBSession.add(historia)
               
                self.notificar(entidad, historia)
        
    def update(self, entidad):
        """B{Metodo que actualiza una entidad en la base de datos, y almacena su modificacion en el historial}
        - B{Parametros:} 
            - B{entidad:} entidad a ser persistida
        """
        DBSession.merge(entidad)
        if (self._request != None):
            #no va a tener user en caso de que venga del pyunit
            if ('user' in self._request.session):
                historia = Historial(entidad.__tablename__, entidad._id, "MODIFICACION", self._request.session['user']._id);
                DBSession.add(historia)
                
                self.notificar(entidad, historia)
    
    def notificar(self, entidad, historia):
        if (isinstance(entidad, EntidadPadre)):
            print "-----------------"
            dao = SuscripcionDAO(self._request)
            nDAO = NotificacionDAO(self._request)
            entidades = dao.get_query().filter(Suscripcion._entidad_padre_id == entidad._id);
            for suscripcion in entidades:
                notificacion = Notificacion(historia, suscripcion, False)
                nDAO.crear(notificacion);
        return
    

class HistorialDAO(BaseDAO):
    def get_clase(self):
        return Historial

class SuscripcionDAO(BaseDAO):
    def get_clase(self):
        return Suscripcion
    
class NotificacionDAO(BaseDAO):
    def get_clase(self):
        return Notificacion
