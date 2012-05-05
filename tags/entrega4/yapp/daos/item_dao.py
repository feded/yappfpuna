from yapp.daos.base_dao import BaseDAO
from yapp.models.item.item import Item

class ItemDAO(BaseDAO):
    def get_clase(self):
        return Item