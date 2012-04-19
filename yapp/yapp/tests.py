
from pyramid import testing
import transaction
import unittest



class TestBD(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp()
        from sqlalchemy import create_engine
        from .models import DBSession, Base
        from daos.proyecto_dao import ProyectoDAO
        from yapp.models.proyecto.proyecto import Proyecto
        engine = create_engine('postgres://yapp:yapp@127.0.0.1:5432/yapp')
        DBSession.configure(bind=engine)
        Base.metadata.create_all(engine)
        with transaction.manager:
            proyecto = Proyecto('test', 'hola');
            dao = ProyectoDAO()
            dao.crear(proyecto);
            entidades = dao.get_query().filter_by(_nombre='test', _autor='hola').first();
            self.assertNotEqual(entidades, None, "Proyecto no creado")
            
class TestEntidades(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp()
        from sqlalchemy import create_engine
        from .models import DBSession, Base
        from daos.privilegio_dao import EntidadDAO
        from yapp.models.proyecto.proyecto import Proyecto
        engine = create_engine('postgres://yapp:yapp@127.0.0.1:5432/yapp')
        DBSession.configure(bind=engine)
        Base.metadata.create_all(engine)
        with transaction.manager:
            dao = EntidadDAO()
            entidades = dao.get_all();
            self.assertNotEqual(len(entidades), 0, "No hay entidades no creado")

#    def tearDown(self):
#        DBSession.remove()
#        testing.tearDown()
#
#    def test_it(self):
#        from .views import my_view
#        request = testing.DummyRequest()
#        info = my_view(request)
#        self.assertEqual(info['one'].name, 'one')
#        self.assertEqual(info['project'], 'yapp')
