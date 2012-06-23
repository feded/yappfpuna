from yapp.daos.base_dao import BaseDAO
from yapp.models.item.item_archivo import ItemArchivo

class ItemArchivoDAO(BaseDAO):
    def get_clase(self):
        return ItemArchivo