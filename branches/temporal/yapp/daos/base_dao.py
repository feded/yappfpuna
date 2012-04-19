'''
Created on Mar 31, 2012

@author: arturo
'''
from yapp.models import DBSession
import transaction
import abc

#  with transaction.manager:
#            proyecto = Proyecto(nombre, autor)
#            DBSession.add(proyecto)
#            otro = DBSession.query(Proyecto).all()
#            for proyecto in otro:
#                print str(proyecto._id) + "\n"
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

    def update(self, entidad):
        DBSession.merge(entidad)
    
    def borrar(self, entidad):
        DBSession.delete(entidad)
