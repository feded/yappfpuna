from yapp.daos.base_dao import BaseDAO
from yapp.models.item.item_archivo import itemArchivo

class ArchivoDAO(BaseDAO):
    def get_clase(self):
        return itemArchivo