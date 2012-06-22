'''
Created on May 19, 2012

@author: arturo
'''
from jsonpickle.pickler import Pickler
from pyramid.response import Response
from pyramid.view import view_config
from yapp.daos.item_dao import ItemDAO
from yapp.models.item.item import ItemDTO, Item
import json
from yapp.daos.linea_base_dao import LineaBaseDAO
from yapp.models.linea_base.linea_base import LineaBaseDTO



@view_config(route_name='calculo_impacto')
def calcular_impacto(request):
    id_item = request.GET.get("id")
    item_dao = ItemDAO(request)
    item = item_dao.get_by_id(id_item);
    impacto = CalculoImpacto(item);
    p = Pickler(False, None)
#    ret_json = p.flatten(CalculoImpactoDTO(item, antecesores, None))
    ret_json = p.flatten(impacto.calculo_impacto())
    a_ret = json.dumps({'sucess': 'true', 'impacto':ret_json})
    return Response(a_ret)
    
    
class CalculoImpacto:
    def __init__(self, item):
        self.item = item
        self.dao = ItemDAO(None);
        self.linea_base_dao = LineaBaseDAO(None)
        
    def calculo_impacto(self):
        antecesores = self.calculo_impacto_atras(self.item, [])
        sucesores = self.calculo_impacto_adelante(self.item, [])
        
        bases = self.verificar_lineas_base(antecesores, [])
        bases = self.verificar_lineas_base(sucesores, bases)
        bases = self.verificar_linea_base_item(self.item, bases)
        
        return CalculoImpactoDTO(self.item, antecesores, sucesores, bases)
    
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
        
        
        
class CalculoImpactoDTO:
    def __init__(self, item, antecesores, sucesores, bases):
        self.item = ItemDTO(item)
        if antecesores != None:
            self.antecesores = []
            for antecesor in antecesores:
                self.antecesores.append(ItemDTO(antecesor))
        if sucesores != None:
            self.sucesores = []
            for sucesor in sucesores:
                self.sucesores.append(ItemDTO(sucesor))
        if bases != None:
            self.bases = []
            for base in bases:
                self.bases.append(LineaBaseDTO(base))
        
class ItemDTOCalculo:
    def __init__(self, item):
        self._nombre = item._nombre
        self._descripcion = item._descripcion
        
