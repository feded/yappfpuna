from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config
from yapp.daos.permisos_dao import PermisosDAO
from yapp.daos.privilegio_dao import PrivilegioDAO
from yapp.daos.recurso_dao import RecursoDAO, TipoRecursoDAO
from yapp.daos.rol_dao import RolEstadoDAO, RolDAO
from yapp.daos.rol_final_dao import RolFinalDAO
from yapp.daos.tipo_item_dao import TipoItemDAO
from yapp.models import Base, DBSession
from yapp.models.historial import Historial
from yapp.models.item.item_atributo import ItemAtributo
from yapp.models.recurso.tipo_recurso import TipoRecurso, TipoRecurso
from yapp.models.roles.permisos import Permisos
from yapp.models.roles.permisos_roles import PermisosRoles
from yapp.models.roles.privilegio import Privilegio
from yapp.models.roles.rol import Rol
from yapp.models.roles.rol_estado import RolEstado
from yapp.models.roles.rol_final import RolFinal
from yapp.models.tipo_item.tipo_item import TipoItem
import os
import sys
import transaction
import yapp.models.entidad_padre
import yapp.models.esquema.atributo_esquema
import yapp.models.esquema.esquema
import yapp.models.esquema.esquema_item
import yapp.models.fase.atributo_fase
import yapp.models.fase.atributo_fase
import yapp.models.fase.fase
import yapp.models.fase.fase
import yapp.models.fase.fase
import yapp.models.fase.fase
import yapp.models.fase.tipo_fase
import yapp.models.fase.tipo_fase
import yapp.models.item.item
import yapp.models.item.item_archivo
import yapp.models.item.archivo
import yapp.models.item.item_atributo
import yapp.models.item.item_unidad_trabajo
import yapp.models.linea_base.linea_base
import yapp.models.proyecto.proyecto
import yapp.models.proyecto.proyecto
import yapp.models.recurso.recurso
import yapp.models.recurso.recurso_bien
import yapp.models.recurso.recurso_material
import yapp.models.recurso.recurso_persona
import yapp.models.recurso.tipo_recurso
import yapp.models.roles.permisos
import yapp.models.roles.permisos_roles
import yapp.models.roles.privilegio
import yapp.models.roles.rol
import yapp.models.roles.rol_estado
import yapp.models.roles.rol_final
import yapp.models.roles.rol_privilegio
import yapp.models.root_factory
import yapp.models.suscripcion.notificacion
import yapp.models.suscripcion.suscripcion
import yapp.models.tipo_item.atributo_tipo_item
import yapp.models.tipo_item.tipo_item
import yapp.models.unidad_trabajo.unidad_trabajo
import yapp.models.unidad_trabajo.unidad_trabajo_recurso





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

    
    
    entidad_dao = PrivilegioDAO(None);
    items = entidad_dao.get_all()
    if (len(items) == 0):
        with transaction.manager:
            entidad = Privilegio("Proyecto");
            DBSession.add(entidad)
            entidad = Privilegio("Fase");
            DBSession.add(entidad)
            entidad = Privilegio("Item");
            DBSession.add(entidad)
            entidad = Privilegio("Esquema");
            DBSession.add(entidad)
            entidad = Privilegio("Aprobar Item");
            DBSession.add(entidad)
    items = RolEstadoDAO(None).get_all()
    if (len(items) == 0):
        with transaction.manager:
            estado = RolEstado("Activo")
            DBSession.add(estado);
            estado = RolEstado("Suspendido");
            DBSession.add(estado);
            
    items = TipoRecursoDAO(None).get_all()
    if (len(items) == 0):
        with transaction.manager:
            tipo = TipoRecurso("Persona")
            DBSession.add(tipo);
            tipo = TipoRecurso("Bien");
            DBSession.add(tipo);
            tipo = TipoRecurso("Material");
            DBSession.add(tipo);
            
#    items = TipoItemDAO(None).get_all()
#    if (len(items) == 0):
#        with transaction.manager:
#            tipoItem = TipoItem("Tipo item por defecto", "Tipo po defecto", 0, "TD", False)
#            DBSession.add(tipoItem);

            
    items = RolFinalDAO(None).get_query().filter(RolFinal._email == "admin").first();
    if (items == None) :
        with transaction.manager:
            estadoActivo = RolEstadoDAO(None).get_query().filter(RolEstado._estado == "Activo").first();
            admin = RolFinal("admin", estadoActivo, "admin", "21232f297a57a5a743894a0e4a801fc3");
            DBSession.add(admin);
            manager = RolFinal("Manager", estadoActivo, "manager", "1d0258c2440a8d19e716292b231e3190");
            DBSession.add(manager);
            lider = RolFinal("Lider de proyecto", estadoActivo, "lider", "64ff9e4a58fe52fb1a55987f34bc979d");
            DBSession.add(lider);
            desarrollador = RolFinal("Desarrollador", estadoActivo, "desarrollador", "21878e2b7bebe62feae406d88a68fab5");
            DBSession.add(desarrollador);
            
            
    print "Creando permisos"
    with transaction.manager:
        admin = Permisos("Roles");
        DBSession.add(admin);
        admin = Permisos("Proyectos");
        DBSession.add(admin);
        admin = Permisos("Fases");
        DBSession.add(admin);
        admin = Permisos("Esquemas");
        DBSession.add(admin);
        admin = Permisos("Tipo de items");
        DBSession.add(admin);
        admin = Permisos("Items");
        DBSession.add(admin);
        admin = Permisos("Suscripciones");
        DBSession.add(admin);
        admin = Permisos("Linea base");
        DBSession.add(admin);
        admin = Permisos("Recursos");
        DBSession.add(admin);
        admin = Permisos("Calculo de impacto");
        DBSession.add(admin);
        admin = Permisos("Ver costado derecho");
        DBSession.add(admin);
        admin = Permisos("Diagrama de gantt");
        DBSession.add(admin);
        admin = Permisos("Unidad de trabajo");
        DBSession.add(admin);
    
    print 'Creando permisos y roles'
    with transaction.manager:
            rol = RolDAO(None).get_query().filter(Rol._nombre == "admin").first();
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Roles").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Proyectos").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Fases").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Esquemas").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Tipo de items").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Items").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Suscripciones").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Linea base").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Recursos").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Calculo de impacto").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Ver costado derecho").first();
            permiso_rol = PermisosRoles(permiso,rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Diagrama de gantt").first();
            permiso_rol = PermisosRoles(permiso,rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Unidad de trabajo").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            
            rol = RolDAO(None).get_query().filter(Rol._nombre == "Manager").first();
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Fases").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Esquemas").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Tipo de items").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Suscripciones").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Linea base").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Recursos").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Calculo de impacto").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Ver costado derecho").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            
            rol = RolDAO(None).get_query().filter(Rol._nombre == "Lider de proyecto").first();
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Fases").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Esquemas").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Tipo de items").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Suscripciones").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Linea base").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Recursos").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Calculo de impacto").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Ver costado derecho").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            
            rol = RolDAO(None).get_query().filter(Rol._nombre == "Desarrollador").first();
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Esquemas").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Suscripciones").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Recursos").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Calculo de impacto").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
            permiso = PermisosDAO(None).get_query().filter(Permisos._nombre == "Ver costado derecho").first();
            permiso_rol = PermisosRoles(permiso,rol);
            DBSession.add(permiso_rol);
