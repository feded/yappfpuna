'''
Created on May 5, 2012

@author: arturo
'''
import unittest

class GetAtributoEsquema(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)

    def test_it(self):
        res = self.testapp.get('/atributosEsquemas', params={'id': 1}, status=200)
        print "Probando atributo esquema"
        self.failUnless('sucess' in res.body)

class GetAtributoFase(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)

    def test_it(self):
        res = self.testapp.get('/atributofase', params={'id': 1},status=200)
        print "Probando atributo fase"
        self.failUnless('sucess' in res.body)

class GetAtributoTipoItem(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)

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

    def test_it(self):
        res = self.testapp.get('/esquemas', params={'id': 1},status=200)
        print "Probando esquema"
        self.failUnless('sucess' in res.body)

class GetFases(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)

    def test_it(self):
        res = self.testapp.get('/fases', params={'id': 1},status=200)
        print "Probando fases"
        self.failUnless('sucess' in res.body)

class GetHistoriales(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)

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

class GetLinesasBase(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)

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

    def test_it(self):
        res = self.testapp.get('/privilegios/0',status=200)
        print "Probando privilegios"
        self.failUnless('sucess' in res.body)

class GetProyectos(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)

    def test_it(self):
        res = self.testapp.get('/readProyectos',status=200)
        print "Probando proyectos"
        self.failUnless('sucess' in res.body)

class GetRecursos(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)

    def test_it(self):
        res = self.testapp.get('/recursos',status=200)
        print "Probando recursos"
        self.failUnless('sucess' in res.body)

class GetRoles(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)

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
                
class GetTipoFase(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)

    def test_it(self):
        res = self.testapp.get('/tipofase', params={'id': 1},status=200)
        print "Probando tipo fase"
        self.failUnless('sucess' in res.body)
        
class GetTipoItem(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)

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

    def test_it(self):
        res = self.testapp.get('/unidadtrabajo',status=200)
        print "Probando unidad de trabajo"
        self.failUnless('sucess' in res.body)