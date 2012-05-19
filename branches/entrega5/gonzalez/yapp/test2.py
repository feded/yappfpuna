'''
Created on May 5, 2012

@author: arturo
'''
import unittest
from yapp.daos.rol_final_dao import RolFinalDAO

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
        print "Probando lista de roles"
        self.failUnless('sucess' in res.body)
        
class GetProyectos(unittest.TestCase):
    def setUp(self):
        from yapp import main
        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
        app = main({}, **settings)
        from webtest import TestApp
        self.testapp = TestApp(app)

    def test_it(self):
        
        rh = RolFinalDAO(None)
        rol = rh.get_by_id(1)
        
        res = self.testapp.get('/readProyectos',status=200)
        print "Probando lista de proyectos"
        self.failUnless('sucess' in res.body)