from yapp.models import DBSession
import transaction
import abc

class BaseDAO:
    @abc.abstractmethod
    def get_clase(self):
        """retorna la clase a buscar"""
        return BaseDAO;
    
    def get_by_id(self, id):
        with transaction.manager:
            entidad = DBSession.query(self.get_clase()).filter_by(_id=id).first();
            return entidad;
        
    def get_all(self):
        return DBSession.query(self.get_clase()).all()
    
    def get_query(self):
        return DBSession.query(self.get_clase())
    
    def crear(self, entidad):
        DBSession.add(entidad)
        lista = self.get_query().all();
        entidad = lista[len(lista) - 1];
        historia = Historial(entidad.__tablename__, entidad._id, "CREACION", "");
        DBSession.add(historia)
         
    def borrar(self, entidad):
        historia = Historial(entidad.__tablename__, entidad._id, "ELIMINACION", "");
        DBSession.add(historia)
        DBSession.delete(entidad);
        
    def update(self, entidad):
#        dao = HistorialDAO();
        historia = Historial(entidad.__tablename__, entidad._id, "MODIFICACION", "");
        DBSession.add(historia)
        DBSession.merge(entidad)

from yapp.models.historial import Historial
class HistorialDAO(BaseDAO):
    def get_clase(self):
        return Historial