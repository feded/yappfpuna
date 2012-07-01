from yapp.daos.esquema_dao import EsquemaDAO
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.item_dao import ItemDAO
from yapp.daos.linea_base_dao import LineaBaseDAO
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.models.esquema.esquema import Esquema
from yapp.models.fase.fase import Fase
from yapp.models.item.item import Item
from yapp.models.linea_base.linea_base import LineaBase
from yapp.models.proyecto.proyecto import Proyecto
from yapp.models.roles.rol import RolRol
from yapp.models.roles.rol_privilegio import RolPrivilegio
class Filter():
    def filter(self , request):
        if 'user' in request.session:
            return True
        else:
            return False


def filtrar_one(session, entidad):
    
    
    return entidad

def filtrar_all(session, entidades):
    
    return entidades


def imprimir (texto):
    print "-----------------"
    print "---IMPRIMIENDO---"
    print "\t" + str(texto)
    print "-----------------"
#PRIVILEGIOS
P_ITEM = 'Item'
P_PROYECTO = 'Proyecto'
P_FASE = 'Fase'
P_ESQUEMA = 'Esquema'
P_LINEABASE = 'LineaBase'
P_ACTIVARITEM = 'Activar Item'

P_SELECCIONAR = "seleccionar"
P_CONTROL_TOTAL = "abm"
P_NO = "no"

PT_PERMISO = "per"
PT_RELACIONADO = "rel"

CA = "["
CC = "]"
class PrivilegioTemp:
    def __init__(self, valor, origen):
        self.origen = origen
        self.valor = valor
    def __repr__(self):
        return str(self.valor) + CA + self.origen + CC


INS_NO = PrivilegioTemp(P_NO, PT_PERMISO)
class PrivilegioHolder:
    
    permisos = {}
    def __init__(self, rol):
        self.rol = rol;
#        self.request = request
        
    def add_privilegios(self, request, rol_privilegios):
        for rp in rol_privilegios:
            if rp._rol_id != self.rol._id :
                continue;
            self.add_privilegio(request, rp)
        return True
        
    def add_privilegio(self, request, rol_privilegio):
        rp = rol_privilegio
        if rp._privilegio._nombre not in self.permisos:
            self.permisos[rp._privilegio._nombre] = {}
        if rp._entidad_id in self.permisos[rp._privilegio._nombre]:
            if self.permisos[rp._privilegio._nombre][rp._entidad_id].origen == PT_PERMISO:
                return False
        if rp._permitir == True :
            self.permisos[rp._privilegio._nombre][self._get_id(rp)] = PrivilegioTemp(P_CONTROL_TOTAL, PT_PERMISO)
            self._validaciones(request, rol_privilegio)
        else:
            self.permisos[rp._privilegio._nombre][self._get_id(rp)] = PrivilegioTemp(P_NO, PT_PERMISO)
            
        return True

    def _get_id(self, rol_privilegio):
        rp = rol_privilegio
        if isinstance(rp._entidad, Item):
            return rp._entidad._item_id
        else :
            return rp._entidad._id
        
    def _get_id_entidad(self, entidad):
        if isinstance(entidad, Item):
            return entidad._item_id
        else:
            return entidad._id
    
    def _add_privilegio_rel(self, privilegio_nombre, identificador, privilegio):
        if privilegio_nombre not in self.permisos :
            self.permisos[privilegio_nombre] = {}
        self.permisos[privilegio_nombre][identificador] = PrivilegioTemp(privilegio, PT_RELACIONADO)
        return True
        
    def verificar_privilegio(self, privilegio, entidad):
        if privilegio not in self.permisos:
            return INS_NO
        if self._get_id_entidad(entidad) not in self.permisos[privilegio]:
            return INS_NO
        permiso = self.permisos[privilegio][self._get_id_entidad(entidad)]
        if permiso == None:
            return INS_NO
        return permiso
    
    def _get_permiso(self, privilegio, identificador):
        if privilegio not in self.permisos:
            return None
        if identificador not in self.permisos[privilegio]:
            return None
        permiso = self.permisos[privilegio][identificador]
        if permiso == None:
            return None
        return permiso
    
    def _validaciones(self, request, rp):
        entidad = rp._entidad
        if isinstance(entidad, Item):
            """SI PUEDO VER EL ITEM DEBO PODER VER LA FASE Y EL PROYECTO"""
            self._permiso_item_agregado_verificiar_seleccionar(entidad)
        if isinstance(entidad, Fase):
            """SI PUEDO VER LA FASE DEBO PODER VER EL PROYECTO"""
            self._permiso_fase_agregado_verificar_seleccionar(entidad)
            """SI PUEDO VER LA FASE, DEBO PODER VER TODOS SUS ITEMS"""
            self._permiso_fase_agregado_verificar_items(entidad, request)
        imprimir(entidad)
        if isinstance(entidad, Proyecto):
            print "Agregando fases de proyecto a privilegios"
            """SI PUEDO VER EL PROYECTO, debo poder ver todas sus fases"""
            self._permiso_proyecto_agregado_verificar_fases(request, entidad)
    
    def _permiso_item_agregado_verificiar_seleccionar(self, item):
        fase = item._fase
        privilegio_actual = self._get_permiso(P_FASE, fase._id) 
        if privilegio_actual == None:
            self._add_privilegio_rel(P_FASE, fase._id, P_SELECCIONAR)
            self._permiso_fase_agregado_verificar_seleccionar(fase)
            return True
        if privilegio_actual.origen != PT_PERMISO:
            self._add_privilegio_rel(P_FASE, fase._id, P_SELECCIONAR)
            self._permiso_fase_agregado_verificar_seleccionar(fase)
            return True
    
    def _permiso_fase_agregado_verificar_seleccionar(self, fase):
        proyecto = fase._proyecto
        privilegio_actual = self._get_permiso(P_PROYECTO, proyecto._id)
        if privilegio_actual == None:
            self._add_privilegio_rel(P_PROYECTO, proyecto._id, P_SELECCIONAR)
            return True
        if privilegio_actual.origen != PT_PERMISO:
            self._add_privilegio_rel(P_PROYECTO, proyecto._id, P_SELECCIONAR)
            return True
                
        
    def _permiso_fase_agregado_verificar_items(self, request, fase):
        dao = self.get_dao(Item, request)
        items = dao.get_query().filter(Item._fase == fase)
        self._agregar_privilegios_entidades_sin_reemplazo(items, P_ITEM, P_CONTROL_TOTAL)
    
    def _permiso_proyecto_agregado_verificar_fases(self, request, proyecto):
        dao = self.get_dao(Fase, request)
        fases = dao.get_query().filter(Fase._proyecto == proyecto)
        self._agregar_privilegios_entidades_sin_reemplazo(fases, P_FASE, P_CONTROL_TOTAL)
        for fase in fases:
            self._permiso_fase_agregado_verificar_items(request, fase)
    
    def _agregar_privilegios_entidades_sin_reemplazo(self, entidades, privilegio_nombre, privilegio):
        for entidad in entidades:
            self._agregar_privilegio_sin_reemplazo(privilegio_nombre, self._get_id_entidad(entidad), privilegio)
        
    def _agregar_privilegio_sin_reemplazo(self, privilegio_nombre, identificador, privilegio):
        if privilegio_nombre not in self.permisos :
            self.permisos[privilegio_nombre] = {}
        if identificador not in self.permisos[privilegio_nombre]:
            self.permisos[privilegio_nombre][identificador] = PrivilegioTemp(privilegio, PT_RELACIONADO)
        return True

    def agregar_privilegios_rol(self, request, rol_id, rr_dao, rp_dao):
        self.agregar_privilegios_rol_id(request, rol_id, rp_dao)
        query = rr_dao.get_query()
        query.omitir_seguridad = True
        padres = query.filter(RolRol._rol_id == rol_id).all()
        for padre in padres :
            self.agregar_privilegios_rol(request, padre._padre_id, rr_dao, rp_dao)
    
    def agregar_privilegios_rol_id(self, request, rol_id, dao):
        
        entidades = dao.get_query().filter(RolPrivilegio._rol_id == rol_id).all();
        imprimir("TODOS LOS PERMISOS")
        for entidad in entidades:
            print entidad._id
        self.add_privilegios(request, entidades)
        
    daos = {}
    def get_dao(self, clase, request):
        if clase not in self.daos:
            if clase == Item:
                self.daos[Item] = ItemDAO(request)
            if clase == Fase :
                self.daos[Fase] = FaseDAO(request)
            if clase == Proyecto :
                self.daos[Proyecto] = ProyectoDAO(request)
            if clase == LineaBase :
                self.daos[LineaBase] = LineaBaseDAO(request)
            if clase == Esquema :
                self.daos[Esquema] = EsquemaDAO(request)
        return self.daos[clase]
    
    
    def imprimir(self):
        print "---------------------------------------------"
        print "---------------------------------------------"
        for key in self.permisos.keys():
            dicc = self.permisos[key]
            for llave in dicc.keys():
                valor = dicc[llave]
                print CA + str(key) + CC + CA + str(llave) + CC + "=" + str(valor)
        print "---------------------------------------------"
        print "---------------------------------------------"
        
class Validador():
    def __init__(self, request):
        self.user = None
        if 'user' in request.session:
            self.user = request.session['user']
        self.request = request
            
    def es_visible(self, entidad):
#        if self.user == None:
        return True
#        if (self.user._id == 1):
#            return True;
#        self.dao = RolPrivilegioDAO(self.request);
#        if (isinstance(entidad, Esquema)):
#            return self.validar_esquema(entidad)
#        if (isinstance(entidad, Fase)):
#            return self.validar_fase(entidad)
#        if (isinstance(entidad, Proyecto)):
#            return self.validar_proyecto(entidad)
        
#    def validar_proyecto(self, entidad):
#        return self.validar_entidad(entidad)
#    
#    def validar_fase(self, entidad):
#        print "Validando fase"
#        bandera = self.validar_proyecto(entidad._proyecto);
#        proyecto = self.validar_entidad(entidad)
#        return bandera or proyecto
#    
#    def validar_esquema(self, entidad):
#        puede_esquema = self.validar_entidad(entidad)
#        puede_fase = self.validar_fase(entidad._fase);
#        return puede_esquema or puede_fase
#    
#    def validar_entidad(self, entidad):
#        print "--------------"
#        print "Validando " + str(self.user._id) + " con " + str(entidad._id)
#        print "--------------"
#        rol = self.dao.get_query().filter(RolPrivilegio._rol_id == self.user._id, RolPrivilegio._entidad_padre_id == entidad._id).first();
#        print rol
#        return rol != None
        
        
