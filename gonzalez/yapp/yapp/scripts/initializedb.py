from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config
from yapp.daos.privilegio_dao import PrivilegioDAO, EntidadDAO
from yapp.daos.rol_dao import RolFinalDAO, RolEstadoDAO, RolDAO
from yapp.daos.recurso_dao import RecursoDAO, TipoRecursoDAO
from yapp.models import Base, DBSession
from yapp.models.historial import Historial
from yapp.models.roles.entidad import Entidad
from yapp.models.roles.rol_estado import RolEstado
from yapp.models.roles.rol_final import RolFinal
from yapp.models.recurso.tipo_recurso import TipoRecurso
import os
import sys
import transaction
import yapp.models.entidad_padre
import yapp.models.recurso.recurso
import yapp.models.recurso.tipo_recurso
import yapp.models.fase.fase
import yapp.models.fase.atributo_fase
import yapp.models.fase.tipo_fase
import yapp.models.proyecto.proyecto
import yapp.models.fase.fase
import yapp.models.roles.entidad
import yapp.models.roles.privilegio
import yapp.models.roles.rol
import yapp.models.roles.rol_estado
import yapp.models.roles.rol_final
import yapp.models.root_factory
import yapp.models.suscripcion.suscripcion
import yapp.models.tipo_item.atributo_tipo_item
import yapp.models.tipo_item.tipo_item


#from yapp.models.roles import *



def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri>\n'
          '(example: "%s development.ini")' % (cmd, cmd)) 
    sys.exit(1)

def main(argv=sys.argv):
    if len(argv) != 2:
        usage(argv)
    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.create_all(engine)

    
    
    entidad_dao = EntidadDAO();
    items = entidad_dao.get_all()
    if (len(items) == 0):
        with transaction.manager:
            entidad = Entidad("Proyecto");
            DBSession.add(entidad)
            entidad = Entidad("Fase");
            DBSession.add(entidad)
            entidad = Entidad("Item");
            DBSession.add(entidad)
            entidad = Entidad("Esquema");
            DBSession.add(entidad)
    items = RolEstadoDAO().get_all()
    if (len(items) == 0):
        with transaction.manager:
            estado = RolEstado("Activo")
            DBSession.add(estado);
            estado = RolEstado("Suspendido");
            DBSession.add(estado);
            
    items = TipoRecursoDAO().get_all()
    if (len(items) == 0):
        with transaction.manager:
            tipo = TipoRecurso("Persona")
            DBSession.add(tipo);
            tipo = TipoRecurso("Bien");
            DBSession.add(tipo);
            tipo = TipoRecurso("Material");
            DBSession.add(tipo);
            
    items = RolFinalDAO().get_query().filter(RolFinal._email == "admin").first();
    if (items == None) :
        estadoActivo = RolEstadoDAO().get_query().filter(RolEstado._estado == "Activo").first();
        admin = RolFinal("admin", estado, estadoActivo, "admin");
        DBSession.add(admin);
