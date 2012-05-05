'''
Created on Mar 31, 2012

@author: arturo
'''
from yapp.models import DBSession
from yapp.models.historial import Historial, Historial
import abc
import transaction

class BaseDAO :
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
        entidad = DBSession.query(self.get_clase()).filter_by(_id=id).first();
        return entidad;

    def get_all(self):
        """B{Metodo que retorna una lista de entidades}
        - B{Retorna:}
            - B{List<Entidad>: Todas} las entidades de una tabla.
        """
        return DBSession.query(self.get_clase()).all()
    
    def get_query(self):
        """B{Metodo que retorna una query para que se le pueda aplicar filtros}
        - B{Retorna:} query que puese ser usado para aplicar metodos como 
            - filter
            - first()
            - all()
        """
        return DBSession.query(self.get_clase())
    
    def crear(self, entidad):
        """B{Metodo que retorna crea una entidad, y almacena la creacion en la tabla de B{HISTORIAL}
        - B{Parametros:} 
            - B{entidad:} entidad a ser persistida
        - B{Retorna:}
            - B{entidad:} entidad persistida
        """
        DBSession.add(entidad)
        lista = self.get_query().all();
        entidad = lista[len(lista) - 1];
        historia = Historial(entidad.__tablename__, entidad._id, "CREACION", "");
        DBSession.add(historia)
        return entidad;
         
    def borrar(self, entidad):
        """B{Metodo que retorna elimina permanentemente una entidad y almacena su eliminacion en el historial}
        - B{Parametros:} 
            - B{entidad:} entidad a ser eliminada
        """
        historia = Historial(entidad.__tablename__, entidad._id, "ELIMINACION", "");
        DBSession.add(historia)
        DBSession.delete(entidad);
        
    def update(self, entidad):
        """B{Metodo que actualiza una entidad en la base de datos, y almacena su modificacion en el historial}
        - B{Parametros:} 
            - B{entidad:} entidad a ser persistida
        """
        dao = HistorialDAO();
        historia = Historial(entidad.__tablename__, entidad._id, "MODIFICACION", "");
        DBSession.add(historia)
        DBSession.merge(entidad)

class HistorialDAO(BaseDAO):
    def get_clase(self):
        return Historial

