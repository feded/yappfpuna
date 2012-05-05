
#from pyramid import testing
#import transaction
from sqlalchemy import create_engine
from yapp.daos.atributo_tipo_item_dao import AtributoTipoItemDAO
from yapp.daos.base_dao import SuscripcionDAO
from yapp.daos.entidad_padre_dao import EntidadPadreDAO
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.daos.rol_dao import RolEstadoDAO
from yapp.daos.rol_final_dao import RolFinalDAO
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.models import DBSession, Base
from yapp.models.entidad_padre import EntidadPadre
from yapp.models.proyecto.proyecto import Proyecto
from yapp.models.roles.rol_estado import RolEstado
from yapp.models.roles.rol_final import RolFinal
from yapp.models.suscripcion.suscripcion import Suscripcion
from yapp.models.tipo_item.atributo_tipo_item import AtributoTipoItem
from yapp.models.tipo_item.tipo_item import TipoItem
import transaction
import unittest

def _initTestingDB():
    """Configura sesion para los tests"""
    engine = create_engine('postgres://yapp:yapp@127.0.0.1:5432/yapp')
    DBSession.configure(bind=engine)
    Base.metadata.create_all(engine)
    return DBSession

class creaProyecto(unittest.TestCase):
    def setUp(self):
        self.session = _initTestingDB()
        
    def tearDown(self):
        self.session.remove()
        
    def runTest(self):
        """Testeando crear proyecto"""
        print self.shortDescription()    
        with transaction.manager:
            dao = ProyectoDAO(None)
            proyecto = Proyecto('ProyectoPrueba','Yapp',1,'Elaboracion','Yapp','Proyecto para test','19042012','12042012')
            dao.crear(proyecto)
            entidad = dao.get_query().filter_by(_nombre='ProyectoPrueba').first();
            self.assertNotEqual(entidad, None, "Proyecto no creado")
            
#class editarProyecto(_initTestingDB):
#    def runTest(self):
#        dao = ProyectoDAO(None)
#        entidad_vieja = dao.get_query().filter_by(_autor='Yapp').first();
#        print(entidad_vieja._nombre)
#        nombre_viejo = entidad_vieja._nombre
#        entidad_vieja._nombre = 'ProyectoPrueba2'
#        dao.update(entidad_vieja)
#        entidad_nueva = dao.get_query().filter_by(_autor='Yapp').first();
#        print(entidad_nueva._nombre)
#        nombre_nuevo = entidad_nueva._nombre
#        self.assertEqual(nombre_viejo, nombre_nuevo, "Proyecto no actualizado")
        

            
class crearRoFinal(unittest.TestCase):
    def setUp(self):
        self.session = _initTestingDB()
        
    def tearDown(self):
        self.session.remove()
        
    def runTest(self):
        """Testeando crear rol final"""
        print self.shortDescription()
        with transaction.manager:
            estado_dao = RolEstadoDAO(None);
            estado = estado_dao.get_query().filter(RolEstado._estado == "Activo").first()
            dao = RolFinalDAO(None)
            entidad = RolFinal('Rol Prueba', estado , 'prueba@gmail.com', 'pass')
            dao.crear(entidad)
            entidad = dao.get_query().filter_by(_nombre='Rol Prueba').first();
            self.assertNotEqual(entidad, None, "Rol no creado")  
              

class crearSuscripcion(unittest.TestCase):
    def setUp(self):
        self.session = _initTestingDB()
        
    def tearDown(self):
        self.session.remove()
        
    def runTest(self):
        """Testeando crear suscripcion"""
        print self.shortDescription()
            
        with transaction.manager:
            entidad_padre = EntidadPadreDAO(None);
            estado = entidad_padre.get_query().filter(EntidadPadre._nombre == "ProyectoPrueba").first()
            rol_final = RolFinalDAO(None);
            rol = rol_final.get_query().filter(EntidadPadre._nombre == "Rol Prueba").first()
            dao = SuscripcionDAO(None)
            entidad = Suscripcion('Suscripcion Prueba', estado , rol)
            dao.crear(entidad)
            entidad = dao.get_query().filter_by(_nombre='Suscripcion Prueba').first();
            self.assertNotEqual(entidad, None, "Suscripcion creada")  
            
    
class eliminarSuscripcion(unittest.TestCase):
    def setUp(self):
        self.session = _initTestingDB()
        
    def tearDown(self):
        self.session.remove()
        
    def runTest(self):
        """Testeando eliminar suscripcion"""
        print self.shortDescription()
        with transaction.manager:
            dao = SuscripcionDAO(None)
            entidad = dao.get_query().filter_by(_nombre='Suscripcion Prueba').first();
            dao.borrar(entidad)
            entidad = dao.get_query().filter_by(_nombre='Suscripcion Prueba').first();
            self.assertEqual(entidad, None, "Suscripcion no eliminada")
             
class eliminarProyecto(unittest.TestCase):
    def setUp(self):
        self.session = _initTestingDB()
        
    def tearDown(self):
        self.session.remove()
        
    def runTest(self):
        """Testeando eliminar proyecto"""
        print self.shortDescription()
        with transaction.manager:
            dao = ProyectoDAO(None)
            entidad = dao.get_query().filter_by(_nombre='ProyectoPrueba').first();
            dao.borrar(entidad)
            entidad = dao.get_query().filter_by(_nombre='ProyectoPrueba').first();
            self.assertEqual(entidad, None, "Proyecto no eliminado") 

class eliminarRolFinal(unittest.TestCase):
    def setUp(self):
        self.session = _initTestingDB()
        
    def tearDown(self):
        self.session.remove()
        
    def runTest(self):
        """Testeando eliminar rol final"""
        print self.shortDescription()
        with transaction.manager:
            dao = RolFinalDAO(None)
            entidad = dao.get_query().filter_by(_nombre='Rol Prueba').first();
            dao.borrar(entidad)
            entidad = dao.get_query().filter_by(_nombre='Rol Prueba').first();
            self.assertEqual(entidad, None, "Rol no eliminado")

class crearTipoItem(unittest.TestCase):
    def setUp(self):
        self.session = _initTestingDB()
        
    def tearDown(self):
        self.session.remove()
        
    def runTest(self):
        """Testeando crear tipo de item"""
        print self.shortDescription()
        with transaction.manager:
            dao = TipoItemDAO(None)
            tipo = TipoItem('TipoPrueba', 'prueba', 1, 'tp', False)
            dao.crear(tipo)
            entidad = dao.get_query().filter_by(_nombre='TipoPrueba').first();
            self.assertNotEqual(entidad, None, "Tipo item no creado")

class eliminarTipoItem(unittest.TestCase):
    def setUp(self):
        self.session = _initTestingDB()
        
    def tearDown(self):
        self.session.remove()
        
    def runTest(self):
        """Testeando eliminar tipo de item"""
        print self.shortDescription()
        with transaction.manager:
            dao = TipoItemDAO(None)
            entidad = dao.get_query().filter_by(_nombre='TipoPrueba').first();
            dao.borrar(entidad)
            entidad = dao.get_query().filter_by(_nombre='TipoPrueba').first();
            self.assertEqual(entidad, None, "Tipo item no eliminado")

class crearAtributoTipoItem(unittest.TestCase):
    def setUp(self):
        self.session = _initTestingDB()
        
    def tearDown(self):
        self.session.remove()
        
    def runTest(self):
        """Testeando crear atributo de tipo de item"""
        print self.shortDescription()
        with transaction.manager:
            dao = AtributoTipoItemDAO(None)
            tipo = AtributoTipoItem('1', 'valor', 'atributo particular', False, 'valor2')
            dao.crear(tipo)
            entidad = dao.get_query().filter_by(_tipo='1').first();
            self.assertNotEqual(entidad, None, "Atributo tipo item no creado")

class eliminarAtributoTipoItem(unittest.TestCase):
    def setUp(self):
        self.session = _initTestingDB()
        
    def tearDown(self):
        self.session.remove()
        
    def runTest(self):
        """Testeando eliminar atributo de tipo de item"""
        print self.shortDescription()
        with transaction.manager:
            dao = AtributoTipoItemDAO(None)
            entidad = dao.get_query().filter_by(_tipo='1').first();
            dao.borrar(entidad)
            entidad = dao.get_query().filter_by(_tipo='1').first();
            self.assertEqual(entidad, None, "Atributo tipo item no eliminado")       

class crearEsquema(unittest.TestCase):
    def setUp(self):
        self.setssion = _initTestingDB()
    def tearDown(self):
        self.session.remove()
    def runTest(self):
        """Testeando crear Esquema"""
        print self.shortDescription()
        with transaction.manager:
            dao = RolFinalDAO()
            rolFinal = dao.get_query().filter_by(_nombre='admin').first()
            dao = ProyectoDAO()
            proyecto = Proyecto("ProyectoPrueba",rolFinal._id , 5, "TEST",rolFinal._id , "nota", "hoy", "manhana")            
            dao.crear(proyecto)
            entidad = dao.get_query().filter_by(_proyecto_id=1).first();
            self.assertNotEqual(entidad, None, "proyecto no creado")
            dao = FaseDAO()
            fase = Fase(3, "FasePrueba", proyecto._id, 2, "coment", "TEST", "000000")
            dao.crear(fase)
            entidad = dao.get_query().filter_by(_fase_id=3).first();
            self.assertNotEqual(entidad, None, "fase no creada")
            dao = EsquemaDAO()
            esquema = Esquema("esquemaPrueba", "prueba", "etqprueba", "000000", fase._id)
            dao.crear(esquema)
            entidad = dao.get_query().filter_by(_esquema_id=1).first();
            self.assertNotEqual(entidad, None, "esquema no creado")
        
