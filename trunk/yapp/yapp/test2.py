#'''
#Created on May 5, 2012
#
#@author: arturo
#'''
#import unittest
#class ProjectorFunctionalTests(unittest.TestCase):
#    def setUp(self):
#        from yapp import main
#        settings = { 'sqlalchemy.url': 'postgres://yapp:yapp@127.0.0.1:5432/yapp'}
#        app = main({}, **settings)
#        from webtest import TestApp
#        self.testapp = TestApp(app)
#
#    def test_it(self):
#        res = self.testapp.get('/roles/0', status=200)
##        u = Unpickler()
##        entidad = u.restore(res.body);
##        print entidad;
##        print res.body
#        print "Probando lista de roles"
#        self.failUnless('sucess' in res.body)