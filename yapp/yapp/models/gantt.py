'''
Created on May 25, 2012

@author: arturo
'''
import datetime
    

class Task(object):
    
    formato_entrada = "%Y-%m-%d"
    formato_salida = "%m/%d/%Y"
    def set_id(self, id):
        self.pID = id
    def set_name(self, name):
        self.pName = name
    def set_fecha_inicio(self, fecha_inicio):
        """quiere MMMM/dd/yyy"""
        self.pStart = fecha_inicio
    def set_fecha_fin(self, fecha_fin):
        """quiere MMMM/dd/yyy"""
        self.pEnd = fecha_fin
    def set_color(self, color):
        self.pColor = color
    def set_link(self, link):
        self.pLink = link
    def set_mile(self, mile):
        self.pMile = mile
    def set_res(self, res):
        self.pRes = res
    def set_completado(self, comp):
        self.pComp = comp
    def set_grupo (self, grupo):
        self.pGroup = grupo
    def set_parent (self, papa):
        self.pParent = papa
    def set_iniciado (self, iniciado):
        """Debe ser 0 o 1"""
        self.pOpen = iniciado
    def set_dependencia (self, dependencia):
        self.pDepend = dependencia
    def set_recurso (self, recurso):
        self.pRes = recurso
        
    def set_item (self, item):
        """Este metodo deberia hacer todo.. no se nomas como hacer"""
        self.set_id(item._id)
        self.set_name(self.get_nombre(item))
        self.set_res(item._estado)
        if item._fase_id != None:
            self.set_parent(item._fase_id)
        #siempre es un grupo
#        if item._id == 6:
#            self.set_grupo(1)
        if item._antecesor_item_id != None:
            self.set_dependencia(item._antecesor_item_id)
#            self.set_grupo(item._antecesor_item_id)
        self.set_completado(100)
        
        fecha_inicio = datetime.datetime.strptime(item._fecha_inicio, self.formato_entrada)
        delta = datetime.timedelta(days=item._duracion - 1)
        fecha_fin = fecha_inicio + delta
        self.set_fecha_inicio(fecha_inicio.strftime(self.formato_salida))
        self.set_fecha_fin(fecha_fin.strftime(self.formato_salida))
        self.set_color(item._tipo_item._color)
        
    def set_fase (self, fase):
        self.pID = fase._id
        self.pName = self.get_nombre(fase)
        self.pGroup = 1
        
        
    def get_nombre(self, entidad):
        nombre = ""
        if hasattr(entidad, '_tipo_item'):
            if entidad._tipo_item != None:
                nombre += "[" + entidad._tipo_item._prefijo + "]"
        if entidad._nombre != None:
            nombre += entidad._nombre
        if entidad._descripcion != None:
            if nombre != "":
                nombre += " - "
            nombre += entidad._descripcion
        return nombre
                
    def get_xml(self, documento):
        xml = documento.createElement("task")
        i = 0
        for atributo in vars(self):
            node = documento.createElement(atributo)
            #deberia haber una forma mas linda de obtener esto
            texto = documento.createTextNode(str(vars(self).values()[i]))
            node.appendChild(texto)
            xml.appendChild(node)
            i += 1
        return xml
         
