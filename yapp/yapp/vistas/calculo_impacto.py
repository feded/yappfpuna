'''
Created on May 19, 2012

@author: arturo
'''
from jsonpickle.pickler import Pickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.item_dao import ItemDAO
from yapp.daos.item_unidad_dao import ItemUnidadDAO
from yapp.daos.linea_base_dao import LineaBaseDAO
from yapp.daos.recurso_dao import RecursoDAO
from yapp.daos.unidad_trabajo_recurso import UnidadTrabajoRecursoDAO
from yapp.models.item.item import ItemDTO, Item
from yapp.models.item.item_unidad_trabajo import ItemUnidadTrabajo
from yapp.models.linea_base.linea_base import LineaBaseDTO
from yapp.models.recurso.recurso_persona import RecursoPersona
from yapp.models.unidad_trabajo.unidad_trabajo_recurso import \
    UnidadTrabajo_Recurso
import json



@view_config(route_name='calculo_impacto')
def calcular_impacto(request):
    id_item = request.GET.get("id")
    item_dao = ItemDAO(request)
    item = item_dao.get_by_id(id_item);
    impacto = CalculoImpacto(item, request);
    p = Pickler(False, None)
#    ret_json = p.flatten(CalculoImpactoDTO(item, antecesores, None))
    ret_json = p.flatten(impacto.calculo_impacto())
    a_ret = json.dumps({'sucess': 'true', 'impacto':ret_json})
    return Response(a_ret)
    
    
class CalculoImpacto:
    def __init__(self, item, request):
        self.item = item
        self.dao = ItemDAO(request);
        self.linea_base_dao = LineaBaseDAO(request)
        self.item_unidad_dao = ItemUnidadDAO(request)
        self.unidad_recurso_dao = UnidadTrabajoRecursoDAO(request)
        self.recurso_dao = RecursoDAO(request)
        
    def calculo_impacto(self):
        antecesores = self.calculo_impacto_atras(self.item, [])
        sucesores = self.calculo_impacto_adelante(self.item, [])
        
        bases = self.verificar_lineas_base(antecesores, [])
        bases = self.verificar_lineas_base(sucesores, bases)
        bases = self.verificar_linea_base_item(self.item, bases)
        
        costo_antecesores = self.calcular_costo_items(antecesores)
        costo_sucesores = self.calcular_costo_items(sucesores)
        
        return CalculoImpactoDTO(self.item, antecesores, sucesores, bases, costo_antecesores, costo_sucesores)
    
    def verificar_lineas_base (self, items, bases):
        for item in items:
            linea = self.linea_base_dao.get_by_id(item._linea_base_id)
            if linea != None and linea not in bases:
                bases.append(linea)
        return bases
    
    def verificar_linea_base_item(self, item, bases):
        if item._linea_base_id == None:
            return bases;
        linea = self.linea_base_dao.get_by_id(item._linea_base_id)
        if linea != None and linea not in bases:
            bases.append(linea)
        return bases
    
    
    def calculo_impacto_atras(self, item, items):
        if item == None:
            return items
        if item in items:
            return items;
        if self.item != item:
            items.append(item);
        antecesor = self.dao.get_by_id(item._antecesor_item_id)
        if antecesor != None:
            items = self.calculo_impacto_atras(antecesor, items)
        padre = self.dao.get_by_id(item._padre_item_id)
        if padre != None:
            items = self.calculo_impacto_atras(padre, items)
        
        return items;
    
    def calculo_impacto_adelante(self, item, items):
        if item == None:
            return items;
        if item in items:
            return items;
        if self.item != item:
            items.append(item)
        hijos = self.dao.get_query().filter(Item._padre_item_id == item._id).all()
        for hijo in hijos:
            hijo_ultima_version = self.dao.get_ultima_version_item(hijo)
            items = self.calculo_impacto_adelante(hijo_ultima_version, items)
        sucesores = self.dao.get_query().filter(Item._antecesor_item_id == item._id).all()
        for sucesor in sucesores:
            sucesor_ultima_version = self.dao.get_ultima_version_item(sucesor)
            items = self.calculo_impacto_adelante(sucesor_ultima_version, items)
        
        return items;
    
    def calcular_costo_items(self, items):
        costo = 0;
        for item in items:
            print "---------------------"
            print "Costo de item con id " + str(item._id)
            costo_item = self.costo_item(item)
            item._costo = costo_item;
            print "Costo: " + str(costo_item)
            print "---------------------"
            costo += costo_item;
        return costo;
    
    def costo_item(self, item):
#        self.item_unidad_dao = ItemUnidadDAO(None)
#        self.unidad_recurso_dao = UnidadTrabajoRecursoDAO(None)
#        self.recurso_dao = RecursoDAO(None)
        items_unidades = self.item_unidad_dao.get_query().filter(ItemUnidadTrabajo._item_id==item._id).all();
        costo = 0;
        for item_unidad in items_unidades:
            print "---------------------"
            print "Costo de item con id " + str(item._id)
            costo_unidad = self.costo_unidad(item_unidad._unidad_id)
            costo += costo_unidad
            print "Costo: " + str(costo_unidad)
            print "---------------------"
        return costo
        

    def costo_unidad(self, unidad_id):
        unidad_recursos = self.unidad_recurso_dao.get_query().filter(UnidadTrabajo_Recurso._unidad_trabajo_id==unidad_id).all()
        costo = 0
        for unidad_recurso in unidad_recursos:
            recurso = self.recurso_dao.get_by_id(unidad_recurso._recurso_id)
            costo += self.get_costo_recurso(recurso)
        return costo
            
    def get_costo_recurso(self, recurso):
        if isinstance(recurso, RecursoPersona) :
            return recurso._costo_hora
        return recurso._costo_cantidad
        
class CalculoImpactoDTO:
    def __init__(self, item, antecesores, sucesores, bases, costo_antecesores, costo_sucesores):
        self.item = ItemDTO(item)
        if antecesores != None:
            self.antecesores = []
            for antecesor in antecesores:
                self.antecesores.append(EntidadDTO(antecesor))
        if sucesores != None:
            self.sucesores = []
            for sucesor in sucesores:
                self.sucesores.append(EntidadDTO(sucesor))
        if bases != None:
            self.bases = []
            for base in bases:
                self.bases.append(EntidadDTO(base))
        self.costo_antecesores = costo_antecesores;
        self.costo_sucesores = costo_sucesores;
        
class ItemDTOCalculo:
    def __init__(self, item):
        self._nombre = item._nombre
        self._descripcion = item._descripcion
        
class EntidadDTO:
    def __init__(self, entidad):
        self._nombre = entidad._nombre
        self._descripcion = entidad._descripcion
        self._fase = entidad._fase._nombre
        if hasattr(entidad, '_costo'):
            self._costo = entidad._costo
        
