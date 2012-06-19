import unittest
import json
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.models.proyecto.proyecto import Proyecto
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.atributo_fase_dao import AtributoFaseDAO
from yapp.models.fase.fase import Fase
from yapp.models.fase.atributo_fase import AtributoFase
from yapp.daos.rol_final_dao import RolFinalDAO
from yapp.daos.tipo_fase_dao import TipoFaseDAO
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.models.fase.tipo_fase import TipoFase

class GetAtributoEsquema(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
   
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()
        
    def test_it(self):
        res = self.testapp.get('/atributosEsquemas', params={'id': 1}, status=200)
        print "Probando atributo esquema"
        self.failUnless('sucess' in res.body)

##################################################################################
#                        Atributos particulares de la fase
##################################################################################

class GetAtributoFase(unittest.TestCase):
    """
    @summary: Testea la recuperacion de atributos particulares de una fase en particular.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
        
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/atributofase', params={'id': 1},status=200)
        print "Testeando recuperar atributos de fases"
        self.failUnless('sucess' in res.body)

class PostAtributoFase(unittest.TestCase):
    """
    @summary: Testea la creacion de atributos particulares para una fase en particular.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        dao = ProyectoDAO(None)
        rol_dao = RolFinalDAO(None)
        autor = rol_dao.get_by_id(1)
        lider = rol_dao.get_by_id(1)
        nuevo_proyecto = Proyecto("Test",autor,1,"Prueba",lider,"Prueba","hoy","hoy")
        dao.crear(nuevo_proyecto)
        
        dao = FaseDAO(None)
        nueva_fase = Fase("Testeando",nuevo_proyecto,2, "Prueba","Prueba","0")
        dao.crear(nueva_fase)
        
        nuevo_atributo = {"_nombre":"Atributo 1","id":0,"_fase_id": nueva_fase.id,"_descripcion":"Prueba","_valor":"100"}

        res = self.testapp.post('/atributofase',params=json.dumps(nuevo_atributo));
        print "Testeando crear atributos de fase"
        self.failUnless('sucess' in res.body)

class PutAtributoFase(unittest.TestCase):
    """
    @summary: Testea la modificacion de atributos particulares de una fase.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        dao = ProyectoDAO(None)
        rol_dao = RolFinalDAO(None)
        autor = rol_dao.get_by_id(1)
        lider = rol_dao.get_by_id(1)
        nuevo_proyecto = Proyecto("Test",autor,1,"Prueba",lider,"Prueba","hoy","hoy")
        dao.crear(nuevo_proyecto)
        
        dao = FaseDAO(None)
        nueva_fase = Fase("Testeando",nuevo_proyecto,2, "Prueba","Prueba","0")
        dao.crear(nueva_fase)
        
        dao = AtributoFaseDAO(None)
        nuevo_atributo = AtributoFase("Atributo de prueba",nueva_fase,"Prueba","100")
        dao.crear(nuevo_atributo)
        
        direccion = '/atributofase/' + str(nuevo_atributo.id)
        atributo = {"_nombre":"Atributo 1","id": nuevo_atributo.id, "_fase_id": nueva_fase.id,"_descripcion":"Prueba","_valor":"100"}
        res = self.testapp.put(direccion,params=json.dumps(atributo));
        print "Testeando modificar atributo de fase"
        self.failUnless('sucess' in res.body)

class DeleteAtributoFase(unittest.TestCase):
    """
    @summary: Testea la eliminacion de atributos particulares de una fase.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        dao = ProyectoDAO(None)
        rol_dao = RolFinalDAO(None)
        autor = rol_dao.get_by_id(1)
        lider = rol_dao.get_by_id(1)
        nuevo_proyecto = Proyecto("Test",autor,1,"Prueba",lider,"Prueba","hoy","hoy")
        dao.crear(nuevo_proyecto)
        
        dao = FaseDAO(None)
        nueva_fase = Fase("Testeando",nuevo_proyecto,2, "Prueba","Prueba","0")
        dao.crear(nueva_fase)
        
        dao = AtributoFaseDAO(None)
        nuevo_atributo = AtributoFase("Atributo de prueba",nueva_fase,"Prueba","100")
        dao.crear(nuevo_atributo)
        
        direccion = '/atributofase/' + str(nuevo_atributo.id)
        atributo = {"_nombre":"Atributo 1","id": nuevo_atributo.id, "_fase_id": nueva_fase.id,"_descripcion":"Prueba","_valor":"100"}
        res = self.testapp.delete(direccion,params=json.dumps(atributo));
        print "Testeando eliminar atributo de fase"
        self.failUnless('sucess' in res.body)


class GetAtributoTipoItem(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/atributoItem', params={'id': 1},status=200)
        print "Probando atributo item"
        self.failUnless('sucess' in res.body)
        
class GetEntidades(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/entidades',status=200)
        print "Probando entidades"
        self.failUnless('sucess' in res.body)
        
class GetEntidadesPadres(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/entidades_padre/0',status=200)
        print "Probando entidades padres"
        self.failUnless('sucess' in res.body)

class GetEsquemaItem(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/itemsEsquemas', params={'id': 1},status=200)
        print "Probando esquema item"
        self.failUnless('sucess' in res.body)

class GetEsquema(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/esquemas', params={'id': 1},status=200)
        print "Probando esquema"
        self.failUnless('sucess' in res.body)

##################################################################################
#                                Fases
##################################################################################
class GetFases(unittest.TestCase):
    """
    @summary: Testea la recuperacion de fases de un proyecto.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/fases', params={'id': 1},status=200)
        print "Testeando recuperar fases"
        self.failUnless('sucess' in res.body)
        
class PostFases(unittest.TestCase):
    """
    @summary: Testea la creacion de fases de un proyecto.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        dao = ProyectoDAO(None)
        rol_dao = RolFinalDAO(None)
        autor = rol_dao.get_by_id(1)
        lider = rol_dao.get_by_id(1)
        nuevo_proyecto = Proyecto("Test",autor,1,"Prueba",lider,"Prueba","hoy","hoy")
        dao.crear(nuevo_proyecto)
        
        fase = {"_nombre":"Fase 3","id":0,"_proyecto_id":nuevo_proyecto.id,"_orden":3,"_comentario":"Prueba","_estado":"Pendiente","_color":"008080"}
        res = self.testapp.post('/fases',params=json.dumps(fase));
        print "Testeando crear fases"
        self.failUnless('sucess' in res.body)

class PutFases(unittest.TestCase):
    """
    @summary: Testea la modificacion de fases de un proyecto.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        dao = ProyectoDAO(None)
        rol_dao = RolFinalDAO(None)
        autor = rol_dao.get_by_id(1)
        lider = rol_dao.get_by_id(1)
        nuevo_proyecto = Proyecto("Test",autor,1,"Prueba",lider,"Prueba","hoy","hoy")
        dao.crear(nuevo_proyecto)
        
        dao = FaseDAO(None)
        nueva_fase = Fase("Testeando",nuevo_proyecto,2, "Prueba","Prueba","0")
        dao.crear(nueva_fase)
        
        direccion = '/fases/' + str(nueva_fase.id)
        fase = {"_nombre":"Fase 1","id":nueva_fase.id,"_proyecto_id":nuevo_proyecto.id,"_orden":1,"_comentario":"Defecto","_estado":"Pendiente","_color":"003366"}
        res = self.testapp.put(direccion,params=json.dumps(fase));
        print "Testeando modificar fases"
        self.failUnless('sucess' in res.body)

class DeleteFases(unittest.TestCase):
    """
    @summary: Testea la eliminacion de fases de un proyecto.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        dao = ProyectoDAO(None)
        rol_dao = RolFinalDAO(None)
        autor = rol_dao.get_by_id(1)
        lider = rol_dao.get_by_id(1)
        nuevo_proyecto = Proyecto("Test",autor,1,"Prueba",lider,"Prueba","hoy","hoy")
        dao.crear(nuevo_proyecto)
        
        dao = FaseDAO(None)
        nueva_fase = Fase("Testeando",nuevo_proyecto,2, "Prueba","Prueba","0")
        dao.crear(nueva_fase)
        
        direccion = '/fases/' + str(nueva_fase.id)
        fase = {"_nombre":"Fase 3","id": nueva_fase.id,"_proyecto_id":69,"_orden":3,"_comentario":"Prueba","_estado":"Pendiente","_color":"008080"} 
        res = self.testapp.delete(direccion,params=json.dumps(fase));
        print "Testeando eliminar fases"
        self.failUnless('sucess' in res.body)

class GetHistoriales(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/notificaciones/', params={'id': 1},status=200)
        print "Probando historiales"
        self.failUnless('sucess' in res.body)


#class GetItem(unittest.TestCase):
#    def setUp(self):
#        from yapp import main
#        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
#        app = main({}, **settings)
#        from webtest import TestApp
#        self.testapp = TestApp(app)
#
#    def test_it(self):
#        res = self.testapp.get('/item', params={'id': 1},status=200)
#        print "Probando item"
#        self.failUnless('sucess' in res.body)

class GetLineasBase(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/lineas_base', params={'id': 1},status=200)
        print "Probando lineas_base"
        self.failUnless('sucess' in res.body)
        
#class GetPermisos(unittest.TestCase):
#    def setUp(self):
#        from yapp import main
#        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
#        app = main({}, **settings)
#        from webtest import TestApp
#        self.testapp = TestApp(app)
#
#    def test_it(self):
#        res = self.testapp.get('/permisos',params={'user': 1},status=200)
#        print "Probando permisos"
#        self.failUnless('sucess' in res.body)
#        

class GetPrivilegios(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/privilegios/0',status=200)
        print "Probando privilegios"
        self.failUnless('sucess' in res.body)
##################################################################################
#                                Proyectos
##################################################################################
class GetProyectos(unittest.TestCase):
    """
    @summary: Testea la recuperacion de proyectos.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/readProyectos',status=200)
        print "Testeando recuperar proyectos"
        self.failUnless('sucess' in res.body)

class PostProyectos(unittest.TestCase):
    """
    @summary: Testea la creacion de proyectos.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        proyecto = {"_nombre":"Prueba","_autor":1,"_autor_id":1,"id":0,"_prioridad":1,"_estado":"Prueba","_lider":1,"_lider_id":1,"_nota":"Prueba","_fecha_creacion":"2012-06-18, 3:46 pm","_fecha_modificacion":"2012-06-18, 3:46 pm"}
        res = self.testapp.post('/createProyectos',params=json.dumps(proyecto));
        print "Testeando crear proyectos"
        self.failUnless('sucess' in res.body)

class PutProyectos(unittest.TestCase):
    """
    @summary: Testea la modificacion de proyectos                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        dao = ProyectoDAO(None)
        rol_dao = RolFinalDAO(None)
        autor = rol_dao.get_by_id(1)
        lider = rol_dao.get_by_id(1)
        nuevo_proyecto = Proyecto("Test",autor,1,"Prueba",lider,"Prueba","hoy","hoy")
        dao.crear(nuevo_proyecto)
        direccion = '/updateProyectos/' + str(nuevo_proyecto.id)
        proyecto = {"_nombre":"Prueba","_autor":1,"_autor_id":1,"id":nuevo_proyecto.id,"_prioridad":1,"_estado":"Prueba","_lider_id":1,"lider_nombre":1,"_nota":"Prueba","_fecha_creacion":"2012-06-18, 3:46 pm","_fecha_modificacion":"2012-06-18, 3:46 pm"}
        res = self.testapp.put(direccion,params=json.dumps(proyecto));
        print "Testeando modificar proyectos"
        self.failUnless('sucess' in res.body)

class DeleteProyectos(unittest.TestCase):
    """
    @summary: Testea eliminacion de proyectos.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        dao = ProyectoDAO(None)
        rol_dao = RolFinalDAO(None)
        autor = rol_dao.get_by_id(1)
        lider = rol_dao.get_by_id(1)
        nuevo_proyecto = Proyecto("Test",autor,1,"Prueba",lider,"Prueba","hoy","hoy")
        dao.crear(nuevo_proyecto)
        direccion = '/deleteProyectos/' + str(nuevo_proyecto.id)
        proyecto = {"_nombre":"Prueba","_autor":1,"_autor_id":1,"id":nuevo_proyecto.id,"_prioridad":1,"_estado":"Prueba","_lider_id":1,"lider_nombre":1,"_nota":"Prueba","_fecha_creacion":"2012-06-18, 3:46 pm","_fecha_modificacion":"2012-06-18, 3:46 pm"}
        res = self.testapp.delete(direccion,params=json.dumps(proyecto));
        print "Testeando eliminar proyectos"
        self.failUnless('sucess' in res.body)
        
#class GetRecursos(unittest.TestCase):
#    def setUp(self):
#        from yapp import main
#        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
#        app = main({}, **settings)
#        from webtest import TestApp
#        self.testapp = TestApp(app)
#
#    def test_it(self):
#        res = self.testapp.get('/recursos',status=200)
#        print "Probando recursos"
#        self.failUnless('sucess' in res.body)

class GetRoles(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/roles/0', status=200)
#        print str(res)
        print "Probando roles"
        self.failUnless('sucess' in res.body)

class GetRolesFinales(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/rolesfinales/', status=200)
#        print str(res)
        print "Probando roles finales"
        self.failUnless('sucess' in res.body)

class GetRolesEstados(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/roles_estados', status=200)
#        print str(res)
        print "Probando roles estados"
        self.failUnless('sucess' in res.body)

class GetRolPrivilegios(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/rolPrivilegios/0', status=200)
#        print str(res)
        print "Probando roles privilegios"
        self.failUnless('sucess' in res.body)

#class GetSuscripciones(unittest.TestCase):
#    def setUp(self):
#        from yapp import main
#        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
#        app = main({}, **settings)
#        from webtest import TestApp
#        self.testapp = TestApp(app)
#
#    def test_it(self):
#        res = self.testapp.get('/suscripciones/0', status=200)
##        print str(res)
#        print "Probando suscripciones"
#        self.failUnless('sucess' in res.body)
    
                
##################################################################################
#                       Tipos de items de la Fase
##################################################################################
class GetTipoFase(unittest.TestCase):
    """
    @summary: Testea la recuperacion de los tipos de items que asocia una fase.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/tipofase', params={'id': 1},status=200)
        print "Testeando tipo de item de fase"
        self.failUnless('sucess' in res.body)

class PostTipoFase(unittest.TestCase):
    """
    @summary: Testea la asociacion de un tipo de item y una fase.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        dao = ProyectoDAO(None)
        rol_dao = RolFinalDAO(None)
        autor = rol_dao.get_by_id(1)
        lider = rol_dao.get_by_id(1)
        nuevo_proyecto = Proyecto("Test",autor,1,"Prueba",lider,"Prueba","hoy","hoy")
        dao.crear(nuevo_proyecto)
        
        dao = FaseDAO(None)
        nueva_fase = Fase("Testeando",nuevo_proyecto,2, "Prueba","Prueba","0")
        dao.crear(nueva_fase)
        
    
        nuevo_tipo_fase = {"id":0,"_tipo": 1,"tipo_nombre":"Tipo 1","_fase": nueva_fase.id}
        
        res = self.testapp.post('/tipofase',params=json.dumps(nuevo_tipo_fase));
        print "Testeando asociar tipos de items a fases"
        self.failUnless('sucess' in res.body)
        
class DeleteTipoFase(unittest.TestCase):
    """
    @summary: Testea la desasociacion entre un tipo de item y una fase.                         
    """
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        dao = ProyectoDAO(None)
        rol_dao = RolFinalDAO(None)
        autor = rol_dao.get_by_id(1)
        lider = rol_dao.get_by_id(1)
        nuevo_proyecto = Proyecto("Test",autor,1,"Prueba",lider,"Prueba","hoy","hoy")
        dao.crear(nuevo_proyecto)
        
        dao = FaseDAO(None)
        nueva_fase = Fase("Testeando",nuevo_proyecto,2, "Prueba","Prueba","0")
        dao.crear(nueva_fase)
        
        dao = TipoItemDAO(None)
        tipo = dao.get_by_id(1)
    
        dao = TipoFaseDAO(None)
        nuevo_tipo_fase = TipoFase(nueva_fase,tipo)
        dao.crear(nuevo_tipo_fase)
        
        
        direccion = '/tipofase/' + str(nuevo_tipo_fase.id)
        tipo_fase = {"id":nuevo_tipo_fase.id,"_tipo":2,"tipo_nombre":"Tipo 1","_fase":70}
        res = self.testapp.delete(direccion,params=json.dumps(tipo_fase));
        print "Testeando eliminar asociacion entre tipo de item y fase"
        self.failUnless('sucess' in res.body)

class GetTipoItem(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/obtenerTipos',status=200)
        print "Probando tipo item"
        self.failUnless('sucess' in res.body)

class GetTipoRecurso(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/tipo_recurso',status=200)
        print "Probando tipo recurso"
        self.failUnless('sucess' in res.body)


class GetUnidadTrabajo(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)
    
    def tearDown(self):
        del self.testapp
        from yapp.models import DBSession
        DBSession.remove()

    def test_it(self):
        res = self.testapp.get('/unidadtrabajo',status=200)
        print "Probando unidad de trabajo"
        self.failUnless('sucess' in res.body)