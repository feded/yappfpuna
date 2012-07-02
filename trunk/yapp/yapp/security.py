from sqlalchemy.orm.query import Query
from yapp.filter import P_PROYECTO, P_FASE, P_ESQUEMA, P_ITEM, P_ACTIVARITEM, \
    P_NO, imprimir
from yapp.models.esquema.esquema import Esquema
from yapp.models.fase.fase import Fase
from yapp.models.item.item import Item
from yapp.models.linea_base.linea_base import LineaBase
from yapp.models.proyecto.proyecto import Proyecto
    
clases_privilegios = (Item, Esquema, Proyecto, Fase, LineaBase)


def all(s):
    if hasattr(s, 'omitir_seguridad') == True:
        imprimir("OMITIENDO SEGURIDAD All")
        return old_all(s)
    lista = list(s)
    if hasattr(s, 'sesion_yapp'):
        if 'user' in s.sesion_yapp:
            if s.sesion_yapp['user']._id == 1:
                return list(s)
    if hasattr(s, 'clase') :
        if s.clase in clases_privilegios:
            return verificar_privilegios(s, lista)
#    print self
#    print len(list(self))
    return list(s)

def first(s):
    aRet = old_first(s)
    if hasattr(s, 'omitir_seguridad') == True:
        imprimir("OMITIENDO SEGURIDAD First")
        return aRet
    if 'sesion_yapp' not in s :
        return aRet
    entidades = s.all(s);
    for entidad in entidades:
        aRet = verificar_privilegio(s.sesion_yapp, s.sesion_yapp['holder'], aRet)
        if aRet != None:
            return aRet
    return None

def verificar_privilegios(query, lista):
#    if 'holder' not in query.session:
        #TODO PROVISORIO
#        return True
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
        return verificar_privilegio_otro(holder, P_PROYECTO, entidad)
    if isinstance(entidad, Proyecto):
        return verificar_privilegio_otro(holder, P_FASE, entidad)
    if isinstance(entidad, Fase):
        return verificar_privilegio_otro(holder, P_ESQUEMA, entidad)
    return entidad
        
        
def verificar_privilegio_item(holder, item):
    privilegio = holder.verificar_privilegio(P_ITEM, item)
    if privilegio != P_NO:
        if holder.verificar_privilegio(P_ACTIVARITEM, item) != P_NO:
            item._activar = True;
        else:
            item._activar = False;
        item._privilegio = privilegio.valor
        return item
    return None

def verificar_privilegio_otro(holder, privilegio, entidad):
    privilegio = holder.verificar_privilegio(privilegio, entidad)
    if privilegio != P_NO:
        entidad._privilegio = privilegio.valor
        return entidad
    return None

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
