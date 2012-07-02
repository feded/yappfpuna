from yapp.daos.base_dao import BaseDAO
from yapp.models.item.item import Item, ItemDTO
from yapp.daos.item_unidad_dao import ItemUnidadDAO
from yapp.models.item.item_unidad_trabajo import ItemUnidadTrabajo
from yapp.daos.unidad_trabajo_dao import UnidadTrabajoDAO
from yapp.daos.esquema_item_dao import EsquemaItemDAO
from yapp.models.esquema.esquema_item import EsquemaItem
from yapp.models.esquema import esquema_item
from yapp.daos.fase_dao import FaseDAO
from yapp.daos.proyecto_dao import ProyectoDAO
from yapp.daos.item_atributo_dao import ItemAtributoDAO
from yapp.models.item.item_atributo import ItemAtributo
from yapp.daos.item_archivo_dao import ItemArchivoDAO
from yapp.models.item.item_archivo import ItemArchivo

class ItemDAO(BaseDAO):
    def get_clase(self):
        return Item
    
    def get_items_aprobados(self, fase_id):
        """
        - @param fase_id: fase que contiene los items; 
        - B{Metodo que retorna una lista de items activos en la fase.}
        - B{@return: lista de items activos}
            
        """
        lista_return = []
        lista_items = self.get_items_fase(fase_id)
        for entidad in lista_items:
            if (entidad._estado == "APROBADO"):
                lista_return.append(entidad)
        
        return lista_return
        
    def get_ultima_version_item(self, item):
        items_fase = self.get_items_fase(item._fase._id)
        for it in items_fase:
            if (it._item_id == item._item_id):
                return it
    
    def get_ultima_version_item_by_id(self, item_id):
        return self.get_query().filter(Item._item_id == item_id).order_by(Item._version.desc()).first();
    
    def get_items_fase(self, fase_id):
        """
        @return: lista de todos los items que no estan eliminados en la fase
        """
        entidades = self.get_query().filter(Item._fase_id == fase_id).distinct(Item._item_id).all()
        entidades_item_id = []
        for entidad in entidades:
            posible_actual = self.get_query().filter(Item._item_id == entidad._item_id).order_by(Item._version.desc()).first();
            if (posible_actual._estado != "ELIMINADO"):            
                if (entidades_item_id.count(posible_actual) == 0):
                    entidades_item_id.append(posible_actual)
             
        return entidades_item_id
        
    
    def get_items_globales(self):
        entidades = self.get_query().distinct(Item._item_id).all()
        entidades_item_id = []
        for entidad in entidades:
            posible_actual = self.get_query().filter(Item._item_id == entidad._item_id).order_by(Item._version.desc()).first();
            if (posible_actual._estado != "ELIMINADO"):            
                if (entidades_item_id.count(posible_actual) == 0):
                    entidades_item_id.append(posible_actual)
             
        return entidades_item_id
     
    def es_eliminable(self, item):
        """
        @param item: item a verificar si se puede eliminar
        @return: boolean true si es eliminable sin comprometer otros items, false si su eliminacion compromente otros items
        """
    def get_items_comprometidos(self, fase_id):
        
        lista_return = []
        lista_items = self.get_items_fase(fase_id)
        for entidad in lista_items:
            if (entidad._estado == "COMPROMETIDO"):
                lista_return.append(entidad)
        
        return lista_return
    
    def get_items_eliminados(self, fase_id):
        
        entidades = self.get_query().filter(Item._fase_id == fase_id).distinct(Item._item_id).all()
        entidades_item_id = []
        print len(entidades)
        
        for entidad in entidades:
            posible_actual = self.get_query().filter(Item._item_id == entidad._item_id).order_by(Item._version.desc()).first();
            print posible_actual._item_id
            print posible_actual._estado
            if (posible_actual._estado == "ELIMINADO"):            
                if (entidades_item_id.count(posible_actual) == 0):
                    entidades_item_id.append(posible_actual)
             
        return entidades_item_id

    def get_items_por_version(self, item_id):
        versiones = self.get_query().filter(Item._item_id == item_id).order_by(Item._version.asc()).all()
        versiones.pop()
        return versiones


    def items_padre_disponibles(self, items, item):
        if item in items:
            return items
        else:
            items.append(item)
        if item._padre != None:
            return self.items_padre_disponibles(items, item._padre)
        else:
            return self.items_padre_disponibles(items, item)
        
    def get_unidades_disponibles(self, item):
        todos_los_items = self.get_items_globales() 
        unidad_dao = UnidadTrabajoDAO(self._request)
        unidades = unidad_dao.get_all();
        for item in todos_los_items:
            item_unidad_dao = ItemUnidadDAO(self._request)
            entidades = item_unidad_dao.get_query().filter(ItemUnidadTrabajo._item_id == item._id).all()
            for entidad in entidades:
                for unidad in unidades:
                    if entidad._unidad_id == unidad._id:
                        unidades.remove(unidad)
        return unidades
     
    def get_items_esquema(self, esquema_id):
        esquema_item_dao = EsquemaItemDAO(self._request)
        esquema_items = esquema_item_dao.get_query().filter(EsquemaItem._esquema_id == esquema_id).all()         
        items = []
        for esquema_item in esquema_items:
            items_esquema = self.get_query().filter(Item._id == esquema_item._item_id).all()
            for item in items_esquema:
                items.append(item)
        print "-------------items------------------"
        print items
        return items
    
    def actualizarEstadosFaseyProyecto(self, item):
        fase_dao = FaseDAO(self._request)
        proyecto_dao = ProyectoDAO(self._request)
        fase = fase_dao.get_by_id(item._fase_id)
        proyecto = proyecto_dao.get_by_id(fase._proyecto_id)
        
        if item._estado == 'ACTIVO':
            items_fase = self.get_items_fase(fase._id)
            cambiar = True
            for item_fase in items_fase:
                if item_fase._estado == 'REVISION' or item._estado == 'COMPROMETIDO' :
                    cambiar = False
            print cambiar
            if (cambiar == True):
                print fase._estado
                if fase._estado != 'ACTIVA':
                    fase_dao.update_estado_entidad(fase._id, 'ACTIVA')
                if proyecto._estado != 'ACTIVO':
                    proyecto_dao.update_estado_entidad(proyecto._id, 'ACTIVO')
        elif item._estado == 'REVISION' or item._estado == 'COMPROMETIDO' :
            if fase._estado != 'COMPROMETIDA':
                fase_dao.update_estado_entidad(fase._id, 'COMPROMETIDA')
            if proyecto._estado != 'COMPROMETIDO':
                proyecto_dao.update_estado_entidad(proyecto._id, 'COMPROMETIDO')
        elif item._estado == 'BLOQUEADO' or item._estado == 'APROBADO':
            items_fase = self.get_items_fase(fase._id)
            cambiarFinalizado = 0
            cambiarActivo = 0
            for item_fase in items_fase:
                if item_fase._estado == 'BLOQUEADO' or item._estado == 'APROBADO':
                    cambiarFinalizado += 1 
                elif item_fase._estado == 'ACTIVO' or item._estado == 'APROBADO' :
                    cambiarActivo += 1
            if (cambiarFinalizado == len(items_fase)):
                if fase._estado != 'FINALIZADA':
                    fase_dao.update_estado_entidad(fase._id, 'FINALIZADA')
                if proyecto._estado != 'FINALIZADO':
                    proyecto_dao.update_estado_entidad(proyecto._id, 'FINALIZADO')
                return
            if (cambiarActivo == len(items_fase)):
                if fase._estado != 'ACTIVA':
                    fase_dao.update_estado_entidad(fase._id, 'ACTIVA')
                if proyecto._estado != 'ACTIVO':
                    proyecto_dao.update_estado_entidad(proyecto._id, 'ACTIVO')
                
        
       
    def actualizarReferenciasItemNuevaVersion(self, item_id, id_viejo=None):
        if (id_viejo != None):
            item_viejo = self.get_by_id(id_viejo)
        else:
            item_nuevo = self.get_by_id(item_id)
            item_viejo = self.get_query().filter(Item._item_id == item_nuevo._item_id , Item._version == (item_nuevo._version-1)).first()
        if (item_viejo!=None):
            #### Primero nos metemos con los atributos
            item_atributo_dao = ItemAtributoDAO(self._request)
            atributos_anteriores = item_atributo_dao.get_query().filter(ItemAtributo._item_id == item_viejo._id).all()
            atributo_actual = item_atributo_dao.get_query().filter(ItemAtributo._item_id == item_id).first()
            for atributo in atributos_anteriores:
                if atributo_actual!= None :
                    if atributo._atributo_id != atributo_actual._atributo_id:
                        nuevo_atributo = ItemAtributo(item_id, atributo._atributo_id, atributo._valor)
                        item_atributo_dao.crear(nuevo_atributo)
                else:
                    nuevo_atributo = ItemAtributo(item_id, atributo._atributo_id, atributo._valor)
                    item_atributo_dao.crear(nuevo_atributo)
            ### Ahora con las unidades
            item_unidad_dao = ItemUnidadDAO(self._request)
            unidades_anteriores = item_unidad_dao.get_query().filter(ItemUnidadTrabajo._item_id == item_viejo._id).all()
            unidad_actual = item_unidad_dao.get_query().filter(ItemUnidadTrabajo._item_id == item_id).first()
            for unidad in unidades_anteriores:
                if unidad_actual!= None:
                    if unidad._unidad_id != unidad_actual._unidad_id:
                        nueva_unidad = ItemUnidadTrabajo(item_id, unidad._unidad_id, 1)
                        item_unidad_dao.crear(nueva_unidad)
                else:
                    nueva_unidad = ItemUnidadTrabajo(item_id, unidad._unidad_id, 1)
                    item_unidad_dao.crear(nueva_unidad)
            ### Ahora con los proyectos
            item_archivo_dao = ItemArchivoDAO(self._request)
            archivos_anteriores = item_archivo_dao.get_query().filter(ItemArchivo._item_id == item_viejo._id).all()
            rchivo_actual = item_archivo_dao.get_query().filter(ItemArchivo._item_id == item_id).first()
            item_nuevo = self.get_by_id(item_id);
            for archivo in archivos_anteriores:
                if rchivo_actual!= None and archivo._id != rchivo_actual._id:
                    if archivo._archivo_id != rchivo_actual._archivo_id:
                        nuevo_archivo = ItemArchivo(item_nuevo, archivo._archivo )
                        item_archivo_dao.crear(nuevo_archivo)
                else:
                    nuevo_archivo = ItemArchivo(item_nuevo, archivo._archivo )
                    item_archivo_dao.crear(nuevo_archivo)
            ### ya estamos
