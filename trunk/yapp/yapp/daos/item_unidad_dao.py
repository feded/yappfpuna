from yapp.daos.base_dao import BaseDAO
from yapp.models.item.item_unidad_trabajo import ItemUnidadTrabajo

class ItemUnidadDAO(BaseDAO):
    def get_clase(self):
        return ItemUnidadTrabajo