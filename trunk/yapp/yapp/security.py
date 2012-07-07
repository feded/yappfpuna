from sqlalchemy.orm.query import Query
from yapp.filter import P_PROYECTO, P_FASE, P_ESQUEMA, P_ITEM, P_ACTIVARITEM, \
    P_NO, P_INICIARPROYECTO, P_CONTROL_TOTAL, PT_PERMISO
from yapp.models.esquema.esquema import Esquema
from yapp.models.fase.fase import Fase
from yapp.models.item.item import Item
from yapp.models.linea_base.linea_base import LineaBase
from yapp.models.proyecto.proyecto import Proyecto
    
clases_privilegios = (Item, Esquema, Proyecto, Fase, LineaBase)


def all(s):
    if _es_prueba(s) == True:
        return old_all(s)
        
    if hasattr(s, 'omitir_seguridad') == True:
#        return _setear_lista_sin_seguridad(old_all(s))
        return old_all(s)
    lista = list(s)
    if hasattr(s, 'sesion_yapp'):
        if 'user' in s.sesion_yapp:
            if s.sesion_yapp['user']._id == 1:
                aRet = list(s)
                return _setear_lista_sin_seguridad(aRet)
    if hasattr(s, 'clase') :
        if s.clase in clases_privilegios:
            return verificar_privilegios(s, lista)
        
#    print self
#    print len(list(self))
    return list(s)

def _es_prueba(query):
    if hasattr(query, 'sesion_yapp') == False:
        return True;
    if 'user' not in query.sesion_yapp and 'holder' not in query.sesion_yapp:
        return True;


def first(s):
    if _es_prueba(s) == True:
        return old_first(s)
    if hasattr(s, 'omitir_seguridad') == True:
        aRet = old_first(s)
        return _setear_entidad_sin_seguridad(aRet)
    if not hasattr(s, 'sesion_yapp'):
        aRet = old_first(s)
        return _setear_entidad_sin_seguridad(aRet)
    if hasattr(s, 'sesion_yapp'):
        if 'user' in s.sesion_yapp:
            if s.sesion_yapp['user']._id == 1:
                aRet = old_first(s)
                return _setear_entidad_sin_seguridad(aRet)
        else:
            aRet = old_first(s)
            return aRet
    entidades = s.all();
    if len(entidades) > 0:
        return entidades[0]
    else:
        return None

def verificar_privilegios(query, lista):
    holder = query.sesion_yapp['holder']
    sesion = query.sesion_yapp
    lista_nueva = []
    for entidad in lista:
        entidad_verificada = verificar_privilegio(sesion, holder, entidad) 
        if entidad_verificada != None:
            lista_nueva.append(entidad_verificada)
    return lista_nueva
        
def verificar_privilegio(sesion, holder, entidad):
    if isinstance(entidad, Item):
        return verificar_privilegio_item(holder, entidad)
    if isinstance(entidad, Proyecto):
        return verificar_privilegio_proyecto(holder, entidad)
    if isinstance(entidad, Fase):
        return verificar_privilegio_otro(holder, P_FASE, entidad)
    if isinstance(entidad, Esquema):
        return verificar_privilegio_otro(holder, P_ESQUEMA, entidad)
    return entidad
        
        
def verificar_privilegio_item(holder, item):
    privilegio = holder.verificar_privilegio(P_ITEM, item)
    if privilegio.valor != P_NO:
        if holder.verificar_privilegio(P_ACTIVARITEM, item).valor != P_NO:
            item._aprobar = True;
        else:
            item._aprobar = False;
        item._privilegio = privilegio.valor
        return item
    return None

def verificar_privilegio_proyecto(holder, proyecto):
    privilegio = holder.verificar_privilegio(P_PROYECTO, proyecto)
    if privilegio.valor != P_NO:
        privilegio_iniciar = holder.verificar_privilegio(P_INICIARPROYECTO, proyecto)
        proyecto._iniciar = False
        if privilegio.valor == P_CONTROL_TOTAL and privilegio.origen == PT_PERMISO:
            proyecto._iniciar = True
        if privilegio_iniciar.valor == P_INICIARPROYECTO:
            proyecto._iniciar = True
        proyecto._privilegio = privilegio.valor
        return proyecto
    return None
def verificar_privilegio_otro(holder, privilegio, entidad):
    privilegio = holder.verificar_privilegio(privilegio, entidad)
    if privilegio.valor != P_NO:
        entidad._privilegio = privilegio.valor
        return entidad
    return None


def _setear_lista_sin_seguridad(lista):
    for entidad in lista:
        _setear_entidad_sin_seguridad(entidad)
        
    return lista
def _setear_entidad_sin_seguridad(entidad):
    if (entidad == None):
        return entidad
    entidad._aprobar = True
    entidad._iniciar = True
    return entidad


old_all = Query.all
old_first = Query.first
Query.all = all
Query.first = first


#SISTEMA VIEJO
USERS = {'editor':'editor',
          'viewer':'viewer'}
GROUPS = {'editor':['group:editors']}

USER = None;

def groupfinder(userid, request):
    """Esto es una prueba de  pydoc"""
    if userid in USERS:
        return GROUPS.get(userid, [])
