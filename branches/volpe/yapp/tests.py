
#from pyramid import testing
#import transaction
from sqlalchemy import create_engine
from yapp.models import DBSession, Base
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.models.proyecto.proyecto import Proyecto
import unittest
import transaction

def _initTestingDB():
    engine = create_engine('postgres://yapp:yapp@127.0.0.1:5432/yapp')
    DBSession.configure(bind=engine)
    Base.metadata.create_all(engine)
    return DBSession
    
#
#class _initTestingDB(unittest.TestCase):
#    def setUp(self):
#        self.engine = create_engine('postgres://yapp:yapp@127.0.0.1:5432/yapp')
#        DBSession.configure(bind=self.engine)
#        Base.metadata.create_all(self.engine)

class creaProyecto(unittest.TestCase):
    def setUp(self):
        self.session = _initTestingDB()
        
    def tearDown(self):
        self.session.remove()
        
    def runTest(self):
        with transaction.manager:
            dao = ProyectoDAO()
            proyecto = Proyecto('ProyectoPrueba','Yapp',1,'Elaboracion','Yapp','Proyecto para test','19042012','12042012')
            dao.crear(proyecto)
            entidad = dao.get_query().filter_by(_nombre='ProyectoPrueba').first();
            self.assertNotEqual(entidad, None, "Proyecto no creado")
            
#class editarProyecto(_initTestingDB):
#    def runTest(self):
#        dao = ProyectoDAO()
#        entidad_vieja = dao.get_query().filter_by(_autor='Yapp').first();
#        print(entidad_vieja._nombre)
#        nombre_viejo = entidad_vieja._nombre
#        entidad_vieja._nombre = 'ProyectoPrueba2'
#        dao.update(entidad_vieja)
#        entidad_nueva = dao.get_query().filter_by(_autor='Yapp').first();
#        print(entidad_nueva._nombre)
#        nombre_nuevo = entidad_nueva._nombre
#        self.assertEqual(nombre_viejo, nombre_nuevo, "Proyecto no actualizado")
        

class eliminarProyecto(unittest.TestCase):
    def setUp(self):
        self.session = _initTestingDB()
        
    def tearDown(self):
        self.session.remove()
        
    def runTest(self):
        with transaction.manager:
            dao = ProyectoDAO()
            entidad = dao.get_query().filter_by(_nombre='ProyectoPrueba').first();
            dao.borrar(entidad)
            entidad = dao.get_query().filter_by(_nombre='ProyectoPrueba').first();
            self.assertEqual(entidad, None, "Proyecto no eliminado")            
