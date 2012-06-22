from yapp.daos.base_dao import BaseDAO
from yapp.models.item.item import Item

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
        return self.get_query().filter(Item._item_id == item_id).order_by(Item._version.asc()).first();
    
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
    
    def guadar_item_con_nueva_version(self, item):
        n_item = Item(
            item._item_id,
            item._nombre,
            item._tipo_item,
            item._fase,
            item._duracion,
            item._descripcion,
            item._condicionado,
            item._version,
            item._estado,
            item._fecha_inicio,
            item._fecha_fin,
            item._padre_item_id,
            item._antecesor_item_id)
        n_item._version += 1;
        return self.crear(n_item)

    
            
