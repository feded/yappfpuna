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